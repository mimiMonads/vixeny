import solver from "./solver.ts";
import validChar from "../util/validChar.ts";
import { SignVerifyOptions } from "./types.ts";

export default async (seed: SignVerifyOptions) => (
  ar => (
    p => (
      f =>
        seed.expires === true
          ? (s: string) =>
            Number(s.slice(0, 13)) > Date.now() && f(s)
          : f
    )(
      (ar => (p: string[]) => ((s: string) =>
        s.length >= 17
          ? (
            m =>
              s
                .slice(0, m - 1)
                .split("")
                .map(x => x.charCodeAt(0))
                .every((x, i, a) =>
                  i < 7
                    ? p[ar[i % 8]([a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7]])] === s[m + i]
                    : p[ar[i % 8]([a[0], a[1], a[2], a[3], a[4], a[5], a[i - 1], x])] === s[m + i]
                )
          )(
            (s.length / 2 >> 0) + 1
          )

          : false))(ar)(p)
    )
  )(
    [...validChar]
  )
)(
  await solver(seed)
)
