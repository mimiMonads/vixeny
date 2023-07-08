
import hash from "./hash.ts";


export default async (seed: string) =>

  await (
    async (s1) =>
      new Int32Array((await Promise.all(Array.from(
        {
          length: 32,
        },
        async (_, i) => await hash()(s1 + "table" + i).then((x) => x),
      ))).map(
        x => [x.slice(0, 7), x.slice(8, 15), x.slice(16, 23), x.slice(24, 31), x.slice(32, 39), x.slice(40, 47), x.slice(48, 55), x.slice(56, 63)].map(x => Number("0x" + x))
      ).flatMap(x => x))
  )(
    await hash()(seed).then((x) => x),
  )
