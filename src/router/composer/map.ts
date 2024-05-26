import type { FunRouterOptions } from "../../options.ts";

import type { info } from "./types.ts";
export default (options?: FunRouterOptions<any>) => (s: string): info =>
  (
    (list) => (
      ((startsWith) =>
        (
          (endsInSlash) =>
            (
              (point) => ({
                list: list,
                map: list.map((x) => x[0] === startsWith),
                startsWith: startsWith,
                elements: point.tail === point.head
                  ? [list[point.head]]
                  : list.slice(point.tail, point.head + 1),
                firstParam: s.indexOf("/" + startsWith),
                lastParam: list.slice(point.head + 1, list.length).reduce(
                  (acc, x) => x.length + 1 + acc,
                  0,
                ),
                path: s,
                endsInSlash: endsInSlash,
                hasName: options?.hasName,
              })
            )({
              tail: list.reduce(
                (acc, x, i) => (x[0] === startsWith && acc === -1) ? i : acc,
                -1,
              ),
              head: list.reduceRight(
                (acc, x, i) => (x[0] === startsWith && acc === 0) ? i : acc,
                0,
              ),
            })
        )(
          s.at(-1) === "/",
        ))(
          options && "paramsStartsWith" in options
            ? options.paramsStartsWith?.at(1)
            : ":",
        )
    )
  )(
    s.split("/").filter((x) => x !== ""),
  );
