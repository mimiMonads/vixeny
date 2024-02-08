import { FunRouterOptions } from "../../types.ts";
import {
  AnyMorphism,
  AnyMorphismMap,
  CryptoOptions,
  Morphism,
  MorphismMap,
  MutableKey,
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
  Return = any,
>(
  I:
    | Morphism<R, B, Q, P, O, CR, MU, Return>
    | AnyMorphism<R, B, Q, P, O, CR, MU, Return>,
) => ({ ...I })
