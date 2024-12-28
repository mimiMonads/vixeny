import { isMainThread, Worker, workerData } from "node:worker_threads";
import {
  genTaskID,
  mainSignal,
  readMessageToUint,
  setArrayBuffers,
  workerSignal,
  workingQueue,
  writeUintMessage,
} from "./helpers.ts";

const workerUrl = new URL(import.meta.url);


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
if (isMainThread) {
  const worker = new Worker(workerUrl, { type: "module", workerData: { sab } });
  const mainSig = mainSignal(status);
  const readMessage = readMessageToUint(payload);
  mainSig.hasNoMoreMessages()

  // Wait for worker statuses < 127
  function waitForWorkerReady() {
    return new Promise<void>((resolve) => {
      function check() {
        // < 127 means the worker might be 0,1,2,... up to 126
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
        }
         //worker.terminate();
        // Let worker know we have read it
        mainSig.readyToRead(); // 127
      }

      // If worker said "1 => message was read," do nothing
      // or queue more messages, etc. For now, no-op.
      if (status[0] === 1) {
        mainSig.readyToRead()
      }

      });
    }
  }
  console.log("MAIN => Sending voidMessage...");

  mainSig.voidMessage()
  id[0] = genTaskID()
  // Start reading loop
  mainLoop();

} //
// WORKER THREAD
//
else {
  const sab = workerData.sab;
  const status = setArrayBuffers.status(sab);
  const id = setArrayBuffers.id(sab);
  const payload = setArrayBuffers.payload(sab);

  const workerSig = workerSignal(status);
  const readMsg = readMessageToUint(payload);
  const writeMsg = writeUintMessage(id)(payload);

  // One example function: returns "Hello from Worker!"
  const listOfFunctions = [
    async (input: Uint8Array | null) => {
      const text = input
        ? new TextDecoder().decode(input)
        : "Hello from Worker!";
      return new TextEncoder().encode(text);
    },
  ];

  const queue = workingQueue(listOfFunctions)((job) => {
    // Called once the job is done: write to payload
    writeMsg(job);
    // Then signal main that the response is ready
    workerSig.messageReady(); // 0
  })(10)();

  let currentState = status[0]

  while (true) {
    currentState = status[0]

    // If main sets 224 (voidMessage) or 192 (send), that is > 127
 
    if(currentState > 127 && currentState !== 255){
  
    if (currentState === 224) {
      // queue a job => returns "Hello from Worker!"
      queue.add([999, null, 0]);
      // let main know we read its signal
      workerSig.messageWasRead(); // => 1
    } else if (currentState === 192) {
      // read input from payload
      const input = readMsg();
      queue.add([123, input, 0]);
      workerSig.messageWasRead(); // => 1
    }
  }

    // Process the next job
    await queue.nextJob();

    // If main sets 127 => we have "readyToRead" or this procces has been bussy finishing tasks => 1
    if (currentState === 127 || currentState === 126) {

      // check if someone has finished
      if(queue.someHasFinished()){
        queue.write()
        workerSig.messageReady()
      }

    }
  }
}
