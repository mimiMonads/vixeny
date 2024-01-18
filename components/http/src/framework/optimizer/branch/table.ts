import elements from "../../../util/elements.ts";

import aComposer, { specialOptions } from "../aComposer.ts";
import checker from "../checker.ts";
import { BranchOptions } from "./types.ts";

export default 
(o?: specialOptions) =>
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
              : ((a) =>
              (k: (arg0: any) => any) =>
              (r: Request) =>
              (b: unknown) => k(a(r)(b)))(composed)(x.f)
        )(
          (typeof x.options?.only !== "undefined" && x.options.only.length > 0)
            ? aComposer(
              o ? { ...aComposer, branch: false } : { branch: false },
            )(x )(x.options.only)
            : aComposer(
              o ? { ...aComposer, branch: false } : { branch: false },
            )(x)(
              checker(x.options?.remove ?? [])(elements)(
                [...(x.options?.add || []), ...( Object.keys(o?.cyclePlugin || {}) || [])]
              )(
                x.f.toString(),
              ),
            ) as (r: Request) => any | Promise<any>,
        ),
      }));
