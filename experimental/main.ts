// main.ts
import { Worker } from "node:worker_threads";
import { multi, type MultiQueue, type PromiseMap } from "./mainQueue.ts";
import { genTaskID, readMessageToUint, sendUintMessage } from "./helpers.ts";
import { mainSignal, signalsForWorker } from "./signal.ts";
import { checker } from "./checker.ts";

export const createContext = ({
  promisesMap,
  list,
  ids,
}: {
  promisesMap: PromiseMap;
  list: string[];
  ids: number[];
}) => {
  const currentPath = import.meta.url;
  const workerUrl = new URL(currentPath.replace("main.ts", "worker.ts"));

  const signals = signalsForWorker();
  const signalBox = mainSignal(signals);

  const writer = sendUintMessage(signals);
  const reader = readMessageToUint(signals);

  const queue = multi({
    writer,
    signalBox,
    reader,
    genTaskID,
    promisesMap,
  });

  const check = checker({
    signalBox,
    queue,
  });

  const worker = new Worker(workerUrl, {
    //@ts-ignore
    type: "module",
    workerData: {
      sab: signals.sab,
      list,
      ids,
    },
  });

  const isActive = ((status: Uint8Array) => () =>
    status[0] === 255
      ? (
        // Skips one cycle
        status[0] = 254, queueMicrotask(check)
      )
      : undefined)(signals.status);

  type Resolver = {
    queue: MultiQueue;
    fnNumber: number;
    statusSignal: 224 | 192;
    max?: number;
  };

  const resolver = (args: Resolver) => {
    const { queue, fnNumber, statusSignal } = args;

    const adds = queue.add(statusSignal)(fnNumber);
    return async (args: Uint8Array) => {
      const r = adds(args);
      isActive();
      return queue.awaits(r);
    };
  };

  return {
    queue,
    resolver,
    isActive,
    awaitArray: queue.awaitArray,
    kills: () => worker.terminate(),
  };
};
