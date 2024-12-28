import { Worker } from "node:worker_threads";
import {
  genTaskID,
  mainQueue,
  mainSignal,
  readMessageToUint,
  sendUintMessage,
  setArrayBuffers,
} from "./helpers.ts";

const currentPath = import.meta.url;
const workerUrl = new URL(currentPath.replace("main.ts", "worker.ts"));

// One example function: returns "Hello from Worker!"
const listOfFunctions = [
  async (input: Uint8Array | null) => {
    const text = input ? new TextDecoder().decode(input) : "Hello from Worker!";
    return new TextEncoder().encode(text);
  },
];

//
// SHARED BUFFERS
//
const sab = setArrayBuffers.sab();
const status = setArrayBuffers.status(sab);
const id = setArrayBuffers.id(sab);
const payload = setArrayBuffers.payload(sab);
const writer = sendUintMessage(id)(payload);
const queue = mainQueue(writer)(10)();

//
// MAIN THREAD
//

const worker = new Worker(workerUrl, { type: "module", workerData: { sab } });
const mainSig = mainSignal(status);
const readMessage = readMessageToUint(payload);
mainSig.hasNoMoreMessages();

// Wait for worker statuses < 127
function waitForWorkerReady() {
  return new Promise<void>((resolve) => {
    function check() {
      // < 126 means the worker might be 0,1,2,... up to 125

      if (status[0] < 126) {
        resolve();
      }
      if (status[0] === 255) {
        queue.sendNextToWorker();
      } else {
        queueMicrotask(check);
      }
    }
    check();
  });
}

// Continuous loop: look for messages
async function mainLoop() {
  while (true) {
    await waitForWorkerReady().then(() => {
      // If worker said "0 => message ready", let's read it
      if (status[0] === 0) {
        const data = readMessage();
        if (data) {
          console.log("MAIN received:", new TextDecoder().decode(data));
          voidFunction();
          
          //   if(queue.isBusy() === false){
          //     queue.writeNext()
          //   }

          return;
        }
      }

      mainSig.readyToRead();
    });
  }
}
console.log("MAIN => Sending voidMessage...");

const setVoidFunction =
  (fnNumber: number) =>
  (generateIDTask: () => number) =>
  (setUp: Function) =>
  (id: Int32Array) =>
  (status: Uint8Array) =>
  () => {
    id[0] = generateIDTask();
    status[1] = fnNumber;
    setUp();
  };

const voidFunction = setVoidFunction(0)(genTaskID)(mainSig.voidMessage)(id)(
  status,
);

voidFunction();

// ( async () => {
// await queue.add([superId,null,0])
//     .then(console.log)
// await queue.add([genTaskID(),null,0])
//     .then(console.log)
// await queue.add([genTaskID(),null,0])
//     .then(console.log)
// })()

// Start reading loop
mainLoop();
