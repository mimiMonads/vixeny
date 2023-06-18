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


type Vixeny = (o?: funRouterOptions) => (routes: ObjectRawResponse[]) => (r: Request) => Promise<Response> | Response

export default ((o?: funRouterOptions) =>
  (routes: ObjectRawResponse[]) =>
    ((re) =>
      (map =>
      	 ((s) => (r: Request) => map[s(r)](r))(
            solver(o)(re),
          )
      )([...re[3]])
      )(
        atlas(o)(
          split(o)(
            optimizer(o)(routes),
          ),
        ),
      )) as unknown as Vixeny;