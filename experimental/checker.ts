import type { MultiQueue } from "./mainQueue.ts";
import type { MainSignal } from "./signal.ts";

export const checker = ({
  signalBox,
  queue,
}: {
  queue: MultiQueue;
  signalBox: MainSignal;
}) => {
  const check = () => {
    // DEBUGGING STEPS
    // changeOfSignal(currentStatus);

    switch (signalBox.updateLastSignal()) {
      case 0: // If worker posted a "response" (status=0), solve it
        queue.solve();
        if (queue.canWrite()) {
          queue.sendNextToWorker();
        } else {
          signalBox.readyToRead();
        }
        queueMicrotask(check);
        return;

      case 1: // Ready to read
        signalBox.readyToRead();
        queueMicrotask(check);
        return;

      case 2: // Handle case 2
        if (queue.canWrite()) {
          queue.sendNextToWorker();
          queueMicrotask(check);
        } else {
          signalBox.hasNoMoreMessages();
          // DEBUGGING STEPS
          // console.log("Finish by 2");
        }
        return;

      case 255: // If worker is "done" or requests more (status=255)
        // maybe  isEverythingSolve
        if (queue.canWrite()) {
          queue.sendNextToWorker();
        } else {
          // DEBUGGING STEPS
          // console.log("Finish by 255");
          return;
        }
        queueMicrotask(check);
        return;

      // This case one
      case 254:
        queue.sendNextToWorker();
        queueMicrotask(check);
        return;

        // default: // Default behavior for unknown statuses
        //   // DEBUGGING STEPS
        //   // console.log(`Unhandled status: ${currentStatus}`);
        //   queueMicrotask(check);
        //   return;
    }

    queueMicrotask(check);
  };

  return check;
};
