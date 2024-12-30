import type { PartialQueueList, QueueList } from "./mainQueue.ts";

// Create and manage a working queue.
export const multi =
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
    allDone: () =>
      queue.every(
        (task) => task[0] === false && task[1] === false && task[2] === false,
      ),
  });
