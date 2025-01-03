// main.ts
import { Worker } from "node:worker_threads";
import { bench, boxplot, group, run, summary } from "mitata";
import { multi, type MultiQueue, type PromiseMap } from "./mainQueue.ts";
import { genTaskID, readMessageToUint, sendUintMessage } from "./helpers.ts";

import { mainSignal, signalsForWorker } from "./signal.ts";

import { checker } from "./checker.ts";

const promisesMap: PromiseMap = new Map();

const createContext = ({
  promisesMap,
}: {
  promisesMap: PromiseMap;
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
    type: "module",
    workerData: { sab: signals.sab },
  });

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

  return {
    awaits: (ar: number) => (queue.awaits(ar)),
    adds: (args: Uint8Array<ArrayBufferLike> | null) => {
      isActive(signals.status);
      return queue.add(224)(0)(args);
    },
    addsResolve: resolver({
      //@ts-ignore
      queue,
      status: signals.status,
      fnNumber: 0,
      statusSignal: 224,
    }),
    awaitArray: queue.awaitArray,
    kills: () => worker.terminate(),
  };
};

const decoder = new TextEncoder();

const f = async () => {
  let sum = 0;

  // Increase or decrease the loop count for more or less work
  const iterations = 10000;

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

const context1 = createContext({ promisesMap });
const context2 = createContext({ promisesMap });
const context3 = createContext({ promisesMap });
const context4 = createContext({ promisesMap });
const context5 = createContext({ promisesMap });

boxplot(async () => {
  group("1", () => {
    summary(() => {
      bench(" 1 thread ", async () => {
        await context1.awaitArray([
          context1.adds(null),
        ]);
      });

      bench(" main * 1", async () => {
        await f();
      });
    });
  });

  group("2", () => {
    summary(() => {
      bench(" 2 thread ", async () => {
        await context1.awaitArray([
          context1.adds(null),
          context2.adds(null),
        ]);
      });

      bench(" main * 2", async () => {
        await Promise.all([
          f(),
          f(),
        ]);
      });
    });
  });

  group("3", () => {
    summary(() => {
      bench(" 3 thread ", async () => {
        await context1.awaitArray([
          context1.adds(null),
          context2.adds(null),
          context3.adds(null),
        ]);
      });

      bench(" main * 3", async () => {
        await Promise.all([
          f(),
          f(),
          f(),
        ]);
      });
    });
  });
});

group("4", () => {
  summary(() => {
    bench(" 4 thread ", async () => {
      await context1.awaitArray([
        context1.adds(null),
        context2.adds(null),
        context3.adds(null),
        context4.adds(null),
      ]);
    });

    bench("main * 4", async () => {
      await Promise.all([
        f(),
        f(),
        f(),
        f(),
      ]);
    });
  });
});

group("5", () => {
  summary(() => {
    bench(" 5 thread ", async () => {
      await context1.awaitArray([
        context1.adds(null),
        context2.adds(null),
        context3.adds(null),
        context4.adds(null),
        context5.adds(null),
      ]);
    });

    bench("main * 5", async () => {
      await Promise.all([
        f(),
        f(),
        f(),
        f(),
        f(),
      ]);
    });
  });
});

await run();
console.log(genTaskID());
context1.kills();
context2.kills();
context3.kills();
context4.kills();
context5.kills();
