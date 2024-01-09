import { FunRouterOptions } from "../../types.ts";
import branch from "../../optimizer/branch/main.ts";
import { AnyMorphism } from "../framework/optimizer/types.js";

type BranchOptions = ({
  path: string;
} & AnyMorphism)[];

type BranchSetter = {
  mutable?: Record<string, unknown>;
} & FunRouterOptions;

export default (o?: BranchSetter) => (f: AnyMorphism) =>
  o && "mutable" in o
    ? (
      (obj) =>
        ((f) => (r: Request) => async (arg: any) =>
          await (f(r) as unknown as (f: unknown) => unknown)(arg))(
            branch(o ? { ...o, mutable: true } : undefined)("/")(f),
          )
    )({ ...o.mutable })
    : branch(o ? { ...o, mutable: undefined } : undefined)("/")(f);
