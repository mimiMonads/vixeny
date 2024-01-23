import {
  AnyMorphism,
  AnyMorphismMap,
  Morphism,
  MorphismMap,
} from "../framework/optimizer/types";

export default <
  T extends MorphismMap,
  B extends AnyMorphismMap,
  A = any,
  R = any,
>(I: Morphism<T, B, A, R> | AnyMorphism<T, B, A, R>) => I;
