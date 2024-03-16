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
  /**
   * `startWith` is an optional configuration that prefixes all petition paths with a specified string upon unwrapping.
   * This feature is particularly useful for organizing and grouping routes under a common base path,
   * making it easier to structure your application's API endpoints.
   *
   * When `startWith` is set and the wrap instance is unwrapped, each petition's path will be modified
   * to include this prefix, facilitating modular and hierarchical API designs.
   *
   * Example usage:
   * ```typescript
   * import extension from "./extension.ts";
   *
   * export default wrap()(
   *   extension.union(
   *     // Changing the start path of the wrap `extension` to prefix all paths with "/api"
   *     extension.changeOptions({ "startWith": "/api" })
   *       .unwrap(),
   *   ),
   * )
   * ```
   *
   * In this example, if `extension` had a petition with a path of `/hello`, after applying `changeOptions` with
   * `startWith: "/api"` and unwrapping, the resulting path would be `/api/hello`.
   */
  startWith?: string;
};
/**
 * `wrap` is a key function in Vixeny for safeguarding and encapsulating `Petitions`, particularly when
 * they are exported, composed, mocked, or altered. This encapsulation maintains the purity of your code
 * by ensuring that `Petitions` remain modular and protected from unintended modifications.
 *
 * @example
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
 * @example
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
   * `mutStdPetition` is similar to `stdPetition` but is designed to work with mutable state.
   * This allows the mutation of state within your Petition, enabling complex state management and
   * interactions within your application's flow.
   * Note: Use with caution to avoid unintended side effects.
   *
   * @mutable All composed `morphism` share the same mutable key
   *
   * @example
   * ```js
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
   * ```
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
  /**
   * `mutCustomPetition` is similar to `customPetition` but is designed to work with mutable state.
   * This allows the mutation of state within your Petition, enabling complex state management and
   * interactions within your application's flow.
   * Note: Use with caution to avoid unintended side effects.
   *
   * @mutable All composed `morphism` share the same mutable key
   *
   * @example
   * ```js
   * wrap()()
   *   .mutCustomPetition({
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
   *     f: c => new Response(c.mutable.hello + c.resolve.world)
   * })
   * ```
   */
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
  /**
   * `logSize` is a utility method that logs the current number of petitions wrapped by this instance.
   * It's useful for debugging purposes, to understand how many petitions have been defined up to a certain point.
   *
   * Example usage:
   * ```javascript
   * wrap()()
   *   .stdPetition({
   *       path: '/one',
   *       f: () => null
   *   })
   *   // Logging the size after adding the first petition:
   *   // Output: 1
   *   .logSize()
   *   .stdPetition({
   *       path: '/two',
   *       f: () => null
   *   })
   *   // Logging the size after adding the second petition:
   *   // Output: 2
   *   .logSize()
   * ```
   */
  logSize: () => void console.log(a.length) ?? wrap(o)(a),
  /**
   * `logPaths` is a utility method that logs the paths of all the petitions wrapped by this instance.
   * It helps in debugging by providing a quick overview of the defined petition paths at any given moment.
   *
   * Example usage:
   * ```javascript
   * wrap()()
   *   .stdPetition({
   *       path: '/one',
   *       f: () => null
   *   })
   *   // Logging the paths after adding the first petition:
   *   // Output: /one
   *   .logPaths()
   *   .stdPetition({
   *       path: '/two',
   *       f: () => null
   *   })
   *   // Logging the paths after adding the second petition:
   *   // Output:
   *   //   /one
   *   //   /two
   *   .logPaths()
   * ```
   */
  logPaths: () => void a.forEach((x) => console.log(x.path)) ?? wrap(o)(a),
  /**
   * `logLastCheck` is a diagnostic tool that logs the keys or parameters currently being used by the last petition added.
   * This is particularly helpful for developers to understand which parts of the context (`c`) are being composed.
   *
   * Example usage:
   * ```javascript
   * wrap()()
   *   .stdPetition({
   *       path: '/one',
   *       f: _c => null
   *   })
   *   // Logging the used context after the first petition (expected to be empty as none is used):
   *   // Output: []
   *   // Important!, `_c` will be the Request
   *   .logLastCheck()
   *   .stdPetition({
   *       path: '/two/:id',
   *       f: c => c.param.id
   *   })
   *   // Logging the used context after adding a petition that accesses a URL parameter:
   *   // Output: [ "param" ]
   *   .logLastCheck()
   * ```
   */
  logLastCheck: () =>
    void console.log(isUsing(o)(a.at(-1) as CommonRequestMorphism)) ??
      wrap(o)(a),
  /**
   * `handleRequest` dynamically processes a request getting a specified path. If the path exists among the defined petitions,
   * it either applies provided modifications (useful for mocking or altering request handling behavior) or proceeds with the
   * default petition handling logic.
   *
   * This function is particularly useful for testing, allowing you to inject mock options or modify the petition's behavior
   * on-the-fly without altering the original petition definitions.
   *
   * Example usage:
   *
   * Suppose we have a petition defined to handle requests to '/one', returning the current date as a string.
   * We can use `handleRequest` to process a request directly or modify its behavior for testing.
   *
   * ```javascript
   * const request = new Request("http://localhost/one")
   *
   * const paths = wrap()()
   *     .stdPetition({
   *         path: '/one',
   *         f: c => c.date.toString()
   *     });
   *
   * // Handling the request without modifications
   * const handles = paths.handleRequest("/one")({});
   *
   * // Handling the request with a mock date injected
   * const mocked = paths.handleRequest("/one")({
   *     options: {
   *         setDate: 1710592645075
   *     }
   * });
   *
   * // Outputs the current date
   * console.log(await handles(request).then(r => r.text()));
   *
   * // Outputs the mocked date: "1710592645075"
   * console.log(await mocked(request).then(r => r.text()));
   * ```
   */
  handleRequest: (s: string) =>
  (
    injection: Partial<
      (
        | RequestMorphism<any, any, any, any, O, {}, {}, any>
        | CommonRequestMorphism<any, any, any, any, O, {}, {}, any>
      )
    >,
  ) =>
    (a.some((x) => x.path === s)
      ? (r: Request) =>
        Promise.resolve(
          response(o)(
            { ...a.find((x) => x.path === s), ...injection } as unknown as
              | RequestMorphism
              | CommonRequestMorphism,
          )(r),
        )
      : void console.error(s + " was not found.") ??
        ((_: Request) => Promise.resolve(null))) as unknown as (
        r: Request,
      ) => Promise<Response>,
  /**
   * Creates a deep clone of the current wrap instance, including all options and defined petitions.
   * This is useful for creating separate instances with identical configuration and petitions, allowing
   * for independent modifications or testing.
   *
   * Usage example:
   * ```javascript
   * const original = wrap(options)().stdPetition({path: '/test', f: () => "Test"});
   * const cloned = original.clone();
   * ```
   */
  //@ts-ignore
  clone: () => wrap({ ...o })([...a] as unknown as RequestMorphism[]),
  /**
   * Simulates a server environment for testing the functionality of all wrapped requests.
   * This method creates a server-like instance that can handle requests directly, enabling
   * comprehensive testing of the `wrap` configuration and all defined petitions without depending
   * on an external runtime or actual server.
   *
   * This is particularly useful for unit testing or integration testing, where you want to validate
   * the behavior of your request handling logic under controlled conditions.
   *
   * Usage example:
   * ```javascript
   * // Assuming `wrap` has been configured with multiple petitions
   * const server = wrap(...)...
   * const testServer = server.testRequests();
   *
   * // Now you can use `testServer` to simulate requests and test responses
   * testServer(new Request("/some-path")).then(response => {
   *   // assertions or checks on the response
   * });
   * ```
   */
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
  /**
   * Allows for changing the wrap options of the current instance, creating a new instance with the updated options
   * while preserving the existing petitions. This is useful for dynamically adjusting configurations, such as
   * modifying routes or other settings, without needing to redefine all petitions.
   *
   * Usage example:
   * ```javascript
   * const initialWrap = wrap(initialOptions)().stdPetition({path: '/test', f: () => "Test"});
   * // Now, changing options for the wrap
   * const modifiedWrap = initialWrap.changeOptions(newOptions);
   * // `modifiedWrap` now operates with `newOptions`, while still handling the '/test' petition
   * ```
   */
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
  /**
   * Combines petitions from another `wrap` instance with the current one. This is particularly useful for modularizing
   * and reusing petitions across different parts of your application. By importing and unioning petitions, you can
   * maintain clean separation of concerns and ensure your code remains organized.
   *
   * Example usage:
   * Assuming `extension.ts` exports a wrapped petition, it can be combined with the petitions defined in `a.ts`:
   *
   * ```typescript
   * // Assuming extension is imported from "extension.ts"
   * export default wrap()()
   *   .union(extension.unwrap())
   *   .stdPetition({
   *     path: "/hello",
   *     f: () => "helloWorld",
   *   })
   *   .logPaths(); // Outputs paths from both the current wrap and the imported `extension`.
   * ```
   *
   * This method supports integrating only certain types of petitions, which align with the structure and functionality
   * intended by the wrap's design.
   */
  union: (b: (
    | RequestMorphism<any, any, any, any, O, {}, {}, any>
    | CommonRequestMorphism<any, any, any, any, O, {}, {}, any>
  )[]) => wrap(o)([...a, ...b]),
  /**
   * Excludes one or more petitions based on their paths from the current wrap instance, creating a new instance without the specified paths.
   * This is useful for dynamically adjusting the set of active petitions, perhaps in response to configuration changes or to conditionally
   * remove certain routes in different environments or contexts.
   *
   * The method accepts either a single path string or an array of path strings to exclude.
   *
   * Example usage:
   * ```typescript
   * // Assuming wrap()() has defined several petitions including paths '/excludeMe' and '/keepMe'
   * const filteredWrap = wrap()()
   *   .exclude(['/excludeMe'])
   *   // Now, the wrap instance `filteredWrap` will not include the petition for '/excludeMe'
   * ```
   *
   * This facilitates flexible and dynamic petition management within your application's routing logic.
   */
  exclude: (list: string[] | string) =>
    (
      (pathsSet) =>
        wrap(o)(a.filter((morphism) => !pathsSet.has(morphism.path)))
    )(
      new Set(Array.isArray(list) ? list : [list]),
    ),
  /**
   * Unwraps the current `wrap` instance into its constituent petitions, typically for the purpose of exporting
   * or further manipulation. This can be especially useful when combining multiple wrap instances or configuring
   * a server to handle all defined petitions.
   *
   * The `unwrap` method adjusts the paths based on the `startWith` option if it's set, allowing for prefixing all
   * paths within the unwrapped petitions, facilitating organized and hierarchical URL structures.
   *
   * Example usage:
   *
   * ```typescript
   * // Combining unwrapped petitions from multiple sources into a single wrap instance
   * composeResponse(options)(
   *   wrap(options)()
   *     .union(root.unwrap())
   *     .union(api.unwrap())
   *     .unwrap(), // Unwraps into an array of petitions ready for further processing
   * );
   * ```
   */
  unwrap: () =>
    a.map((x) =>
      o && o.startWith ? { ...x, path: o.startWith + x.path } : { ...x }
    ) as unknown as RequestMorphism<any, any, any, any, {}, {}, {}, any>[],
});
