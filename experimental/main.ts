import { Worker } from "node:worker_threads";
import {
  genTaskID,
  mainSignal,
  readMessageToUint,
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
          // mainSig.voidMessage();
          // id[0] = genTaskID();
          // return
        }
      }

      mainSig.readyToRead();
    });
  }
}
console.log("MAIN => Sending voidMessage...");

mainSig.voidMessage();
id[0] = genTaskID();
// Start reading loop
mainLoop();
