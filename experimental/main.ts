// main.ts
import { Worker } from "node:worker_threads";
import {
  genTaskID,
  mainQueue,
  mainSignal,
  readMessageToUint,
  sendUintMessage,
  setArrayBuffers,
} from "./helpers.ts";

const currentPath = import.meta.url;
const workerUrl = new URL(currentPath.replace("main.ts", "worker.ts"));

// Example only, presumably your worker uses these
const listOfFunctions = [
  async (input: Uint8Array | null) => {
    const text = input ? new TextDecoder().decode(input) : "Hello from Worker!";
    return new TextEncoder().encode(text);
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SHARED BUFFERS
// ─────────────────────────────────────────────────────────────────────────────
const sab = setArrayBuffers.sab();
const status = setArrayBuffers.status(sab);
const id = setArrayBuffers.id(sab);
const payload = setArrayBuffers.payload(sab);
const writer = sendUintMessage(id)(payload);
const queue = mainQueue(writer)(10)();

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

  // Send to Macro
  setInterval(check, 0);
}

// Start the infinite loop
queueMicrotask(check);

console.log("MAIN => Starting tasks...");

const t1 = performance.now();

await Promise.all([
  queue.add([genTaskID(), null, 0]).then(console.log),
  queue.add([genTaskID(), null, 0]).then(console.log),
  queue.add([genTaskID(), null, 0]).then(console.log),
  queue.add([genTaskID(), null, 0]).then(console.log),
  queue.add([genTaskID(), null, 0]).then(console.log),
  queue.add([genTaskID(), null, 0]).then(console.log),
  queue.add([genTaskID(), null, 0]).then(console.log),
  queue.add([genTaskID(), null, 0]).then(console.log),
  queue.add([genTaskID(), null, 0]).then(console.log),
  queue.add([genTaskID(), null, 0]).then(console.log),
  queue.add([genTaskID(), null, 0]).then(console.log),
]);

console.log(performance.now() - t1);
