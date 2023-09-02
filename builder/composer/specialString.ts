import { FunRouterOptions } from "../../types.ts";
import { RouteTypes } from "../types.ts"

export default (o?: FunRouterOptions) =>
  (max: number) =>
    (ar: RouteTypes[]) =>
      (
        (nar) =>
          (
            (p) =>
              (
                (f) =>
                  (
                    (fa) => (s: string) => fa(p(s))
                  )(
                    f(nar),
                  )
              )
                (
                  (ar: string[]) =>
                    (new Function(`return s=>${ar.reduceRight(
                      (acc, v, i) =>
                        `s.indexOf("${v}")===0?${i + max - 2}:` + acc,
                      "-1",
                    )
                      }`))() as (s: string) => number,
                )
          )(
            o && "hasName" in o && typeof o.hasName === "string"
              ? (s: string) => s.slice(o!.hasName!.length - 1)
              : (
                (n) =>
                  (s: string) =>
                    n !== -1 ? s.slice(n) : s.slice(
                      n = s
                        .split("/")
                        .filter((x) => x !== "")
                        .reduce(
                          (acc, x, u) => u <= 1 ? acc + x.length : acc,
                          3,
                        ) - 1,
                    )
              )(
                -1,
              ),
          )
      )(
        ar.map(([_, a]) => a)
          .sort((a, b) => b.length - a.length),
      );
