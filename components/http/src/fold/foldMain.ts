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
/**
 * One of the most important uses of `wrap` in Vixeny is to protect and modularize `Petitions`, 
 * especially when they are exported , composed, mocked or modified. 
 * This ensures that your code remains pure.
 * 
 * ```ts
 * const options = {...} //Optional<funRouterOptions>
 * export const root = wrap(options)()
  .stdPetition({
    path: "/",
    f: () => "helloWorld",
  })
  ```
 */
export const wrap = <O extends WrapOptions>(o?: O) =>
/**
 * you can leave the secons `()()` empty on add anohter wrap
 * 
 *```ts
 * import {  api } from './somewhere'
 * const options = {...} //Optional<funRouterOptions>
 * export const root = wrap(options)(
 *   api.unwrap()
 * )
  .stdPetition({
    path: "/",
    f: () => "helloWorld",
  })
  ```
 */
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
  /**
   *
   * A standatd Petition where `f` has as a return type `BodyInit` | `Promise<BodyInit>`
   * 
   * ```js
export const root = wrap()()
    .stdPetition({
        path: '/',
        resolve: {
            world: morphism()({
                f: c => {
                    c.mutable.hello = "hello"
                   return 'world';
                }
            })
        },
        //hello world
        f: c =>  c.mutable.hello + c.resolve.world,
    })
   *``` 
   */
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
    /**
   *
   * A cusmtome Petition where `f` has as a return type `Response` | `Promise<Response>`
   * 
   * ```js
   * wrap(options)()
      .customPetition({
        path: "/response/who/:name",
        f: (c) =>  new Response(c.param.name)
      })
   *``` 
   */
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
      /**
   * A standatd mutable Petition where `f` has as a return type `BodyInit` | `Promise<BodyInit>`
   * 
   * @mutable All composed `morphisims` share the same mutable key
   * 
   * ```js
   * wrap(options)()
      .stdPetition({
        path: "/",
        f: () => "hello world",
      })
   *``` 
   */
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
  (
    injection: Partial<
      (
        | RequestMorphism<any, any, any, any, O, {}, {}, any>
        | CommonRequestMorphism<any, any, any, any, O, {}, {}, any>
      )
    >,
  ) =>
    a.some((x) => x.path === s)
      ? (r: Request) =>
        Promise.resolve(
          response(o)(
            { ...a.find((x) => x.path === s), ...injection } as unknown as
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
  exclude: (list: string[] | string) =>
    (
      (pathsSet) =>
        wrap(o)(a.filter((morphism) => !pathsSet.has(morphism.path)))
    )(
      new Set(Array.isArray(list) ? list : [list]),
    ),
  unwrap: () =>
    a.map((x) =>
      o && o.startWith ? { ...x, path: o.startWith + x.path } : { ...x }
    ) as unknown as RequestMorphism<any, any, any, any, {}, {}, {}, any>[],
});
