import aComposer, { type specialOptions } from "../linker.ts";
import tools from "../composerTools.ts";
import type { BranchOptions } from "./types.ts";

export default (o?: specialOptions) =>
(path: string) =>
(table: BranchOptions) =>
  table
    .map((p) => ({ ...p, path: path }))
    .map((p) => ({
      name: p.name,
      f: (
        (composed) =>
          p.f.constructor.name === "AsyncFunction" ||
            composed.constructor.name === "AsyncFunction"
            ? ((a) =>
            (k: (arg0: any) => any) =>
            (r: Request) =>
            async (b: unknown) => k(await a(r)(b)))(composed)(p.f)
            : ((a) => (k: (arg0: any) => any) => (r: Request) => (b: unknown) =>
              k(a(r)(b)))(composed)(p.f)
      )(
        aComposer(o ? { ...o, branch: false } : { branch: false })(p)(
          tools.isUsing(o)(p),
        ),
      ),
    }));
