import elements from "../../../util/elements.ts";
import { FunRouterOptions } from "../../../../types.ts";
import aComposer from "../aComposer.ts";
import checker from "../checker.ts";
import { CommonRequestMorphism } from "../types.ts";
import { ResolveOptions } from "./types.ts";

export default (o?: FunRouterOptions) =>
(path: string) =>
(table: ResolveOptions) =>
  table
    .map((x) => ({ ...x, path: path }))
    .map((x) => ({
      name: x.name,
      f: (
        (composed) =>
          x.f.constructor.name === "AsyncFunction" ||
            composed.constructor.name === "AsyncFunction"
            ? ((a) => (k: (arg0: any) => any) => async (r: Request) =>
              await k(await a(r)))(composed)(x.f)
            : ((a) => (k: (arg0: any) => any) => (r: Request) => k(a(r)))(
              composed,
            )(x.f)
      )(
        (typeof x.options?.only !== "undefined" && x.options.only.length > 0)
          ? aComposer(o)(x as CommonRequestMorphism)(x.options.only)
          : aComposer(o)(x as CommonRequestMorphism)(
            checker(x.options?.remove ?? [])(
              elements(x),
            )(
              [
                ...(x.options?.add || []),
                ...(Object.keys(o?.cyclePlugin || {}) || []),
              ],
            )(
              x.f.toString(),
            ),
          ) as (r: Request) => any | Promise<any>,
      ),
    }));
