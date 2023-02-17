import hash from "./hash.ts";
import { SignVerifyOptions } from "./types.ts"

export default (o:SignVerifyOptions) => async (key: string) =>
  (
    (s) =>
      (
        (p) =>
          (
            (el) =>
              "(((" + Array.from(
                { length: 8 },
                (_, i) =>
                  `( ${p[i === 0 ? 0 : i * 3]} ^ a[ar[${
                    el[i === 0 ? 0 : i * 4]
                  }]]  ^  ${p[i === 0 ? 1 : i * 3 + 1]} ^ a[ar[${
                    el[i === 0 ? 1 : 4 * 3 + 1]
                  }]]  ^  ${p[i === 0 ? 2 : i * 3 + 2]} ^ a[ar[${
                    el[i === 0 ? 2 : 4 * 3 + 2]
                  }]]  ^  ${p[i === 0 ? 3 : i * 3 + 3]} ^ a[ar[${
                    el[i === 0 ? 3 : 4 * 3 + 3]
                  }]] )`,
              ).join("+") + ") >>> 0) % 65)"
          )(
           (typeof o.size === "number" ? Array.from({length:o.size}, (_,i) => i).join("") : "01234567").repeat(4).split(""),
          )
      )(
        Array.from(
          { length: typeof o.size === "number" ? o.size  * 8 : 32 },
          (_, i) => "0x" + s.slice(i === 0 ? 0 : i * 3, i * 3 + 8),
        ),
      )
  )(
await (
        async (s1) =>
        (await Promise.all(  Array.from(
          {length: typeof o.size === "number" ? o.size  / 2 : 4},
          async (_,i) => await hash(s1 + i).then( x => x)
          ))).join("")
      )(
        await hash(key).then((x) => x),
      )

  );


