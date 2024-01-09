/*
 * @mimiMonads
 *
 * Vixeny
 *
 *  All programming paradigms have strengths and weaknesses and while this middleware is functional,
 *  it does not mean that it is better than other paradigms.
 *
 *  I highly recommend that you do not proceed unless you have a solid foundation in functional programming.
 *
 *  Thanks and have fun and remember that we are in alhpa
 */

import { FunRouterOptions, Vixeny } from "./types.ts";
import { AnyMorphismMap, CommonRequestMorphism, MorphismMap, ObjectRawResponseReturn, ObjectRawResponseStatic, RequestMorphism } from "./src/framework/optimizer/types.ts";

import optimizer from "./src/framework/optimizer/optimize.ts";
import atlas from "./src/framework/builder/atlas/main1.ts";
import split from "./src/framework/builder/atlas/splitter.ts";
import solver from "./src/framework/builder/solver1.ts";


export default ((o?: FunRouterOptions) => <
T extends MorphismMap,
B extends AnyMorphismMap,
A = any,
R = any,
> (routes: ( RequestMorphism<T, B, A, R>
  | CommonRequestMorphism<T, B, A, R>
  | ObjectRawResponseReturn
  | ObjectRawResponseStatic)[]
) =>
  ((re) =>
    ((map) =>
      ((s) => (r: Request) => map[s(r)](r))(
        solver(o)(re),
      ))([...re[3]]))(
      atlas(o)(
        split(o)(
          optimizer(o)(routes),
        ),
      ),
    )) as Vixeny;
