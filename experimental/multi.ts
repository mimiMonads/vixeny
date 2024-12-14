import { plugins } from "../main.ts";
import { isMainThread, parentPort, Worker } from "node:worker_threads";

const workerUrl = new URL(import.meta.url);

// We'll store the resolver in the same scope so the on('message') handler can see it.
let globalMessageResolver: ((value: string) => void) | null = null;

const createWorker = () => {
  const worker = new Worker(workerUrl, { type: "module" });

  // When the worker sends a message, resolve the promise if we have a resolver waiting.
  worker.on("message", (msg) => {
    if (globalMessageResolver) {
      globalMessageResolver(msg);
      globalMessageResolver = null;
    }
  });

  return worker;
};

if (!isMainThread) {
  if (parentPort === null) {
    throw Error("Missing parentPort in worker thread");
  }

  const settings = {
    algorithm: "argon2id", // "argon2id" | "argon2i" | "argon2d"
    memoryCost: 4, // memory usage in kibibytes
    timeCost: 3, // the number of iterations
  };
  parentPort.on("message", async (data) => {
    const hash = await Bun.password.hash(data, settings);

    parentPort.postMessage(hash);
  });
}

const sealedwork = (w: Worker) => {
  // Returns a function that sends a message to `w` and awaits the response
  return async (msg: string) => {
    return new Promise<string>((resolve) => {
      // Tie the "globalMessageResolver" to *this* call's `resolve`.
      globalMessageResolver = resolve;
      w.postMessage(msg);
    });
  };
};

export const bjscript = plugins.type({
  name: Symbol.for("hello"),
  isFunction: false,
  isAsync: true,
  type: {} as string,
  f: async () => {
    // Create the worker once
    const work = createWorker();
    // Generate an async function that sends a message
    const message = sealedwork(work);

    // Return a function that, when called, sends "hi" and awaits response
    return async (request) => {
      return await message(request.url);
    };
  },
});
