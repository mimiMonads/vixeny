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
    const iterations = 10000;

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

const readMsg = readMessageToUint(signals);
const writeMsg = writeUintMessage(signals);

const queue = multi({
  jobs: listOfFunctions,
  writer: writeMsg,
  status,
});

while (true) {
  switch (workerSig.curretSignal()) {
    case 127: {
      if (queue.someHasFinished()) {
        queue.write();
        continue;
      }

      if (queue.allDone()) {
        workerSig.finishedAllTasks();
        continue;
      }
      workerSig.messageWasRead();
      break;
    }
    case 224:
      {
        queue.add([id[0], null, status[1], 224]);
      }
      break;
    case 192:
      {
        queue.add([id[0], readMsg(), status[1], 192]);
      }

      break;
  }

  // Process the next job
  await queue.nextJob();
}
