import { workerData } from "node:worker_threads";
import { readMessageToUint, writeUintMessage } from "./helpers.ts";
import { multi } from "./workerQueue.ts";
import { signalsForWorker, workerSignal } from "./signal.ts";
import { getFunctions } from "./fixpoint.ts";

const mainLoop = async () => {
  const sharedSab = workerData.sab as SharedArrayBuffer;

  const signals = signalsForWorker({
    sharedSab,
  });

  const listOfFunctions = await getFunctions({
    list: workerData.list,
    isWorker: true,
    ids: workerData.ids,
  })
    .then(
      (objs) =>
        objs.map(
          (obj) => obj.f,
        ),
    );

  const status = signals.status;
  const id = signals.id;

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
          break;
        }

        if (queue.allDone()) {
          workerSig.finishedAllTasks();
          break;
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
};

mainLoop();
