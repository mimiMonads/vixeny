import hash from "./hash.ts";
import { SignVerifyOptions } from "./types.ts";

export default (o: SignVerifyOptions) =>
  async (key: string) =>
    (
      (s) =>
        (
          (p) =>
            (
              (el) =>
                (
                  (fa) =>
                    "(((" + Array.from(
                      {
                        length: (typeof o.size === "number" ? o.size : 8) *
                          (typeof o.sequence === "number" ? o.sequence : 1),
                      },
                      (_, i) =>
                        `( ${p[i === 0 ? 0 : i * fa]} ^ a[ar[${
                          el[i === 0 ? 0 : i * fa]
                        }]]  ^  ${p[i === 0 ? 1 : i * fa + 1]} ^ a[ar[${
                          el[i === 0 ? 1 : i * fa + 1]
                        }]]  ^  ${p[i === 0 ? 2 : i * fa + 2]} ^ a[ar[${
                          el[i === 0 ? 2 : i * fa + 2]
                        }]]  ^  ${p[i === 0 ? 3 : i * fa + 3]} ^ a[ar[${
                          el[i === 0 ? 3 : i * fa + 3]
                        }]] )`,
                    ).join("+") + ") >>> 0) % 65)"
                )(
                  typeof o.size === "number" ? (o.size / (o.size / 4)) : 4,
                )
            )(
              Array.from(
                { length: typeof o.size === "number" ? o.size / 2 : 4 },
                () =>
                  Array.from(
                    { length: typeof o.size === "number" ? o.size : 8 },
                    (_, i) => "" + i,
                  ),
              ).flat(),
            )
        )(
          Array.from(
            { length: typeof o.size === "number" ? o.size * 8 : 32 },
            (_, i) => "0x" + s.slice(i === 0 ? 0 : i * 3, i * 3 + 8),
          ),
        )
    )(
      await (
        async (s1) =>
          (await Promise.all(Array.from(
            {
              length: (typeof o.size === "number" ? o.size / 2 : 4) *
                (typeof o.plotter === "undefined" || o.plotter === "SHA-1"
                  ? 2
                  : 1),
            },
            async (_, i) => await hash(o)(s1 + " " + i).then((x) => x),
          ))).join("")
      )(
        await hash(o)(key).then((x) => x),
      ),
    );
