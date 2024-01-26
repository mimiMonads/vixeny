import aComposer, { specialOptions } from "../aComposer.ts";
import isUsing from "../tools/isUsing.ts";
import { BranchOptions } from "./types.ts";

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
          isUsing(o)(x),
        ),
      ),
    }));
