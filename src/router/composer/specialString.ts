import { FunRouterOptions } from "../../../../types.ts";
import type { RouteTypes } from "../types.ts";

export default (o?: FunRouterOptions<any>) =>
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
          )(
            (ar: string[]) =>
              (new Function(`return s=>${
                ar.reduceRight(
                  (acc, v, i) => `s.startsWith("${v}") ?${i + max - 2}:` + acc,
                  "-1",
                )
              }`))() as (s: string) => number,
          )
      )(
        o?.indexBase?.bind ?? false
          ? (s: string) => s.slice(o.indexBase.bind.length - 1)
          : (s: string) => s.slice(s.indexOf("/", s.indexOf("."))),
      )
  )(
    ar.map(([_, a]) => a)
      .sort((a, b) => b.length - a.length),
  );
