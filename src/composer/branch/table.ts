import aComposer, { type specialOptions } from "../linker.ts";
import tools from "../composerTools.ts";
import type { BranchOptions } from "./types.ts";

export default (o?: specialOptions) =>
(path: string) =>
(table: BranchOptions) =>
  table
    .map((x) => ({ ...x, path: path }))
    .map((x) => ({
      name: x.name,
      f: (
        (composed) =>
          x.f.constructor.name === "AsyncFunction" ||
            composed.constructor.name === "AsyncFunction"
            ? ((a) =>
            (k: (arg0: any) => any) =>
            (r: Request) =>
            async (b: unknown) => await k(a(r)(b)))(composed)(x.f)
            : ((a) => (k: (arg0: any) => any) => (r: Request) => (b: unknown) =>
              k(a(r)(b)))(composed)(x.f)
      )(
        aComposer(o ? { ...aComposer, branch: false } : { branch: false })(x)(
          tools.isUsing(o)(x)(tools.elements),
        ),
      ),
    }));
