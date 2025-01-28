export type SignalArguments = ReturnType<typeof signalsForWorker>;
export type MainSignal = ReturnType<typeof mainSignal>;
export type WorkerSignal = ReturnType<typeof workerSignal>;

type StatusSignalForVoid = 224 | 192;
export type StatusSignal = StatusSignalForVoid;

type Sab = {
  size?: number;
  sharedSab?: SharedArrayBuffer;
};
export const signalsForWorker = (args?: Sab) => {
  const sab = args?.sharedSab
    ? args.sharedSab
    : new SharedArrayBuffer(args?.size ?? 4096);

  return {
    sab,
    status: new Uint8Array(sab, 0, 4),
    id: new Int32Array(sab, 4, 1),
    payloadLenght: new Int32Array(sab, 8, 1),
    payload: new Uint8Array(sab, 12),
  };
};

// Main thread signal management.
export const mainSignal = ({ status, id }: SignalArguments) => {
  let lastSignal = status[0] = 255;
  return ({
    currentSignal: () => lastSignal,
    updateLastSignal: () => (lastSignal = status[0]),
    send: (): 192 => (status[0] = lastSignal = 192),
    setSignal: (signal: StatusSignal) => (status[0] = signal),
    setFunctionSignal: (signal: number) => (status[1] = signal),
    readyToRead: (): 127 => (status[0] = lastSignal = 127),
    voidMessage: (): 224 => (status[0] = lastSignal = 224),
    hasNoMoreMessages: (): 255 => (status[0] = lastSignal = 255),
    getCurrentID: () => id[0],
  });
};

// Worker thread signal management.
export const workerSignal = ({ status, id }: SignalArguments) => ({
  curretSignal: () => status[0],
  messageReady: (): 0 => (status[0] = 0),
  messageWasRead: (): 1 => (status[0] = 1),
  finishedAllTasks: (): 2 => (status[0] = 2),
  getCurrentID: () => id[0],
});
