// Type Definitions
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
type Locked = boolean;
type hasBeenResolve = boolean;

/**
 * QueueList:
 * - Represents the structure of a queue item in the worker thread.
 *   0: Free - Whether the task is assigned.
 *   1: Locked - Whether the task is locked/in-progress.
 *   2: Solved - Whether the task has been completed.
 *   3: TaskID - ID of the task.
 *   4: RawArguments - Input arguments for the task.
 *   5: FunctionID - ID of the function to execute.
 *   6: WorkerResponse - Result of the task.
 */
type QueueList = [
  Free,
  Locked,
  Solved,
  TaskID,
  RawArguments,
  FunctionID,
  WorkerResponse,
];

// MainList represents tasks in the main thread.
type MainList = [
  Free,
  Solved,
  TaskID,
  RawArguments,
  FunctionID,
  WorkerResponse,
  hasBeenResolve,
];

// PartialQueueList represents a minimal task structure for adding to a queue.
type PartialQueueList = [
  TaskID,
  RawArguments,
  FunctionID,
];

// Generate unique task IDs.
export const genTaskID =
  ((counter = new Int32Array([0])) => () => (counter[0] += 1))();

// Get the current file's path.
export const currentPath = () => new URL(import.meta.url);

export const mainQueue = (writer: (job: MainList) => void) =>
(max: number) =>
(
  // Initialize each slot of the main queue. By default, we set:
  //   free = false (meaning the slot is actually free to be used)
  //   solved = false
  //   taskID = 0
  //   rawArguments = null
  //   functionID = 0
  //   workerResponse = new Uint8Array()
  queue = Array.from(
    { length: max },
    () => [true, false, 0, null, 0, new Uint8Array(), true] as MainList,
  ),
) => {
  /**
   * Keep track of every task's resolver, so when `solve` is called we can
   * resolve the Promise that was returned by `add`.
   */
  const promisesMap = new Map<
    TaskID,
    (result: WorkerResponse) => void
  >();

  return {
    /**
     * isBusy: indicates if all slots are occupied.
     * We treat queue[i][0] == false as “slot in use.”
     * Hence, if every slot’s free flag is false, we’re busy.
     */
    isBusy: () => queue.every((item) => item[0] === false),
    canWrite: () => queue.some((item) => item[0] === false),
    isEverythingSolve: () =>
      queue.every((item) => (item[6] === true && item[0] === true)),
    count: () => queue.reduce((x, acc) => acc[0] === false ? x + 1 : x, 0),
    /**
     * add: insert a new task into the first free slot (where free == false).
     * Returns a Promise that resolves when the task is eventually solved.
     */
    add: (task: PartialQueueList) => {
      return new Promise<WorkerResponse>((resolve) => {
        // Find a free slot
        const freeIndex = queue.findIndex((item) => item[0] === true);
        if (freeIndex === -1) {
          return null;
        }
        // Mark this slot as in use, unsolved, and fill in the metadata
        queue[freeIndex][0] = false; // free -> in use
        queue[freeIndex][1] = false; // solved -> false
        queue[freeIndex][2] = task[0]; // taskID
        queue[freeIndex][3] = task[1]; // rawArguments
        queue[freeIndex][4] = task[2]; // functionID
        // queue[freeIndex][5] = new Uint8Array(); // (Optional) initialize WorkerResponse
        queue[freeIndex][6] = false; // hasBeenResolve -> false (reset)
        // Store this promise's resolver so we can fulfill it later in solve()
        promisesMap.set(task[0], resolve);
      });
    },

    /**
     * get: returns the WorkerResponse if the task is solved;
     * otherwise, you could (a) return null, (b) throw an error,
     * or (c) return a Promise that resolves when the task finishes.
     * Below, we’ll demonstrate a simple "return the data if solved, else null."
     */
    get: (id: TaskID) => {
      const idx = queue.findIndex((item) => item[2] === id);
      if (idx === -1) return null;
      return queue[idx][1] ? queue[idx][5] : null;
    },

    sendNextToWorker: () => {
      // First look for a free slot
      let idx = queue.findIndex(
        (item) => item[0] === false && item[1] === false,
      );

      if (idx === -1) {
        return;
      }

      queue[idx][0] = true;
      writer(queue[idx]);
    },
    /**
     * solve: mark a task as solved and store its result.
     * Then resolve the promise from `add`.
     */
    solve: (id: TaskID, res: WorkerResponse) => {
      const idx = queue.findIndex((item) => item[2] === id);

      if (idx === -1) {
        // No matching task found; safely ignore or throw
        return;
      }

      // Mark the task as solved, store the response
      queue[idx][1] = true; // solved
      queue[idx][5] = res; // update the response
      queue[idx][6] = true; // solved
      // Resolve the Promise that was returned by `add`
      const resolveFn = promisesMap.get(id);
      if (resolveFn) {
        resolveFn(res);
        promisesMap.delete(id);
      }
    },
  };
};
// Create and manage a working queue.
export const workingQueue =
  (jobs: Function[]) =>
  (writer: (job: QueueList) => void) =>
  (max: number) =>
  (
    queue = Array.from(
      { length: max },
      () => [false, false, false, 0, null, 0, new Uint8Array()] as QueueList,
    ),
  ) => ({
    // Check if all tasks are in use.
    isBusy: () => queue.every((job) => job[0]),

    // Check if any task is solved and ready for writing.
    someHasFinished: () => queue.some((task) => task[2]),

    // Add a task to the queue.
    add: (element: PartialQueueList) => {
      const freeSlot = queue.findIndex((task) => !task[0]);

      if (freeSlot !== -1) {
        queue[freeSlot] = [
          true, // OnUse
          false, // Locked
          false, // Solved
          element[0], // TaskID
          element[1], // RawArguments
          element[2], // FunctionID
          new Uint8Array(), // WorkerResponse
        ];
      } else {
        queue.push([
          true,
          false,
          false,
          element[0],
          element[1],
          element[2],
          new Uint8Array(),
        ]);
      }
    },

    // Write completed tasks to the writer.
    write: () => {
      const finishedTaskIndex = queue.findIndex((task) => task[2]);
      if (finishedTaskIndex !== -1) {
        writer(queue[finishedTaskIndex]); // Writes on playload
        queue[finishedTaskIndex][0] = false; // Reset OnUse
        queue[finishedTaskIndex][2] = false; // Reset Solved
      }
    },

    // Process the next available task.
    nextJob: async () => {
      const taskIndex = queue.findIndex((task) =>
        task[0] && !task[1] && !task[2]
      );
      if (taskIndex !== -1) {
        const task = queue[taskIndex];
        task[1] = true; // Lock the task
        try {
          task[6] = await jobs[task[5]](task[4]); // Execute the job
          task[2] = true; // Mark as solved
        } finally {
          task[1] = false; // Unlock the task
        }
      }
    },
  });

// Write a response to a buffer.
export const writeResponse = (buffer: Uint8Array) => (msg: Uint8Array) => {
  buffer.fill(0);
  buffer.set(msg, 0);
  buffer[msg.length] = 10; // Terminator
};

// Manage shared buffers for communication.
export const setArrayBuffers = {
  sab: (size = 1024) => new SharedArrayBuffer(size),

  status: (sab: SharedArrayBuffer) => new Uint8Array(sab, 0, 2),

  id: (sab: SharedArrayBuffer) => new Int32Array(sab, 4, 1),

  payload: (sab: SharedArrayBuffer) => new Uint8Array(sab, 8),
};

// Main thread signal management.
export const mainSignal = (status: Uint8Array) => ({
  send: () => (status[0] = 192),
  readyToRead: () => (status[0] = 127),
  voidMessage: () => (status[0] = 224),
  hasNoMoreMessages: () => (status[0] = 255),
});

// Worker thread signal management.
export const workerSignal = (status: Uint8Array) => ({
  messageReady: () => (status[0] = 0),
  messageWasRead: () => (status[0] = 1),
  finishedAllTasks: () => (status[0] = 2),
  tooBusy: () => (status[0] = 126),
});

// Read a message from a Uint8Array.
export const readMessageToUint = (buffer: Uint8Array) => () => {
  const terminatorIndex = buffer.lastIndexOf(10);
  return terminatorIndex >= 0 ? buffer.slice(0, terminatorIndex) : null;
};

// Write a Uint8Array message with task metadata.
export const writeUintMessage =
  (idBuffer: Int32Array) => (payload: Uint8Array) => (task: QueueList) => {
    payload.fill(0);
    // If it's not null
    if (task[6] !== null) {
      payload.set(task[6], 0);
      payload[task[6].length] = 10; // Terminator
    } else {
      payload[0] = 10;
    }
    idBuffer[0] = task[3]; // Task ID
  };

export const sendUintMessage =
  (idBuffer: Int32Array) => (payload: Uint8Array) => (task: MainList) => {
    payload.fill(0);
    // If it's not null
    if (task[5] !== null) {
      payload.set(task[5], 0);
      payload[task[5].length] = 10; // Terminator
    } else {
      payload[0] = 10;
    }
    idBuffer[0] = task[2]; // Task ID
  };

/**
 * The shape of our queue item (the single slot).
 * [ free, solved, taskID, rawArguments, functionID, workerResponse, hasBeenResolve ]
 */
type MainList = [
  boolean, // free
  boolean, // solved
  number, // taskID
  any, // rawArguments
  number, // functionID
  Uint8Array, // workerResponse
  boolean, // hasBeenResolve
];

export const mainQueueSingle = (writer: (job: MainList) => void) => {
  // Our single “slot.” By default:
  // slot = [ free = true, solved = false, taskID = 0, rawArgs = null,
  //          functionID = 0, workerResponse = Uint8Array(), hasBeenResolve = true ]
  let slot: MainList = [true, false, 0, null, 0, new Uint8Array(), true];

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
