import type { FunRouterOptions } from "../../options.ts";
import type { Petition } from "../../morphism.ts";
import type { info } from "./types.ts";

export default (options?: FunRouterOptions<any>) => (f: Petition): info =>
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
                firstParam: f.path.indexOf("/" + startsWith),
                lastParam: list.slice(point.head + 1, list.length).reduce(
                  (acc, x) => x.length + 1 + acc,
                  0,
                ) + (endsInSlash ? 1 : 0),
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
          f.path.at(-1) === "/",
        ))(
          options && "paramsStartsWith" in options
            ? options.paramsStartsWith?.at(1)
            : ":",
        )
    )
  )(
    f.path.split("/").filter((x) => x !== ""),
  );
