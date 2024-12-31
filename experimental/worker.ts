import { workerData } from "node:worker_threads";
import {
  readMessageToUint,
  setArrayBuffers,
  workerSignal,
  writeUintMessage,
} from "./helpers.ts";
import { multi } from "./workerQueue.ts";

const decoder = new TextEncoder();

const listOfFunctions = [
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
//const readMsg = readMessageToUint(payload);
const writeMsg = writeUintMessage(id)(payload);

const queue = multi({
  jobs: listOfFunctions,
  writer: writeMsg,
  status,
})();

let currentState = status[0];

while (true) {
  currentState = status[0];

  // If main sets 224 (voidMessage) or 192 (send), that is > 127

  if (currentState > 127 && currentState !== 255) {
    // DEBBUGING STEPS
    // console.log(" 3 .- worker gets: ");
    // console.log([id[0], null, status[1], 224]);

    if (currentState === 224) {
      queue.add([id[0], null, status[1], 224]);
    }
    // } else if (currentState === 192) {
    //   // read input from payload
    //   const input = readMsg();
    //   queue.add([id[0], input, status[1],192]);
    //   workerSig.messageWasRead(); // => 1
    // }
  }

  // Process the next job
  await queue.nextJob();

  // If main sets 127 => we have "readyToRead" or this process has been busy finishing tasks => 1
  if (currentState === 127) {
    // check if someone has finished
    if (queue.someHasFinished()) {
      queue.write();
      continue;
    }

    if (queue.allDone()) {
      workerSig.finishedAllTasks();
    }
  }
}
