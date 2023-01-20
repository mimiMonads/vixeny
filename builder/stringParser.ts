import { funRouterOptions } from "../types.ts";
import sComposer from "./sComposer.ts";

export default (o?: funRouterOptions) => (an: number[][]) =>
  ((re) =>
    typeof o?.hasName === "string"
      ? o?.globalNotFound === true
        ? ((n: number) => (s: string): [number, string] =>
          ((ar) => ar === "" ? [0, ""] : [re(ar), ar])(
            s.slice(n),
          ))(o.hasName.length)
        : ((b) => (n: number) => (s: string): [number, string] =>
          ((ar) => ar === "" ? b : [re(ar), ar])(s.slice(n)))(
            [1, ""] as [number, string],
          )(
            o.hasName.length,
          )
      : o?.globalNotFound === true
      ? ((n: number) => (s: string): [number, string] =>
        ((ar) => ar !== "" ? [re(ar), ar] : [0, ""])(
          n !== -1 ? s.slice(n) : s.slice(
            n = s
              .split("/")
              .filter((x) => x !== "")
              .reduce((acc, x, u) => u <= 1 ? acc + x.length : acc, 3),
          ),
        ))(-1)
      : ((n: number) => (s: string): [number, string] =>
        ((ar) => [re(ar) + 1, ar])(
          n !== -1 ? s.slice(n) : s.slice(
            n = s
              .split("/")
              .filter((x) => x !== "")
              .reduce((acc, x, u) => u <= 1 ? acc + x.length : acc, 3),
          ),
        ))(-1))(
      sComposer(o)(an) as (s: string) => number,
    );
