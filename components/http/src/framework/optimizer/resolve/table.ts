import elements from "../../../util/elements.ts";
import { FunRouterOptions } from "../../../../types.ts";
import aComposer from "../aComposer.ts";
import checker from "../checker.ts";
import { CommonRequestMorphism } from "../types.ts";
import { ResolveOptions } from "./types.ts";
import isUsing from "../tools/isUsing.ts";

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
      )(aComposer(o)(x as CommonRequestMorphism)(isUsing(o)(x))),
    }));
