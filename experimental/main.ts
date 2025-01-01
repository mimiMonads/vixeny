// main.ts
import { Worker } from "node:worker_threads";
import { bench, boxplot, run } from "mitata";
import { multi, type MultiQueue } from "./mainQueue.ts";
import {
  genTaskID,
  optimalOrder,
  readMessageToUint,
  sendUintMessage,
  setArrayBuffers,
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
  const iterations = 10;

  for (let i = 0; i < iterations; i++) {
    sum += performance.now();
  }

  return decoder.encode(sum.toString());
};

type Resolver = {
  queue: MultiQueue;
  fn: Function;
  fnNumber: number;
  status: Uint8Array;
  statusSignal: 224;
  max?: number;
};

const isActive = (status: Uint8Array) =>
  status[0] === 255 ? queueMicrotask(check) : undefined;

const resolver = (args: Resolver) => {
  const { queue, fn, status, fnNumber, statusSignal, max } = args;

  const seq = optimalOrder(max ?? 10);

  return async () =>
    seq() ? fn() : queue.isBusy() ? fn() : (
      isActive(status),
        queue.awaits(
          queue.add([
            genTaskID(),
            null,
            fnNumber,
            statusSignal,
          ]),
        )
    );
};

const forTest = resolver({
  //@ts-ignore
  queue,
  fn: f,
  status: signals.status,
  fnNumber: 0,
  statusSignal: 224,
});

await forTest().then((x) => new TextDecoder().decode(x)).then(console.log);
await forTest().then((x) => new TextDecoder().decode(x)).then(console.log);
await forTest().then((x) => new TextDecoder().decode(x)).then(console.log);
await forTest().then((x) => new TextDecoder().decode(x)).then(console.log);
await forTest().then((x) => new TextDecoder().decode(x)).then(console.log);

boxplot(async () => {
  bench("main + 1 thread ", async () => {
    queueMicrotask(check);
    const a = queue.add([
        genTaskID(),
        null,
        0,
        224,
      ]),
      c = queue.add([
        genTaskID(),
        null,
        0,
        224,
      ]),
      b = queue.add([
        genTaskID(),
        null,
        0,
        224,
      ]);

    return queue.awaitArray([a, b, c]);
  });
  bench("main ", async () => {
    const a = await f();
    const b = await f();
    const c = await f();

    return [a, b, c];
  });
});

await run();

worker.terminate();
