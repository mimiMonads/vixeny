// Type Definitions

import type { StatusSignal } from "./helpers.ts";

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

type MainQueueSingle = {
  writer: (job: MainList) => void;
  status: Uint8Array;
};

type MultipleQueueSingle = {
  writer: (job: MainList) => void;
  status: Uint8Array;
  max?: number;
};

export const multi = (args: MultipleQueueSingle) =>
(
  // Initialize each slot of the main queue.
  queue = Array.from(
    { length: args.max ?? 10 },
    () => [true, false, 0, null, 0, new Uint8Array(), true, 224] as MainList,
  ),
) => {
  const { writer, status } = args;

  /**
   * Keep track of every task's resolver, so when `solve` is called, we can
   * resolve the Promise that was returned by `add`.
   */
  const promisesMap = new Map<TaskID, (result: WorkerResponse) => void>();

  /**
   * A list of tasks waiting for a free slot. Each element is:
   * [partialQueueList, resolver]
   */
  const pendingTasks: Array<[PartialQueueList, (res: WorkerResponse) => void]> =
    [];

  /**
   * Try to fill any newly freed slots with tasks from pendingTasks.
   * This will be called after a task is solved (slot freed), or if you
   * want to check for newly available slots at some other point.
   */
  const processPendingTasks = () => {
    // Keep filling slots while both:
    // - There is at least one free slot
    // - There are pending tasks
    while (true) {
      const freeIndex = queue.findIndex((item) => item[0] === true);
      if (freeIndex === -1 || pendingTasks.length === 0) {
        break; // No free slot or no pending tasks
      }
      // Pop one pending task
      const [task, resolveFn] = pendingTasks.shift()!;

      // Occupy the free slot
      queue[freeIndex][0] = false; // free -> in use
      queue[freeIndex][1] = false; // solved -> false
      queue[freeIndex][2] = task[0]; // taskID
      queue[freeIndex][3] = task[1]; // rawArguments
      queue[freeIndex][4] = task[2]; // functionID
      // queue[freeIndex][5] = new Uint8Array(); // (Optional) reset WorkerResponse
      queue[freeIndex][6] = false; // hasBeenResolve -> false (reset)
      queue[freeIndex][7] = task[3]; // TypeOfFunction -> 224, 192, etc.

      // Keep track of the resolver so we can fulfill the promise in solve()
      promisesMap.set(task[0], resolveFn);
    }
  };

  return {
    /**
     * isBusy: indicates if all slots are occupied.
     * We treat queue[i][0] == false as “slot in use.”
     * Hence, if every slot’s free flag is false, we’re busy.
     */
    isBusy: () => queue.every((item) => item[0] === false),

    /**
     * canWrite: indicates if there's at least one slot in use.
     * (You might define it differently as well.)
     */
    canWrite: () => queue.some((item) => item[0] === false),

    /**
     * isEverythingSolve: are all tasks either solved or not in use?
     * i.e., queue[i][6] === true (solved) and queue[i][0] === true (free).
     */
    isEverythingSolve: () =>
      queue.every((item) => item[6] === true && item[0] === true),

    /**
     * count: how many slots are in use right now?
     */
    count: () =>
      queue.reduce((count, item) => (item[0] === false ? count + 1 : count), 0),

    /**
     * add: insert a new task.
     * - If there is a free slot, occupy it immediately
     * - Otherwise, enqueue it in pendingTasks
     * Returns a Promise that resolves with the task's WorkerResponse.
     */
    add: (task: PartialQueueList) => {
      return new Promise<WorkerResponse>((resolve) => {
        // Find a free slot
        const freeIndex = queue.findIndex((item) => item[0] === true);
        if (freeIndex === -1) {
          // No free slot => put in pending queue
          pendingTasks.push([task, resolve]);
        } else {
          // Occupy the free slot immediately
          queue[freeIndex][0] = false; // free -> in use
          queue[freeIndex][1] = false; // solved -> false
          queue[freeIndex][2] = task[0]; // taskID
          queue[freeIndex][3] = task[1]; // rawArguments
          queue[freeIndex][4] = task[2]; // functionID
          // queue[freeIndex][5] = new Uint8Array(); // (Optional) reset WorkerResponse
          queue[freeIndex][6] = false; // hasBeenResolve -> false
          queue[freeIndex][7] = task[3]; // TypeOfFunction -> 224, 192, etc.

          // Save the resolver so solve() can fulfill the Promise
          promisesMap.set(task[0], resolve);
        }
      });
    },

    /**
     * get: returns the WorkerResponse if the task is solved,
     * otherwise returns null (you could also make it return a Promise, etc.).
     */
    get: (id: TaskID) => {
      const idx = queue.findIndex((item) => item[2] === id);
      if (idx === -1) return null;
      return queue[idx][1] ? queue[idx][5] : null;
    },

    /**
     * sendNextToWorker: picks the first unsolved (in use) task and calls writer(...).
     * Mark that slot as free right after sending, so that concurrency logic can continue.
     */
    sendNextToWorker: () => {
      // Look for a slot that is "in use" but not "solved."
      const idx = queue.findIndex(
        (item) => item[0] === false && item[1] === false,
      );
      if (idx === -1) {
        return; // No such slot
      }
      // Actually send to worker
      writer(queue[idx]);
      status[0] = queue[idx][7];

      // Mark the slot as "free" immediately after sending
      // so that we can accept more tasks if needed.
      queue[idx][0] = true;

      // Now we might have just freed a slot.
      // Let's see if there's a pending task that can occupy it.
      processPendingTasks();
    },

    /**
     * solve: mark a task as solved, store its result, and resolve the promise
     * from `add`. Then, processPendingTasks to fill the newly freed slot.
     */
    solve: (id: TaskID, res: WorkerResponse) => {
      const idx = queue.findIndex((item) => item[2] === id);
      if (idx === -1) {
        console.log("No matching task found for ID:", id);
        return; // or throw
      }

      // Mark the task as solved
      queue[idx][1] = true; // solved
      queue[idx][5] = res; // store the response
      queue[idx][6] = true; // hasBeenResolve = true

      // Resolve the Promise that was returned by `add`
      const resolveFn = promisesMap.get(id);
      if (resolveFn) {
        resolveFn(res);
        promisesMap.delete(id);
      }

      // A slot just got solved => might be free
      processPendingTasks();
    },
  };
};

export const single = (args: MainQueueSingle) => {
  const { writer, status } = args;

  // Our single “slot.” By default:
  // slot = [ free = true, solved = false, taskID = 0, rawArgs = null,
  //          functionID = 0, workerResponse = Uint8Array(), hasBeenResolve = true ]
  let slot: MainList = [true, false, 0, null, 0, new Uint8Array(), true, 224];

  // A map to store each task’s resolver, so when `solve` is called we can resolve.
  const promisesMap = new Map<TaskID, (result: WorkerResponse) => void>();

  return {
    /**
     * `isBusy`: true if the single slot is in use (free == false).
     */
    isBusy: () => slot[0] === false,

    /**
     * `canWrite`: for consistency with the multi-slot version,
     * we’ll say it’s "true" if the slot is in use.
     * (Some folks interpret 'canWrite' as "is there something to write?",
     * but we'll keep your original semantics.)
     */
    canWrite: () => slot[0] === false,

    log: () => console.log(slot),
    /**
     * `isEverythingSolve`: Are we all done?
     * For a single slot, that means (a) it’s free again AND (b) the slot has been resolved before freeing.
     */
    isEverythingSolve: () => slot[6] === true && slot[0] === true,

    /**
     * `count`: how many tasks are “in progress” right now?
     * For one slot, that’s simply 0 or 1.
     */
    count: () => (slot[0] === false ? 1 : 0),

    /**
     * `add`: attempt to put a new task in the slot if it’s free.
     * Returns a Promise that resolves when the task is eventually `solve`d.
     */
    add: (task: PartialQueueList) => {
      // If we’re not free, can’t add a new task
      if (slot[0] === false) {
        return null;
      }
      return new Promise<WorkerResponse>((resolve) => {
        // Mark this slot as in use, unsolved
        slot[0] = false; // free -> in use
        slot[1] = false; // solved -> false
        slot[2] = task[0]; // taskID
        slot[3] = task[1]; // rawArguments
        slot[4] = task[2]; // functionID
        slot[6] = false; // hasBeenResolve -> false
        slot[7] = task[3]; // TypeOfFunction -> 224 , 192 ...
        // Store the Promise’s resolver, so we can call it in `solve`
        promisesMap.set(task[0], resolve);
      });
    },

    /**
     * `get`: returns the worker response if the slot belongs to `id` and is solved,
     * otherwise null.
     */
    get: (id: TaskID) => {
      if (slot[2] !== id) return null;
      return slot[1] ? slot[5] : null;
    },

    /**
     * `sendNextToWorker`: in the single-slot world, if we have a task (not free & unsolved),
     * we mark the slot as free right before calling `writer`.
     */
    sendNextToWorker: () => {
      if (slot[0] === false && slot[1] === false) {
        status[0] = slot[7];
        // Mark as free just before we “send” it off
        slot[0] = true;
        writer(slot);
      }
    },

    /**
     * `solve`: mark the current slot as solved; store the response,
     * then resolve the Promise from `add`.
     */
    solve: (id: TaskID, res: WorkerResponse) => {
      if (slot[2] !== id) {
        // Not our slot; ignore or throw
        return;
      }
      // Mark as solved; store the data
      slot[1] = true;
      slot[5] = res;
      slot[6] = true;
      // Fulfill the stored Promise
      const resolver = promisesMap.get(id);
      if (resolver) {
        resolver(res);
        promisesMap.delete(id);
      }
    },
  };
};
