import type { MainList, QueueList } from "./mainQueue.ts";
import type { SignalArguments } from "./signal.ts";

// Signals
type StatusSignalForVoid = 224;
type StatusSignalForMessage = 192;
export type StatusSignal = StatusSignalForVoid | StatusSignalForMessage;

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

// Read a message from a Uint8Array.
export const readMessageToUint = ({ payload }: SignalArguments) => () => {
  const terminatorIndex = payload.lastIndexOf(10);
  return payload.slice(0, terminatorIndex);
};

// Write a Uint8Array message with task metadata.
export const writeUintMessage =
  ({ id, payload }: SignalArguments) => (task: QueueList) => {
    payload.fill(0);
    // If it's not null
    if (task[6] !== null) {
      payload.set(task[6], 0);
      payload[task[6].length] = 10; // Terminator
    } else {
      payload[0] = 10;
    }

    id[0] = task[3]; // Task ID
  };

export const sendUintMessage =
  ({ id, payload }: SignalArguments) => (task: MainList) => {
    payload.fill(0);
    // If it's not null
    if (task[5] !== null) {
      payload.set(task[5], 0);
      payload[task[5].length] = 10; // Terminator
    } else {
      payload[0] = 10;
    }

    id[0] = task[2];
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
