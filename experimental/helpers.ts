// Type Definitions
// Task ID is a unique number representing a task.
type TaskID = number;
// RawArguments are optional arguments in the form of a Uint8Array.
type RawArguments = Uint8Array | null;
// WorkerResponse is the result of a task, represented as a Uint8Array.
type WorkerResponse = Uint8Array;
// FunctionID represents a unique identifier for a function to execute.
type FunctionID = number;
// Boolean flags for task state.
type Solved = boolean;
type OnUse = boolean;
type Locked = boolean;

/**
 * QueueList:
 * - Represents the structure of a queue item in the worker thread.
 *   0: OnUse - Whether the task is assigned.
 *   1: Locked - Whether the task is locked/in-progress.
 *   2: Solved - Whether the task has been completed.
 *   3: TaskID - ID of the task.
 *   4: RawArguments - Input arguments for the task.
 *   5: FunctionID - ID of the function to execute.
 *   6: WorkerResponse - Result of the task.
 */
type QueueList = [
  OnUse,
  Locked,
  Solved,
  TaskID,
  RawArguments,
  FunctionID,
  WorkerResponse,
];

// MainList represents tasks in the main thread.
type MainList = [
  Solved,
  TaskID,
  RawArguments,
  FunctionID,
  WorkerResponse,
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
      const taskIndex = queue.findIndex((task) => task[0] && !task[1]);

      if (taskIndex !== -1) {
        const task = queue[taskIndex];
        task[1] = true; // Lock the task
        task[6] = await jobs[task[5]](task[4]); // Execute the job
        task[2] = true; // Mark as solved
        task[1] = false; // Unlock the task
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
  const terminatorIndex = buffer.lastIndexOf(10) - 1;
  return terminatorIndex >= 0 ? buffer.slice(0, terminatorIndex) : null;
};

// Write a Uint8Array message with task metadata.
export const writeUintMessage =
  (idBuffer: Int32Array) => (payload: Uint8Array) => (task: QueueList) => {
    payload.fill(0);
    payload.set(task[6], 0);
    payload[task[6].length] = 10; // Terminator
    idBuffer[0] = task[3]; // Task ID
  };
