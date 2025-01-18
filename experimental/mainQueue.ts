// Type Definitions

import type { StatusSignal } from "./helpers.ts";
import { type MainSignal } from "./signal.ts";

// Task ID is a unique number representing a task.
type TaskID = number;
// RawArguments are optional arguments in the form of a Uint8Array.
type RawArguments = Uint8Array;
// WorkerResponse is the result of a task, represented as a Uint8Array.
type WorkerResponse = Uint8Array;
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

export type PromiseMap = Map<
  TaskID,
  [Promise<WorkerResponse>, (val: WorkerResponse) => void]
>;

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
  genTaskID: () => number;
  promisesMap: PromiseMap;
  max?: number;
};
export const multi = (
  { writer, signalBox, max, reader, genTaskID, promisesMap }:
    MultipleQueueSingle,
) => {
  const queue = Array.from(
    { length: max ?? 10 },
    () =>
      [
        true,
        false,
        0,
        new Uint8Array(),
        0,
        new Uint8Array(),
        true,
        224,
      ] as MainList,
  );

  const freeSlotOp = Array.from(
    { length: max ?? 10 },
    () => true,
  );

  return {
    isBusy: () => freeSlotOp.indexOf(true) === -1,

    canWrite: () => freeSlotOp.indexOf(false) !== -1,

    isEverythingSolve: () =>
      queue.every((item) => item[6] === true && item[0] === true),

    count: () =>
      queue.reduce((count, item) => (item[0] === false ? count + 1 : count), 0),

    add:
      (statusSignal: StatusSignal) =>
      (functionID: FunctionID) =>
      (rawArguments: RawArguments) => {
        const freeIndex = freeSlotOp.indexOf(true);
        const taskID = genTaskID();

        if (freeIndex === -1) {
          throw "No free slots! isBusyFailed uwu";
        }

        let resolveFn!: (res: WorkerResponse) => void;

        // Store the Promise + resolver in our Map
        promisesMap.set(taskID, [
          new Promise<WorkerResponse>((resolve) => {
            resolveFn = resolve;
          }),
          resolveFn,
        ]);

        // Occupy the free slot immediately
        queue[freeIndex][0] = false; // free -> in use
        freeSlotOp[freeIndex] = false; // free -> in use
        queue[freeIndex][1] = false; // solved -> false
        queue[freeIndex][2] = taskID; // taskID
        queue[freeIndex][3] = rawArguments; // rawArguments
        queue[freeIndex][4] = functionID; // functionID
        queue[freeIndex][6] = false; // hasBeenResolve -> false
        queue[freeIndex][7] = statusSignal; // StatusSignal

        return taskID;
      },

    /**
     * awaits: returns the same Promise that was created in `add`.
     * If the task was never added or has already been cleaned up,
     * it rejects (or you can choose to return a resolved Promise).
     */
    awaits: (id: TaskID) =>
      promisesMap.get(id)![0].then((x) => {
        promisesMap.delete(id);
        return x;
      }),
    awaitArray: (ids: TaskID[]) => {
      return Promise.all(
        ids.map((id) =>
          promisesMap.get(id)![0].then((x) => {
            promisesMap.delete(id);
            return x;
          })
        ),
      );
    },

    sendNextToWorker: () => {
      const idx = queue.findIndex(
        (item) => item[0] === false && item[1] === false,
      );
      if (idx === -1) {
        console.log(queue);
        throw "xd somethin whent wrong in sendNextToWorker";
      }

      writer(queue[idx]);

      signalBox.setFunctionSignal(queue[idx][4]);
      signalBox.setSignal(queue[idx][7]);
    },
    solve: () => {
      const idx = queue.findIndex((item) =>
        item[2] === signalBox.getCurrentID()
      );

      if (idx === -1) {
        throw "solve couldn't find " + signalBox.getCurrentID();
      }

      // Mark the task as solved
      queue[idx][1] = true; // solved
      queue[idx][5] = reader(); // store the response
      queue[idx][6] = true; // hasBeenResolve = true
      // Immediately free the slot
      queue[idx][0] = true;
      freeSlotOp[idx] = true; // free -> in use

      // Fulfill the promise we created in add
      const info = promisesMap.get(queue[idx][2]);
      if (info) {
        info[1](queue[idx][5]);
      } else {
        throw signalBox.getCurrentID() + "was not found";
      }
    },
  };
};
