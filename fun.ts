/*
 * Antony @mimiMonads
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

import type { CyclePluginMap, FunRouterOptions } from "./src/options.ts";

import optimizer from "./src/composer/mainComposer.ts";
import atlas from "./src/router/atlas/main1.ts";
import split from "./src/router/atlas/splitter.ts";
import solver from "./src/router/solver1.ts";
import type { BranchMap, CryptoOptions, Morphism, ParamOptions, Petition, QueryOptions, ResolveMap, fileServerPetition } from "./src/morphism.ts";

export default (<
  FC extends CyclePluginMap,
  O extends FunRouterOptions<FC>,
>(o?: O) =>   <
RM extends ResolveMap<any>,
BM extends BranchMap<any>,
QO extends QueryOptions,
PO extends ParamOptions,
RO extends O,
CO extends CryptoOptions,
AR = any,
R = any,
>(routes: ( Morphism<
  {
    type: "request" | "request" | "base";
    hasPath: true;
    isAPetition: true;
    typeNotNeeded: true;
  },
  RM,
  BM,
  QO,
  PO,
  RO,
  CO,
  AR,
  R
> | fileServerPetition)[]) =>
  ((re) =>
    ((map) =>
      ((s) => (r: Request) => map[s(r)](r))(
        solver(o)(re),
      ))([...re[3]]))(
      atlas(o)(
        split(o)(
          optimizer(o)(routes as Petition[]),
        ),
      ),
    ));
