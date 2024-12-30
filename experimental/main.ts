// main.ts
import { Worker } from "node:worker_threads";
import { bench, run } from "mitata";
import {
  genTaskID,
  mainQueue,
  mainQueueSingle,
  mainSignal,
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
//const queue = mainQueue(writer)(2)();
const queue = mainQueueSingle(writer);
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

  // If worker posted a "response" (status=0), solve it
  if (currentStatus < 126) {
    if (currentStatus === 0) {
      const data = readMessage();
      queue.solve(id[0], data);

      if (queue.canWrite()) {
        queue.sendNextToWorker();
        status[0] = 224;
      } else {
        if (queue.isEverythingSolve()) {
          mainSig.hasNoMoreMessages();
          //terminate();
          return;
        }
        mainSig.readyToRead();
      }

      queueMicrotask(check);
      return;
    }

    mainSig.readyToRead();
    queueMicrotask(check);
    return;
  }

  // If worker is "done" or requests more (status=255)
  if (currentStatus === 255) {
    if (queue.canWrite()) {
      queue.sendNextToWorker();
      status[0] = 224;
    }
  }

  queueMicrotask(check);
}

// Terminate the worker and it's used for debugging
const terminate = () => {
  console.log("finish");
  worker.terminate();
};

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
  queue: ReturnType<ReturnType<ReturnType<typeof mainQueue>>>;
  fn: Function;
  fnNumber: number;
  status: Uint8Array;
};

const isActive = (status: Uint8Array) =>
  status[0] === 255 ? queueMicrotask(check) : undefined;

const resolver = (args: Resolver) => {
  const { queue, fn, status, fnNumber } = args;

  return async () =>
    queue.isBusy() ? fn() : (
      isActive(status),
        status[0] = 224,
        queue.add([
          genTaskID(),
          null,
          fnNumber,
        ])
    );
};

const forTest = resolver({
  //@ts-ignore
  queue,
  fn: f,
  status,
  fnNumber: 0,
});

(
  async () => {
    bench("main + 1 thread ", async () => {
      forTest();
      forTest();
    });

    bench("normal", async () => {
      f(), f();
    });

    await run();
  }
)();
