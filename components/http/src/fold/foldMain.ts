import { FunRouterOptions } from "../../types.ts";
import response from "../framework/optimizer/response.ts";
import isUsing from "../framework/optimizer/tools/isUsing.ts";
import vixeny from "../../serve.ts";
import {
  AnyMorphismMap,
  CommonRequestMorphism,
  CryptoOptions,
  MorphismMap,
  MutableKey,
  ParamOptions,
  QueryOptions,
  RequestMorphism,
} from "../framework/optimizer/types.ts";

type WrapOptions = FunRouterOptions & {
  startWith?: string;
};

export const wrap = <O extends WrapOptions>(o?: O) =>
<
  R extends MorphismMap,
  B extends AnyMorphismMap,
  Q extends QueryOptions,
  P extends ParamOptions,
  CR extends CryptoOptions,
  MU extends MutableKey,
  RE = any,
>(a = [] as (
  | RequestMorphism<any, any, any, any, O, {}, {}, any>
  | CommonRequestMorphism<any, any, any, any, O, {}, {}, any>
)[]) => ({
  stdPetition: <
    RA extends MorphismMap,
    B extends AnyMorphismMap,
    Q extends QueryOptions,
    P extends ParamOptions,
    CR extends CryptoOptions,
    MU extends undefined,
    RE = any,
  >(
    ob: Omit<
      CommonRequestMorphism<RA, B, Q, P, O, CR, { mutable: { is: false } }, RE>,
      "mutable"
    >,
  ) =>
    wrap(o)(a.concat(
      //@ts-ignore
      { ...ob } as unknown as CommonRequestMorphism,
    )),
  customPetition: <
    TR extends MorphismMap,
    B extends AnyMorphismMap,
    Q extends QueryOptions,
    P extends ParamOptions,
    CR extends CryptoOptions,
    MU extends undefined,
    RE = any,
  >(
    ob: Omit<
      Omit<RequestMorphism<TR, B, Q, P, O, CR, {}, RE>, "type">,
      "mutable"
    >,
  ) =>
    wrap(o)(a.concat(
      //@ts-ignore
      { ...ob, type: "request" } as unknown as RequestMorphism,
    )),
  mutStdPetition: <
    RA extends MorphismMap,
    B extends AnyMorphismMap,
    Q extends QueryOptions,
    P extends ParamOptions,
    CR extends CryptoOptions,
    MU extends undefined,
    RE = any,
  >(
    ob: Omit<
      CommonRequestMorphism<RA, B, Q, P, O, CR, { mutable: { is: true } }, RE>,
      "type"
    >,
  ) =>
    wrap(o)(
      a.concat(
        //@ts-ignore
        {
          ...ob,
          type: "request",
          mutable: { is: true },
        } as unknown as RequestMorphism,
      ),
    ),
  mutCustomPetition: <
    TR extends MorphismMap,
    B extends AnyMorphismMap,
    Q extends QueryOptions,
    P extends ParamOptions,
    CR extends CryptoOptions,
    MU extends undefined,
    RE = any,
  >(
    ob: Omit<
      Omit<RequestMorphism<TR, B, Q, P, O, CR, {}, RE>, "type">,
      "mutable"
    >,
  ) =>
    //@ts-ignore
    wrap(o)(a.concat({ ...ob, type: "request" } as unknown as RequestMorphism)),
  logSize: () => void console.log(a.length) ?? wrap(o)(a),
  logPaths: () => void a.forEach((x) => console.log(x.path)) ?? wrap(o)(a),
  logLastCheck: () =>
    void console.log(isUsing(o)(a.at(-1) as CommonRequestMorphism)) ??
      wrap(o)(a),
  handleRequest: (s: string) =>
    a.some((x) => x.path === s)
      ? (r: Request) =>
        Promise.resolve(
          response(o)(
            a.find((x) => x.path === s) as unknown as
              | RequestMorphism
              | CommonRequestMorphism,
          )(r),
        )
      : void console.error(s + " was not found.") ??
        (() => Promise.resolve(null)),
  //@ts-ignore
  clone: () => wrap({ ...o })([...a] as unknown as RequestMorphism[]),
  testRequests: () =>
    ((v) => (r: Request) => Promise.resolve(v(r)))(
      vixeny({ ...o, startWith: undefined })(
        //@ts-ignore
        [...a] as unknown as RequestMorphism<
          any,
          any,
          any,
          any,
          O,
          {},
          {},
          any
        >[],
      ),
    ),
  changeOptions: <RA extends WrapOptions>(o?: RA) =>
    wrap({ ...o })(
       //@ts-ignore
      [...a] as unknown as RequestMorphism<
        any,
        any,
        any,
        any,
        RA,
        {},
        {},
        any
      >[],
    ),
  union: (b: (
    | RequestMorphism<any, any, any, any, O, {}, {}, any>
    | CommonRequestMorphism<any, any, any, any, O, {}, {}, any>
  )[]) => wrap(o)([...a, ...b]),
  exclude: (list: string[] | string) => (
    pathsSet => wrap(o)(a.filter(morphism => !pathsSet.has(morphism.path)))
  )(
    new Set(Array.isArray(list) ? list : [list])
  ),
   unwrap: () =>
    a.map((x) =>
      o && o.startWith ? { ...x, path: o.startWith + x.path } : { ...x }
    ) as unknown as RequestMorphism<any, any, any, any, O, {}, {}, any>[],
});


