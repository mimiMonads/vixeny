// main.ts
import { Worker } from "node:worker_threads";
import { bench, group, run } from "mitata";
import { multi, single } from "./mainQueue.ts";
import {
  genTaskID,
  mainSignal,
  optimalOrder,
  readMessageToUint,
  sendUintMessage,
  setArrayBuffers,
} from "./helpers.ts";

const currentPath = import.meta.url;
const workerUrl = new URL(currentPath.replace("main.ts", "worker.ts"));

// ─────────────────────────────────────────────────────────────────────────────
// SHARED BUFFERS
// ─────────────────────────────────────────────────────────────────────────────
const sab = setArrayBuffers.sab();
const status = setArrayBuffers.status(sab);
const id = setArrayBuffers.id(sab);
const payload = setArrayBuffers.payload(sab);
const writer = sendUintMessage(id)(payload);
const queue = multi({
  writer,
  status,
})();
//const queue = single({ writer, status });
// ─────────────────────────────────────────────────────────────────────────────
// MAIN THREAD
// ─────────────────────────────────────────────────────────────────────────────
const worker = new Worker(workerUrl, { type: "module", workerData: { sab } });
const mainSig = mainSignal(status);
const readMessage = readMessageToUint(payload);
mainSig.hasNoMoreMessages();

// ─────────────────────────────────────────────────────────────────────────────
// The "check" loop that never ends (so your tasks always get resolved)
// ─────────────────────────────────────────────────────────────────────────────
function check() {
  const currentStatus = status[0];

  // If has posted something
  if (currentStatus < 126) {
    // If worker posted a "response" (status=0), solve it
    if (currentStatus === 0) {
      queue.solve(id[0], readMessage());

      if (queue.canWrite()) {
        queue.sendNextToWorker();
      } else {
        mainSig.readyToRead();
      }

      queueMicrotask(check);
      return;
    }

    if (currentStatus === 2) {
      if (!queue.canWrite()) {
        return;
      }
    }

    mainSig.readyToRead();
    queueMicrotask(check);
    return;
  }

  // If worker is "done" or requests more (status=255)
  if (currentStatus === 255) {
    if (queue.canWrite()) {
      queue.sendNextToWorker();
    } else {
      return;
    }
  }

  queueMicrotask(check);
}

console.log("MAIN => Starting tasks...");

const decoder = new TextEncoder();

const f = async () => {
  let sum = 0;

  // Increase or decrease the loop count for more or less work
  const iterations = 1_000;

  for (let i = 0; i < iterations; i++) {
    sum += performance.now();
  }

  return decoder.encode(sum.toString());
};

type Resolver = {
  queue: ReturnType<ReturnType<typeof multi>>;
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
        queue.add([
          genTaskID(),
          null,
          fnNumber,
          statusSignal,
        ])
    );
};

const forTest = resolver({
  //@ts-ignore
  queue,
  fn: f,
  status,
  fnNumber: 0,
  statusSignal: 224,
});

group("Compare", async () => {
  bench("main + 1 thread ", async () => {
    Promise.all([
      forTest(),
      forTest(),
    ]);
  });

  bench("normal", async () => {
    Promise.all([
      f(),
      f(),
    ]);
  });
});

await run();

worker.terminate();
