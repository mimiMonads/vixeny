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

export const wrap = <O extends FunRouterOptions>(o?: O) =>
<
  R extends MorphismMap,
  B extends AnyMorphismMap,
  Q extends QueryOptions,
  P extends ParamOptions,
  CR extends CryptoOptions,
  MU extends MutableKey,
>(a = [] as (
  | RequestMorphism<any, any, any, any, O, any, any>
  | CommonRequestMorphism<any, any, any, any, O, any, any>
)[]) => ({
  standard: <
    RA extends MorphismMap,
    B extends AnyMorphismMap,
    Q extends QueryOptions,
    P extends ParamOptions,
    CR extends CryptoOptions,
    MU extends undefined,
  >(
    ob: Omit<
      CommonRequestMorphism<RA, B, Q, P, O, CR, { mutable: { is: false } }>,
      "mutable"
    >,
  ) => wrap(o)(a.concat({ ...ob })),
  request: <
    TR extends MorphismMap,
    B extends AnyMorphismMap,
    Q extends QueryOptions,
    P extends ParamOptions,
    CR extends CryptoOptions,
    MU extends undefined,
  >(
    ob: Omit<Omit<RequestMorphism<TR, B, Q, P, O, CR, MU>, "type">, "mutable">,
  ) => wrap(o)(a.concat({ ...ob, type: "request" })),
  mutStandard: <
    RA extends MorphismMap,
    B extends AnyMorphismMap,
    Q extends QueryOptions,
    P extends ParamOptions,
    _MU extends undefined,
  >(
    ob: Omit<
      CommonRequestMorphism<RA, B, Q, P, O, CR, { mutable: { is: true } }>,
      "type"
    >,
  ) =>
    wrap(o)(
      a.concat(
        {
          ...ob,
          type: "request",
          mutable: { is: true },
        } as unknown as CommonRequestMorphism,
      ),
    ),
  mutRequest: <
    TR extends MorphismMap,
    B extends AnyMorphismMap,
    Q extends QueryOptions,
    P extends ParamOptions,
    CR extends CryptoOptions,
    MU extends undefined,
  >(
    ob: Omit<Omit<RequestMorphism<TR, B, Q, P, O, CR, MU>, "type">, "mutable">,
  ) => wrap(o)(a.concat({ ...ob, type: "request" })),
  size: () => void console.log(a.length) ?? wrap(o)(a),
  names: () => void a.forEach((x) => console.log(x.path)) ?? wrap(o)(a),
  checkLast: () =>
    void console.log(isUsing(o)(a.at(-1) as CommonRequestMorphism)) ??
      wrap(o)(a),
  compose: (s: string) =>
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
  copy: () => wrap({ ...o })([...a]),
  test: () =>
    ((v) => (r: Request) => Promise.resolve(v(r)))(vixeny({ ...o })([...a])),
  unwrap: () => [...a],
});
