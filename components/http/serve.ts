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
import { Petition } from "./src/optimizer/types.ts";
import optimizer from "./src/optimizer/optimize.ts";
import atlas from "./src/builder/atlas/main1.ts";
import split from "./src/builder/atlas/splitter.ts";
import solver from "./src/builder/solver1.ts";

export default ((o?: FunRouterOptions) => (routes: Petition[]) =>
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


