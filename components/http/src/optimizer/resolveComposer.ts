import resolver from "../../src/framework/optimizer/resolve/main.ts";

import { FunRouterOptions } from "../../types.ts";

import { Morphism } from "../framework/optimizer/types.ts";

type ResolveOptions = { [key: string]: {} & Morphism };

type ResolveSetter = {
  mutable?: Record<string, unknown>;
} & FunRouterOptions;

export default (o?: ResolveSetter) => (f: ResolveOptions) =>
  o && "mutable" in o
    ? (
      (m) =>
        ((f) => async (r: Request) =>
          await f({ r: r, m: m } as unknown as Request))(resolver(o)("/")(f))
    )({ ...o.mutable })
    : resolver(o)("/")(f);
