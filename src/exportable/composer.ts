import compose from "../composer/compose.ts";
import type {
  BranchMap,
  CryptoOptions,
  Morphism,
  ParamOptions,
  Petition,
  QueryOptions,
  ResolveMap,
} from "../morphism.ts";
import type { CyclePluginMap, FunRouterOptions } from "../options.ts";

type BodyNull = {
  [propName: string]: any;
} | null;

export default {
  anyRequest: <
    FC extends CyclePluginMap,
    O extends FunRouterOptions<FC>,
  >(o?: O) =>
  <
    RM extends ResolveMap<any>,
    BM extends BranchMap<any>,
    QO extends QueryOptions,
    PO extends ParamOptions,
    CO extends CryptoOptions,
    AR = any,
    R = any,
  >(
    r: Morphism<
      {
        type: "morphism";
        typeNotNeeded: true;
      },
      RM,
      BM,
      QO,
      PO,
      O,
      CO,
      AR,
      R
    >,
  ) =>
    (compose(o)(
      { ...r, type: "request" } as unknown as Petition,
    )) as unknown as (
      re: Request,
    ) => R,
  objectNullRequest: <
    FC extends CyclePluginMap,
    O extends FunRouterOptions<FC>,
  >(o?: O) =>
  <
    RM extends ResolveMap<any>,
    BM extends BranchMap<any>,
    QO extends QueryOptions,
    PO extends ParamOptions,
    CO extends CryptoOptions,
    AR = any,
    R = any,
  >(
    r: Morphism<
      {
        type: "base";
        typeNotNeeded: true;
      },
      RM,
      BM,
      QO,
      PO,
      O,
      CO,
      AR,
      R
    >,
  ) =>
    (compose(o)(
      { ...r, type: "request" } as unknown as Petition,
    )) as unknown as (
      re: Request,
    ) => Promise<BodyNull> | BodyNull,
  petition: <
    FC extends CyclePluginMap,
    O extends FunRouterOptions<FC>,
  >(o?: O) =>
  (
    r: Petition,
  ) =>
    (compose(o)(
      { ...r, type: "request" } as unknown as Petition,
    )) as unknown as (
      re: Request,
    ) => Promise<Request> | Request,
};
