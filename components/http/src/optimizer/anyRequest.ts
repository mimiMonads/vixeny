import { FunRouterOptions } from "../../types.ts";
import response from "../framework/optimizer/response.ts";
import {
  AnyMorphismMap,
  CommonRequestMorphism,
  CryptoOptions,
  MorphismMap,
  MutableKey,
  ObjectaAnyMorphism,
  ParamOptions,
  QueryOptions,
} from "../framework/optimizer/types.ts";

export default <O extends FunRouterOptions>(o?: O) =>
<
  R extends MorphismMap,
  B extends AnyMorphismMap,
  Q extends QueryOptions,
  P extends ParamOptions,
  CR extends CryptoOptions,
  MU extends MutableKey,
  T = any,
>(
  r: ObjectaAnyMorphism<R, B, Q, P, O, CR, MU, T>,
) =>
  (response(o)(r as unknown as CommonRequestMorphism)) as unknown as (
    re: Request,
  ) => T;
