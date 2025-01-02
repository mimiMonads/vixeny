// main.ts
import { Worker } from "node:worker_threads";
import { bench, boxplot, run } from "mitata";
import { multi, type MultiQueue } from "./mainQueue.ts";
import {
  genTaskID,
  optimalOrder,
  readMessageToUint,
  sendUintMessage,
} from "./helpers.ts";

import { mainSignal, signalsForWorker } from "./signal.ts";

import { checker } from "./checker.ts";

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
});
const check = checker({
  signalBox,
  queue,
});

const worker = new Worker(workerUrl, {
  type: "module",
  workerData: { sab: signals.sab },
});

const decoder = new TextEncoder();

const f = async () => {
  let sum = 0;

  // Increase or decrease the loop count for more or less work
  const iterations = 1000;

  for (let i = 0; i < iterations; i++) {
    sum += performance.now();
  }

  return decoder.encode(sum.toString());
};

type Resolver = {
  queue: MultiQueue;
  fnNumber: number;
  status: Uint8Array;
  statusSignal: 224;
  max?: number;
};

const isActive = (status: Uint8Array) =>
  status[0] === 255
    ? (
      // Skips one cycle
      status[0] = 254, queueMicrotask(check)
    )
    : undefined;

const resolver = (args: Resolver) => {
  const { queue, status, fnNumber, statusSignal } = args;

  const adds = queue.add(statusSignal)(fnNumber);
  return async () => (
    isActive(status),
      queue.awaits(
        adds(null),
      )
  );
};

const forTest = resolver({
  //@ts-ignore
  queue,
  status: signals.status,
  fnNumber: 0,
  statusSignal: 224,
});

boxplot(async () => {
  bench("thread ", async () => {
    await forTest();
  });
  bench("main ", async () => {
    await f();
  });
});

await run();
console.log(genTaskID());
worker.terminate();
