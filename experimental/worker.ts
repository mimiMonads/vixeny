import { workerData } from "node:worker_threads";
import {
  readMessageToUint,
  setArrayBuffers,
  writeUintMessage,
} from "./helpers.ts";
import { multi } from "./workerQueue.ts";

import { signalsForWorker, workerSignal } from "./signal.ts";

const decoder = new TextEncoder();

const listOfFunctions = [
  async () => {
    let sum = 0;

    // Increase or decrease the loop count for more or less work
    const iterations = 10;

    for (let i = 0; i < iterations; i++) {
      sum += performance.now();
    }

    return decoder.encode(sum.toString());
  },
];

const sharedSab = workerData.sab as SharedArrayBuffer;

const signals = signalsForWorker({
  sharedSab,
});

const status = setArrayBuffers.status(signals.sab);
const id = setArrayBuffers.id(signals.sab);

const workerSig = workerSignal(signals);

//const readMsg = readMessageToUint(payload);
const writeMsg = writeUintMessage(signals);

const queue = multi({
  jobs: listOfFunctions,
  writer: writeMsg,
  status,
});

let currentState = workerSig.curretSignal();

while (true) {
  currentState = workerSig.curretSignal();

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
