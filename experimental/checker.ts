import type { MultiQueue } from "./mainQueue.ts";
import type { MainSignal } from "./signal.ts";

export const checker = ({
  signalBox,
  queue,
}: {
  queue: MultiQueue;
  signalBox: MainSignal;
}) => {
  return function check() {
    const currentStatus = signalBox.updateLastSignal();

    // DEBBUGING STEPS
    //changeOfSignal(currentStatus);

    // If has posted something
    if (currentStatus < 126) {
      // If worker posted a "response" (status=0), solve it
      if (currentStatus === 0) {
        queue.solve();

        if (queue.canWrite()) {
          queue.sendNextToWorker();
        } else {
          signalBox.readyToRead();
        }

        queueMicrotask(check);
        return;
      }

      if (currentStatus === 2) {
        if (queue.canWrite()) {
          queue.sendNextToWorker();
          queueMicrotask(check);
          return;
        }

        signalBox.hasNoMoreMessages();

        // DEBBUGING STEPS
        // console.log("Finish by 2");
        return;
      }

      signalBox.readyToRead();
      queueMicrotask(check);
      return;
    }

    // If worker is "done" or requests more (status=255)
    if (currentStatus === 255) {
      if (queue.canWrite()) {
        queue.sendNextToWorker();
      } else {
        // DEBBUGING STEPS
        // console.log("Finish by 255");
        return;
      }
    }

    queueMicrotask(check);
  };
};
