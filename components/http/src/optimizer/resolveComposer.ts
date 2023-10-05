import resolver from "../../optimizer/resolve/main.ts";

import { FunRouterOptions } from "../../types.ts";

import { ResolveOptions as ResolveIncomplete } from "../../types.ts";

type ResolveOptions = {
  path: string;
} & ResolveIncomplete;

type ResolveSetter = {
  mutable?: Record<string, unknown>;
} & FunRouterOptions;

export default (o?: ResolveSetter) => (f: ResolveOptions) =>
  o && "mutable" in o
    ? (
      (m) =>
        ((f) => async (r: Request) =>
          await f({ r: r, m: m } as unknown as Request))(resolver(o)(f.path)(f))
    )({ ...o.mutable })
    : resolver(o)(f.path)(f);
