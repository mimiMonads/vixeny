import type { PartialQueueList, QueueList } from "./mainQueue.ts";
import type { StatusSignal, WorkerSignal } from "./signal.ts";

type ArgumetnsForMulti = {
  jobs: [Function, StatusSignal][];
  max?: number;
  writer: (job: QueueList) => void;
  signal: WorkerSignal;
  status: Uint8Array;
};
// Create and manage a working queue.
export const multi = ({ jobs, max, writer, status }: ArgumetnsForMulti) => {
  const queue = Array.from(
    { length: max ?? 10 },
    () =>
      [
        false,
        false,
        false,
        0,
        new Uint8Array(),
        0,
        new Uint8Array(),
        224,
      ] as QueueList,
  );

  return {
    // Check if any task is solved and ready for writing.
    someHasFinished: () => queue.some((task) => task[2] === true),

    // Add a task to the queue.
    add: (element: PartialQueueList) => {
      const freeSlot = queue.findIndex((task) => !task[0]);
      if (freeSlot !== -1) {
        queue[freeSlot][0] = true;
        queue[freeSlot][3] = element[0];
        queue[freeSlot][4] = element[1];
        queue[freeSlot][5] = element[2];
        queue[freeSlot][7] = element[3];
      } else {
        queue.push([
          true,
          false,
          false,
          element[0],
          element[1],
          element[2],
          new Uint8Array(),
          element[3],
        ]);
      }

      status[0] = 127;
    },

    // Write completed tasks to the writer.
    write: () => {
      const finishedTaskIndex = queue.findIndex((task) => task[2]);
      if (finishedTaskIndex !== -1) {
        writer(queue[finishedTaskIndex]); // Writes on playload
        status[0] = 0; // The main can read it now;
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
        queue[taskIndex][1] = true; // Lock the task
        try {
          queue[taskIndex][6] = queue[taskIndex][7] === 224
            ? await jobs[queue[taskIndex][5]][0]()
            : await jobs[queue[taskIndex][5]][0](
              queue[taskIndex][4],
            );
          queue[taskIndex][2] = true; // Mark as solved
        } finally {
          queue[taskIndex][1] = false; // Unlock the task
        }
      }
    },
    allDone: () =>
      queue.every(
        (task) => task[0] === false && task[1] === false && task[2] === false,
      ),
  };
};
