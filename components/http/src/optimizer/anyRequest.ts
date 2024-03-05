import { FunRouterOptions } from "../../types.ts";
import {
  AnyMorphismMap,
  CryptoOptions,
  MorphismMap,
  MutableKey,
  ParamOptions,
  QueryOptions,
  ObjectaAnyMorphism
} from "../framework/optimizer/types.ts";

const a = <O extends FunRouterOptions>(o?: O) =>
<
  R extends MorphismMap,
  B extends AnyMorphismMap,
  Q extends QueryOptions,
  P extends ParamOptions,
  CR extends CryptoOptions,
  MU extends MutableKey,
  T = any
>(
  r: ObjectaAnyMorphism<R, B, Q, P, O, CR, MU,T>,
)  => r as unknown as (re: Request) =>  T


