import elements from "../../../util/elements.ts";

import aComposer, { specialOptions } from "../aComposer.ts";
import checker from "../checker.ts";
import { ObjectRawResponseCommon } from "../types.ts";
import { BranchOptions } from "./types.ts";

export default (debug: boolean) =>
(o?: specialOptions) =>
(path: string) =>
(table: BranchOptions[]) =>
  debug === true
    ? table
      .map((x) => ({ ...x, path: path }))
      .map((x) => ({
        name: x.name,
        f: (
          (composed) =>
            x.f.constructor.name === "AsyncFunction" ||
              composed.constructor.name === "AsyncFunction"
              ? `((a=>k=>async r=>await k(await a(r)))(${composed.toString()})(${x.f.toString()}))`
              : `((a=>k=>r=>k(a(r)))(${composed.toString()})(${x.f.toString()}))`
        )(
          aComposer(o)(x as ObjectRawResponseCommon)(
            checker(x.options?.remove ?? [])(elements)(x.options?.add ?? [])(
              x.f.toString(),
            ),
          ) as (r: Request) => any | Promise<any>,
        ),
      }))
    : table
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
            )(x as ObjectRawResponseCommon)(x.options.only)
            : aComposer(
              o ? { ...aComposer, branch: false } : { branch: false },
            )(x as ObjectRawResponseCommon)(
              checker(x.options?.remove ?? [])(elements)(x.options?.add ?? [])(
                x.f.toString(),
              ),
            ) as (r: Request) => any | Promise<any>,
        ),
      }));
