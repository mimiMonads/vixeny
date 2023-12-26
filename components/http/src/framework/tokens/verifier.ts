import solver from "./src/solver.ts";
import validChar from "../../../../util/validChar.ts";
import { SignVerifyOptions } from "./types.ts";
import verifyWithSize from "./src/verifyWithSize.ts";

export default (seed: SignVerifyOptions) =>
  (
    (ar) =>
      (
        (p) =>
          typeof seed.size == "number"
            ? typeof seed.expires === "number"
              ? (
                (f) => (s: string) =>
                  Number(s.slice(0, 13)) > Date.now() && f(s)
              )(
                verifyWithSize(seed.size)(ar)(p),
              )
              : verifyWithSize(seed.size)(ar)(p)
            : (
              (f) =>
                typeof seed.expires === "number"
                  ? (s: string) => Number(s.slice(0, 13)) > Date.now() && f(s)
                  : f
            )(
              ((ar) => (p: string[]) => ((s: string) =>
                s.length >= 17
                  ? (
                    (m) =>
                      [...s
                        .slice(0, m - 1)]
                        .map((x) => x.charCodeAt(0))
                        .every((x, i, a) =>
                          i < 7
                            ? p[
                              ar[i % 8]([
                                a.at(i - 7) as number,
                                a.at(i - 6) as number,
                                a.at(i - 5) as number,
                                a.at(i - 4) as number,
                                a.at(i - 3) as number,
                                a.at(i - 2) as number,
                                a.at(i - 1) as number,
                                x,
                              ])
                            ] === s[m + i]
                            : p[
                              ar[i % 8]([
                                a[i - 7],
                                a[i - 6],
                                a[i - 5],
                                a[i - 4],
                                a[i - 3],
                                a[i - 2],
                                a[i - 1],
                                x,
                              ])
                            ] ===
                              s[m + i]
                        )
                  )(
                    (s.length / 2 >> 0) + 1,
                  )
                  : false))(ar)(p),
            )
      )(
        [...validChar],
      )
  )(
    solver(seed),
  );
