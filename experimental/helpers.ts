import type { MainList, QueueList } from "./mainQueue.ts";
import type { SignalArguments } from "./signal.ts";

// Signals
type StatusSignalForVoid = 224;
type StatusSignalForMessage = 192;
export type StatusSignal = StatusSignalForVoid | StatusSignalForMessage;

// Generate unique task IDs.
export const genTaskID = ((counter: number) => () => counter++)(0);

// Get the current file's path.
export const currentPath = () => new URL(import.meta.url);

// Read a message from a Uint8Array.
export const readMessageToUint =
  ({ payload, payloadLenght }: SignalArguments) => () =>
    payload.slice(0, payloadLenght[0].valueOf());

// Write a Uint8Array message with task metadata.
export const writeUintMessage =
  ({ id, payload, payloadLenght }: SignalArguments) => (task: QueueList) => {
    payload.set(task[6], 0);
    payloadLenght[0] = task[6].length;
    id[0] = task[3];
  };

export const sendUintMessage =
  ({ id, payload, payloadLenght }: SignalArguments) => (task: MainList) => {
    payload.set(task[3], 0);
    payloadLenght[0] = task[3].length;
    id[0] = task[2];
  };

export const getCallerFile = (n: number) => {
  const originalStackTrace = Error.prepareStackTrace;
  Error.prepareStackTrace = (_, stack) => stack;
  const err = new Error();
  const stack = err.stack as unknown as NodeJS.CallSite[];
  Error.prepareStackTrace = originalStackTrace;
  // Get the caller file
  const caller = stack[n]?.getFileName();

  if (!caller) {
    throw new Error("Unable to determine caller file.");
  }

  return caller;
};
