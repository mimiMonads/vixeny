// Type Definitions

import type { StatusSignal } from "./helpers.ts";
import { type MainSignal } from "./signal.ts";

// Task ID is a unique number representing a task.
type TaskID = number;
// RawArguments are optional arguments in the form of a Uint8Array.
type RawArguments = Uint8Array | null;
// WorkerResponse is the result of a task, represented as a Uint8Array.
type WorkerResponse = Uint8Array | null;
// FunctionID represents a unique identifier for a function to execute.
type FunctionID = number;
// Boolean flags for task state.
type Solved = boolean;
type Free = boolean;
type Locked = Boolean;
type HasBeenResolve = boolean;

// MainList represents tasks in the main thread.
export type MainList = [
  Free,
  Solved,
  TaskID,
  RawArguments,
  FunctionID,
  WorkerResponse,
  HasBeenResolve,
  StatusSignal,
];

// PartialQueueList represents a minimal task structure for adding to a queue.
export type PartialQueueList = [
  TaskID,
  RawArguments,
  FunctionID,
  StatusSignal,
];

export type QueueList = [
  Free,
  Locked,
  Solved,
  TaskID,
  RawArguments,
  FunctionID,
  WorkerResponse,
  StatusSignal,
];

export type MultiQueue = ReturnType<typeof multi>;

type MultipleQueueSingle = {
  writer: (job: MainList) => void;
  reader: () => Uint8Array;
  signalBox: MainSignal;
  max?: number;
};
export const multi = (
  { writer, signalBox, max, reader }: MultipleQueueSingle,
) => {
  const queue = Array.from(
    { length: max ?? 10 },
    () => [true, false, 0, null, 0, new Uint8Array(), true, 224] as MainList,
  );

  /**
   * Instead of just storing (result) => void in a Map,
   * we’ll store both the Promise and the resolve function,
   * so `awaits(...)` can return the same Promise we created in `add`.
   */
  const promisesMap = new Map<
    TaskID,
    { promise: Promise<WorkerResponse>; resolve: (val: WorkerResponse) => void }
  >();

  return {
    isBusy: () => queue.every((item) => item[0] === false),

    canWrite: () => queue.some((item) => item[0] === false),

    isEverythingSolve: () =>
      queue.every((item) => item[6] === true && item[0] === true),

    count: () =>
      queue.reduce((count, item) => (item[0] === false ? count + 1 : count), 0),

    /**
     * add: insert a new task and create a Promise.
     * We'll store that Promise (and its resolver) in promisesMap
     * keyed by the taskID.
     */
    add: (task: PartialQueueList) => {
      const freeIndex = queue.findIndex((item) => item[0] === true);

      if (freeIndex === -1) {
        throw "No free slots! isBusyFailed uwu";
      }

      let resolveFn!: (res: WorkerResponse) => void;
      const promise = new Promise<WorkerResponse>((resolve) => {
        resolveFn = resolve;
      });

      // Store the Promise + resolver in our Map
      promisesMap.set(task[0], { promise, resolve: resolveFn });

      // Occupy the free slot immediately
      queue[freeIndex][0] = false; // free -> in use
      queue[freeIndex][1] = false; // solved -> false
      queue[freeIndex][2] = task[0]; // taskID
      queue[freeIndex][3] = task[1]; // rawArguments
      queue[freeIndex][4] = task[2]; // functionID
      queue[freeIndex][6] = false; // hasBeenResolve -> false
      queue[freeIndex][7] = task[3]; // StatusSignal

      return task[0];
    },

    /**
     * awaits: returns the same Promise that was created in `add`.
     * If the task was never added or has already been cleaned up,
     * it rejects (or you can choose to return a resolved Promise).
     */
    awaits: (id: TaskID) => {
      const info = promisesMap.get(id)!;

      return info.promise.then((x) => {
        promisesMap.delete(id);
        return x;
      });
    },
    awaitArray: (ids: TaskID[]) => {
      return Promise.all(
        ids.map((id) =>
          promisesMap.get(id)!.promise.then((x) => {
            promisesMap.delete(id);
            return x;
          })
        ),
      );
    },
    get: (id: TaskID) => {
      const idx = queue.findIndex((item) => item[2] === id);
      if (idx === -1) return null;
      return queue[idx][1] ? queue[idx][5] : null;
    },

    sendNextToWorker: () => {
      const idx = queue.findIndex(
        (item) => item[0] === false && item[1] === false,
      );
      if (idx === -1) {
        return; // No such slot
      }
      writer(queue[idx]);
      signalBox.setFunctionSignal(queue[idx][4]);
      signalBox.setSignal(queue[idx][7]);
      // Immediately free the slot
      queue[idx][0] = true;
    },
    solve: () => {
      const id = signalBox.getCurrentID();
      const idx = queue.findIndex((item) => item[2] === id);

      if (idx === -1) {
        throw "solve couldn't find " + id;
      }

      const res = reader();
      // Mark the task as solved
      queue[idx][1] = true; // solved
      queue[idx][5] = res; // store the response
      queue[idx][6] = true; // hasBeenResolve = true

      // Fulfill the promise we created in add
      const info = promisesMap.get(id);
      if (info) {
        info.resolve(res);
      }
    },
  };
};
