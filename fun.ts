/*
 * Antony @mimiMonads
 * 
 * Vixeny
 * 
 * 
 *  All programming paradigms have strengths and weaknesses and while this middleware is functional,
 *  it does not mean that it is better than other paradigms.
 *
 *  I highly recommend that you do not proceed unless you have a solid foundation in functional programming.
 * 
 * 
 *  Thanks and have fun ~
 */


import { funRouterOptions } from "./types.ts";
import { ObjectRawResponse } from "./optimizer/types.ts";
import optimizer from "./optimizer/optimize.ts";
import atlas from "./builder/atlas/main.ts";
import split from "./builder/atlas/split.ts";
import solver from "./builder/solver.ts";


export default (o?: funRouterOptions) =>
  (routes: ObjectRawResponse[]) =>
    ((re) =>
      ((s) => (r: Request) => re[3][s(r)](r))(
        solver(o)(re),
      ))(
        atlas(o)(
          split(o)(
            optimizer(o)(routes),
          ),
        ),
      );
