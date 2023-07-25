
import hash from "./hash.ts";


export default (seed: string) =>
  (
    (s1) =>
      new Int32Array((Array.from(
        {
          length: 32,
        },
        (_, i) => hash()(s1 + "table" + i),
      )).map(
        x => [x.slice(0, 7), x.slice(8, 15), x.slice(16, 23), x.slice(24, 31), x.slice(32, 39), x.slice(40, 47), x.slice(48, 55), x.slice(56, 63)].map(x => Number("0x" + x))
      ).flatMap(x => x))
  )(
    hash()(seed),
  )
