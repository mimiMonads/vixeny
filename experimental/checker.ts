import type { MultiQueue } from "./mainQueue.ts";
import type { MainSignal } from "./signal.ts";

export const checker = ({
  signalBox,
  queue,
}: {
  queue: MultiQueue;
  signalBox: MainSignal;
}) => {
  // Create a single MessageChannel for scheduling. We’ll use it repeatedly.
  const channel = new MessageChannel();

  const scheduleCheck = () => {
    check();
  };

  const openChannels = () => {
    channel.port1.onmessage = scheduleCheck;
    channel.port2.start();
    channel.port1.start();
  };

  const closeChannels = () => {
    channel.port1.close();
    channel.port1.onmessage = null;
    channel.port2.close();
  };

  // Helper to schedule the next iteration on the macrotask queue
  const scheduleNext = channel.port2;

  const check = () => {
    switch (signalBox.updateLastSignal()) {
      case 0:
        queue.solve();
        if (queue.canWrite()) {
          queue.sendNextToWorker();
        } else {
          signalBox.readyToRead();
        }
        queueMicrotask(check);
        return;

      case 1:
        signalBox.readyToRead();
        queueMicrotask(check);
        return;

      case 2:
        if (queue.canWrite()) {
          queue.sendNextToWorker();
          queueMicrotask(check);
        } else {
          signalBox.hasNoMoreMessages();
          closeChannels();
        }
        return;

      case 127: {
        openChannels();
        scheduleNext.postMessage(null);
        return;
      }
      case 192:
      case 224:
        queueMicrotask(check);
        return;

      case 254:
        queue.sendNextToWorker();
        queueMicrotask(check);
        return;

      case 255:
        if (queue.canWrite()) {
          queue.sendNextToWorker();
          queueMicrotask(check);
        } else {
          console.log("Finish by 255");
        }

        return;
    }

    console.log(signalBox.updateLastSignal());
    throw new Error("unrechable");
  };

  return check;
};
