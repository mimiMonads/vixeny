import type { MainList, QueueList } from "./mainQueue.ts";

// Signals
type StatusSignalForVoid = 224;
export type StatusSignal = StatusSignalForVoid;

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

// Generate unique task IDs.
export const genTaskID =
  ((counter = new Int32Array([0])) => () => (counter[0] += 1))();

// Get the current file's path.
export const currentPath = () => new URL(import.meta.url);

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
  send: (): 192 => (status[0] = 192),
  readyToRead: (): 127 => (status[0] = 127),
  voidMessage: (): 224 => (status[0] = 224),
  hasNoMoreMessages: (): 255 => (status[0] = 255),
});

// Worker thread signal management.
export const workerSignal = (status: Uint8Array) => ({
  messageReady: (): 0 => (status[0] = 0),
  messageWasRead: (): 1 => (status[0] = 1),
  finishedAllTasks: (): 2 => (status[0] = 2),
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
    // console.log("to send id: " + task[3]);
    idBuffer[0] = task[3]; // Task ID
  };

export const sendUintMessage =
  (idBuffer: Int32Array) => (payload: Uint8Array) => (task: MainList) => {
    idBuffer[0] = task[2];
    payload.fill(0);
    // If it's not null
    if (task[5] !== null) {
      payload.set(task[5], 0);
      payload[task[5].length] = 10; // Terminator
    } else {
      payload[0] = 10;
    }
  };

export const optimalOrder = (n: number) => {
  const a = Array.from(
    { length: (n * 2) },
    (_, i) => i % 2 == 1,
  );
  a[a.length - 1] = true;
  if (n > 3) {
    a[a.length - 2] = true;
  }

  return ((n: number) => (m: number) => () => n === m ? a[n = 0] : a[n++])(0)(
    (n * 2) - 1,
  );
};
