export default (start = 0xEDB88320) =>
  new Int32Array(
    (() =>
      Array.from(
        { length: 256 },
        (_, i) =>
          Array.from(
            { length: 8 },
          ).reduce(
            (acc: number) => ((acc & 1)
              ? (start ^ (acc >>> 1))
              : (acc >>> 1) === 0
                ? 0xFFFFFFF
                : (acc >>> 1)),
            i,
          ),
      ))() as number[],
  );
