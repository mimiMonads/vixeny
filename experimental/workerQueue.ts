import type { PartialQueueList, QueueList } from "./mainQueue.ts";

type ArgumetnsForMulti = {
  jobs: Function[];
  max?: number;
  writer: (job: QueueList) => void;
  status: Uint8Array;
};
// Create and manage a working queue.
export const multi = ({ jobs, max, writer, status }: ArgumetnsForMulti) => {
  const queue = Array.from(
    { length: max ?? 10 },
    () => [false, false, false, 0, null, 0, new Uint8Array(), 224] as QueueList,
  );

  return {
    // Check if all tasks are in use.
    isBusy: () => queue.every((job) => job[0]),

    // Check if any task is solved and ready for writing.
    someHasFinished: () => queue.some((task) => task[2] === true),

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
          element[3], // SatusSignal
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
          element[3],
        ]);
      }

      status[0] = 1;
    },

    // Write completed tasks to the writer.
    write: () => {
      const finishedTaskIndex = queue.findIndex((task) => task[2]);
      if (finishedTaskIndex !== -1) {
        // console.log(" 4 .- worker sends :");
        // console.log(
        //   [
        //     queue[finishedTaskIndex][3],
        //     queue[finishedTaskIndex][4],
        //     queue[finishedTaskIndex][5],
        //     queue[finishedTaskIndex][7],
        //   ],
        // );
        writer(queue[finishedTaskIndex]); // Writes on playload
        status[0] = 0;
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
    allDone: () =>
      queue.every(
        (task) => task[0] === false && task[1] === false && task[2] === false,
      ),
  };
};
