import { fixedPoint } from "./fixpoint.ts";

export const aaa = fixedPoint({
  args: "uint8",
  f: async (arr: Uint8Array) => {
    // Simulate an expensive operation

    let time = 100;

    while (time !== 0) {
      performance.now();
      time--;
    }

    return Uint8Array.from(
      Array.from(arr).map((num) => num * 2),
    );
  },
});

export const bbb = fixedPoint({
  args: "uint8",
  f: async (arr) => new Uint8Array([2]),
});

export const ccc = fixedPoint({
  args: "uint8",
  f: async (arr) => new Uint8Array([3]),
});
