type TaskID = number;
type RawArguments = Uint8Array | null;
type WorkerResponse = Uint8Array;
type FunctionID = number;
type Solved = boolean;
type OnUse = boolean;
type Locked = boolean;
/**
 *  0 -> If there is a task for this thread
 *  1 -> If the thread is working on the task
 *  2 -> If it has been solve and it's ready to write
 *  3 -> ID of the task from the main
 *  4 -> Arguments to use
 *  5 -> Which function has to be used
 *  6 -> Response to write on buffer
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

type PartialQueueList = [
  TaskID,
  RawArguments,
  FunctionID,
];
export const genTaskID = ((int = new Int32Array([0])) => () => int[0] = int[0]+1 )()


export const currentPath = () => new URL(import.meta.url);

export const workingQueue =
  (jobs: Function[]) =>
  (writer: (job: QueueList) => void) =>
  (max: number) =>
  (
    arr = Array.from(
      { length: max },
      () => [false, false, false, 0, null, 0, new Uint8Array()],
    ) as QueueList[],
  ) => ({
    // Checks if every element is on used
    isBussy: () => arr.every((job) => job[0] === true),
    someHasFinished: () => arr.some((task) => task[2] === true),
    add: (element: PartialQueueList) => {
      const freeSlot = arr.findIndex((x) => x[0] === false);

      if (freeSlot !== -1) {
        // we have to set 0 to trur to assign a task
        arr[freeSlot][0] = true;
        arr[freeSlot][3] = element[0];
        arr[freeSlot][4] = element[1];
        arr[freeSlot][5] = element[2];
    
      } else {
        // This is the worse case possible where there was a conflict and the queue task has
        // to expand to don't lose the current task
        void arr.push(
          [
             // we have to set 0 to trur to assign a task
            true,
            false,
            false,
            element[0],
            element[1],
            element[2],
            new Uint8Array(),
          ],
        );
      }
    },
    write: () => {
      const hasFinished = arr.findIndex((x) => x[2] === true);
      if (hasFinished !== -1) {
        writer(arr[hasFinished]);
        arr[hasFinished][0] = false;
        arr[hasFinished][2] = false;
      }
    },
    nextJob: async () => {
      // x[0] checks for if there any job assigned to it
      // x[1] checks for if its in use for this function

      const id = arr.findIndex((x) => x[0] === true && x[1] === false);
     
      if (id !== -1) {

        // Locks the task
        arr[id][1] = true;

        // Resolves
        arr[id][6] = await jobs[arr[id][5]](arr[id][4]);

        // Mark as solved
        arr[id][2] = true;
        
      }
    },
  });

export const writeResponse = (uint8: Uint8Array) => (msg: Uint8Array) => {
  uint8.fill(0);
  // Pushes message
  uint8.set(msg, 0);
  // Sets terminator
  uint8[msg.length] = 10;
};

export const setArrayBuffers = {
  // Shared buffer
  sab: (BUFFER_SIZE = 1024) => new SharedArrayBuffer(BUFFER_SIZE),

  // Status of the signals occupies bytes 0..1 (2 bytes)
  status: (sab: SharedArrayBuffer) => new Uint8Array(sab, 0, 2),

  // Insert a 2-byte gap here (so the next item can be aligned to 4 bytes).
  // Now offset = 4 is 4-byte aligned for an Int32Array:
  id: (sab: SharedArrayBuffer) => new Int32Array(sab, 4, 1),

  // Then the payload can safely start at offset = 8
  payload: (sab: SharedArrayBuffer) => new Uint8Array(sab, 8),
};

export const mainSignal = (status: Uint8Array) => ({
  send: () => status[0] = 192,
  readyToRead: () => status[0] = 127,
  voidMessage: () => status[0] = 224,
  hasNoMoreMessages: () => status[0] = 255,
});

export const workerSignal = (status: Uint8Array) => ({
  // Shared buffer
  messageReady: () => status[0] = 0,
  messageWasRead: () => status[0] = 1,
  finishedAllTasks: () => status[0] = 2,
  tooBusy: () => status[0] = 126,
});

export const readMessageToUint = (uint8: Uint8Array) => () => {
  // Find the starting index of the last occurrence of the sequence
  // This is a magic number, the last element always is 10
  const lastIndex = uint8.lastIndexOf(10) - 1;

  return lastIndex === 0
    // If no sequence found or invalid position, return null
    ? null
    : uint8.slice(0, lastIndex);
};

export const readMessageToText = (
  // Sets up a decoder with a curried function
  (decoder = new TextDecoder()) => (uint8: Uint8Array) => () => {
    // Find the starting index of the last occurrence of the sequence
    // This is a magic number, the last element always is 10
    const lastIndex = uint8.lastIndexOf(10) - 1;

    return lastIndex === 0
      // If no sequence found or invalid position, return null
      ? null
      : decoder.decode(uint8.slice(0, lastIndex));
  }
)();

export const writeUintMessage =
  (id: Int32Array) => (playload: Uint8Array) => (job: QueueList) => {
    playload.fill(0);
    // Pushes message
    playload.set(job[6], 0);
    // Sets terminator
    playload[job[6].length] = 10;
    // Write the id of the task
    id[0] = job[3];
  };

export const writeTextMessage =
  ((encoder = new TextEncoder()) => (uint8: Uint8Array) => (msg: string) => {
    uint8.fill(0);
    // if the message is void

    const u = encoder.encode(msg);

    // Pushes message
    uint8.set(u, 0);

    // Sets terminator
    uint8[u.length] = 10;
  })();
