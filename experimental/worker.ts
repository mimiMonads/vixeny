import { workerData } from "node:worker_threads";
import {
  readMessageToUint,
  setArrayBuffers,
  workerSignal,
  workingQueue,
  writeUintMessage,
} from "./helpers.ts";

const decoder = new TextEncoder();
const atm = ((n = 0) => () => n = n + 1)();
// One example function: returns "Hello from Worker!"
const listOfFunctions = [
  // async (input: Uint8Array | null) => {
  //   const text = input
  //     ? new TextDecoder().decode(input)
  //     : "Hello from Worker!" + atm();
  //   return decoder.encode(text);
  // },
  async () => {
    let sum = 0;

    // Increase or decrease the loop count for more or less work
    const iterations = 1_000;

    for (let i = 0; i < iterations; i++) {
      sum += performance.now();
    }

    return decoder.encode(sum.toString());
  },
];

const sab = workerData.sab;
const status = setArrayBuffers.status(sab);
const id = setArrayBuffers.id(sab);
const payload = setArrayBuffers.payload(sab);

const workerSig = workerSignal(status);
const readMsg = readMessageToUint(payload);
const writeMsg = writeUintMessage(id)(payload);

const queue = workingQueue(listOfFunctions)((job) => {
  // Called once the job is done: write to payload
  writeMsg(job);
  // Then signal main that the response is ready
  workerSig.messageReady(); // 0
})(10)();

let currentState = status[0];

while (true) {
  currentState = status[0];

  // If main sets 224 (voidMessage) or 192 (send), that is > 127

  if (currentState > 127 && currentState !== 255) {
    if (currentState === 224) {
      // queue a job => returns "Hello from Worker!"
      queue.add([id[0], null, status[1]]);
      // let main know we read its signal
      workerSig.messageWasRead(); // => 1
    } else if (currentState === 192) {
      // read input from payload
      const input = readMsg();
      queue.add([id[0], input, status[1]]);
      workerSig.messageWasRead(); // => 1
    }
  }

  // Process the next job
  await queue.nextJob();

  // If main sets 127 => we have "readyToRead" or this procces has been bussy finishing tasks => 1
  if (currentState === 127 || currentState === 126) {
    if (currentState === 126) {
      console.log("busy");
    }
    // check if someone has finished
    if (queue.someHasFinished()) {
      queue.write();
      workerSig.messageReady();
    }
  }
}
