import { funRouterOptions } from "../types.ts";
import sComposer from "./sComposer.ts";

export default (o?: funRouterOptions) => (an: number[][]) =>
  ((re) =>
    typeof o?.hasName === "string"
      ?  (
        new Function(
          `return  s => s.length === ${o.hasName.length} ? [1, "/"] : [(${re.toString()})(s.slice(${o.hasName.length})), s.slice(${o.hasName.length})] `
        )
      )(

      )
      : ((n: number) => (s: string): [number, string] =>
        ((ar) => [re(ar) + 1, ar])(
          n !== -1 ? s.slice(n) : s.slice(
            n = s
              .split("/")
              .filter((x) => x !== "")
              .reduce((acc, x, u) => u <= 1 ? acc + x.length : acc, 3),
          ),
        ))(-1))
        (
      sComposer(o)(an) as (s: string) => number,
    );

