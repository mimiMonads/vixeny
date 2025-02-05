import type { MultiQueue } from "./mainQueue.ts";
import type { MainSignal } from "./signal.ts";

export const checker = ({
  signalBox,
  queue,
}: {
  queue: MultiQueue;
  signalBox: MainSignal;
}) => {
  function check() {
    switch (signalBox.updateLastSignal()) {
      case 0:
        queue.solve();
        if (queue.canWrite()) {
          queue.sendNextToWorker();
        } else {
          signalBox.readyToRead();
        }
        queueMicrotask(boundCheck);
        return;

      case 1:
        signalBox.readyToRead();
        queueMicrotask(boundCheck);
        return;

      case 2:
        if (queue.canWrite()) {
          queue.sendNextToWorker();
          queueMicrotask(boundCheck);
        } else {
          signalBox.hasNoMoreMessages();
          //@ts-ignore
          this.channelHandler.close();
        }
        return;

      case 127: {
        //@ts-ignore
        this.channelHandler.open(boundCheck);
        //@ts-ignore
        this.channelHandler.channel.port2.postMessage(null);
        return;
      }
      case 192:
      case 224:
        queueMicrotask(boundCheck);
        return;

      case 254:
        queue.sendNextToWorker();
        queueMicrotask(boundCheck);
        return;

      case 255:
        if (queue.canWrite()) {
          queue.sendNextToWorker();
          queueMicrotask(boundCheck);
        } else {
          console.log("Finish by 255");
        }
        return;
    }

    console.log(signalBox.updateLastSignal());
    throw new Error("unreachable");
  }

  const boundCheck = check.bind({
    channelHandler: new ChannelHandler(),
  });

  return boundCheck;
};

class ChannelHandler {
  channel: MessageChannel;
  isOpen: boolean;

  constructor() {
    this.channel = new MessageChannel();

    this.isOpen = false;
  }

  scheduleCheck(f: Function) {
    f();
  }

  open(f: Function) {
    if (this.isOpen) {
      return;
    }

    //@ts-ignore
    this.channel.port1.onmessage = f;
    this.channel.port2.start();
    this.channel.port1.start();
    this.isOpen = true;
  }

  close() {
    if (!this.isOpen) {
      return;
    }

    this.channel.port1.close();
    this.channel.port1.onmessage = null;
    this.channel.port2.close();
    this.isOpen = false;
  }
}
