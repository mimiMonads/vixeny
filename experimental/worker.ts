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
          (obj) => [obj.f, obj.statusSignal],
        ),
    );

  const status = signals.status;
  const id = signals.id;

  const workerSig = workerSignal(signals);

  const readMsg = readMessageToUint(signals);
  const writeMsg = writeUintMessage(signals);

  const queue = multi({
    //@ts-ignore
    jobs: listOfFunctions,
    writer: writeMsg,
    status,
  });

  while (true) {
    switch (workerSig.curretSignal()) {
      case 0:
      case 1:
      case 2:
      case 128: {
        continue;
      }

      case 127: {
        await queue.nextJob();

        if (queue.someHasFinished()) {
          queue.write();
          continue;
        }
        if (queue.allDone()) {
          workerSig.finishedAllTasks();
          continue;
        }

        workerSig.messageWasRead();
        continue;
      }

      case 224:
        {
          //@ts-ignore
          queue.add([id[0], null, status[1], 224]);
        }
        continue;
      case 192:
        {
          queue.add([id[0], readMsg(), status[1], 192]);
        }

        continue;
    }
  }
};

mainLoop();
