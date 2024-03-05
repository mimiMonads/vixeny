import { FunRouterOptions } from "../../types.ts";
import {
  AnyMorphismMap,
  CryptoOptions,
  MorphismMap,
  MutableKey,
  ObjectaAndNullMorphism,
  ParamOptions,
  QueryOptions,
  RequestMorphism,
  BodyNull,
  ObjectaAnyMorphism
} from "../framework/optimizer/types.ts";

import response from "../framework/optimizer/response.ts";

export default <O extends FunRouterOptions>(o?: O) =>
<
  R extends MorphismMap,
  B extends AnyMorphismMap,
  Q extends QueryOptions,
  P extends ParamOptions,
  CR extends CryptoOptions,
  MU extends MutableKey,
  Return = any,
>(
  r: ObjectaAndNullMorphism<R, B, Q, P, O, CR, MU, Return>,
) => response(o)({...r, type: "object"} as unknown as RequestMorphism) as (r:Request) => Promise<BodyNull> | BodyNull; 


const a = <O extends FunRouterOptions>(o?: O) =>
<
  R extends MorphismMap,
  B extends AnyMorphismMap,
  Q extends QueryOptions,
  P extends ParamOptions,
  CR extends CryptoOptions,
  MU extends MutableKey,
>(
  r: ObjectaAnyMorphism<R, B, Q, P, O, CR, MU,O['retruns']>,
)  => r as unknown as (re: Request) =>  O['retruns']


