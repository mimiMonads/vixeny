
import aComposer from "../linker.ts";
import tools from "../composerTools.ts";
import type { ResolveOptions } from "./types.ts";
import type  { FunRouterOptions } from "../../options.ts";
import type { Petition } from "../../morphism.ts";


export default (o?: FunRouterOptions) =>
(path: string) =>
(table: ResolveOptions) =>
  table
    .map((x) => ({ ...x, path: path }))
    .map((x) => ({
      name: x.name,
      f: (
        (composed: Petition['f']) =>
          x.f.constructor.name === "AsyncFunction" ||
            composed.constructor.name === "AsyncFunction"
            ? ((a) => (k: (arg0: any) => any) => async (r:any) =>
              await k(await a(r)))(composed)(x.f)
            : ((a) => (k: (arg0: any) => any) => (r:any) => k(a(r)))(
              composed,
            )(x.f)
      )(aComposer(o)(x)(tools.isUsing(o)(x)(tools.elements))),
    }));
