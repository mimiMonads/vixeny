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
 * `wrap` is a key function in Vixeny for safeguarding and encapsulating `Petitions`, particularly when 
 * they are exported, composed, mocked, or altered. This encapsulation maintains the purity of your code
 * by ensuring that `Petitions` remain modular and protected from unintended modifications.
 * 
 * Usage example:
 * ```js
 * const options = {...} // Optional<funRouterOptions>
 * // Exporting a standard Petition
 * export const root = wrap(options)()
 *   .stdPetition({
 *     path: "/",
 *     f: () => "helloWorld",
 *   })
 * ```
 */
export const wrap = <O extends WrapOptions>(o?: O) =>
/**
 * The second `()` can either be left empty or used to add another `wrap`.
 * This allows for flexible composition of your application's routing and request handling.
 * 
 * Usage example:
 * ```js
 * import { api } from './somewhere'
 * const options = {...} // Optional<funRouterOptions>
 * // Composing with another wrap
 * export const root = wrap(options)(
 *   api.unwrap()
 * )
 *   .stdPetition({
 *     path: "/",
 *     f: () => "helloWorld",
 *   })
 * ```
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
   * Defines a standard Petition where `f` returns either a `BodyInit` or a `Promise<BodyInit>`.
   * 
   * Usage example:
   * ```js
   * export const root = wrap()()
   *   .stdPetition({
   *     path: "/",
   *     f: () => "helloWorld",
   *   })
   * ``` 
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
   * `customPetition` allows for defining a custom Petition where `f` returns either a `Response` 
   * or a `Promise<Response>`. This method is suitable for scenarios where the standard response 
   * structure does not fit your needs.
   * 
   * Usage example:
   * ```js
   * wrap(options)()
   *   .customPetition({
   *     path: "/response/who/:name",
   *     f: (c) => new Response(c.param.name),
   *   })
   * ``` 
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
    * `mutCustomPetition` is similar to `customPetition` but is designed to work with mutable state.
    * This allows the mutation of state within your Petition, enabling complex state management and 
    * interactions within your application's flow.
    * Note: Use with caution to avoid unintended side effects.
    * 
    * @mutable All composed `morphism` share the same mutable key   
    * 
    * @example
    *```js
    * wrap()()
    *   .mutStdPetition({
    *     path: '/',
    *     resolve: {
    *       world: morphism()({
    *         f: c => {
    *           c.mutable.hello = "hello ";
    *           return 'world';
    *         }
    *       })
    *     },
    *     // Utilizes the mutated state for constructing the response
    *     f: c => c.mutable.hello + c.resolve.world,
    * })
    *```
    * 
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

wrap()()
  .mutStdPetition