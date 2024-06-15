import type { CyclePluginMap, FunRouterOptions } from "../options.ts";
import response from "../composer/compose.ts";
import composerTools from "../composer/composerTools.ts";
import vixeny from "../../fun.ts";
import type {
  BranchMap,
  CryptoOptions,
  Morphism,
  ParamOptions,
  Petition,
  QueryOptions,
  ResolveMap,
} from "../morphism.ts";
import type { ParamsMethod } from "../router/types.ts";

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
type Wrap<O extends FunRouterOptions<any>> = {
  /**
   * `petitionWithoutCTX` allows to bypass the `composer` and it is not bind to it's rules, keeping the function untouched.
   *
   * @param {Petition} petition - The petition to be added.
   * @returns {Object} The current wrap instance with the new petition added, allowing for chaining further modifications or additions.
   *
   * @example
   * ```js
   * const api = wrap()().addAnyPetition({
   *   path: "/data",
   *   r: wrappedPetitions.compose()
   * });
   * ```
   */
  petitionWithoutCTX: <RM, BM, QO, PO, CO, AR, R>(I: {
    path: string;
    method?: ParamsMethod;
    r: (ctx: Request) => Response | Promise<Response>;
  }) => Wrap<O>;
  /**
   * Defines a standard Petition where `f` returns either a `BodyInit` or a `Promise<BodyInit>`.
   *
   * @example
   * Usage example:
   * ```javascript
   * export const root = wrap()()
   *   .stdPetition({
   *     path: "/",
   *     f: () => "helloWorld",
   *   })
   * ```
   */
  customPetition: <
    RM extends ResolveMap<any>,
    BM extends BranchMap<any>,
    QO extends QueryOptions,
    PO extends ParamOptions,
    CO extends CryptoOptions,
    AR = any,
    R = any,
  >(
    ob: Morphism<
      {
        type: "request";
        hasPath: true;
        isAPetition: true;
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
  ) => Wrap<O>;
  /**
   * `customPetition` allows for defining a custom Petition where `f` returns either a `Response`
   * or a `Promise<Response>`. This method is suitable for scenarios where the standard response
   * structure does not fit your needs.
   *
   * @example
   * Usage example:
   * ```js
   * wrap(options)()
   *   .customPetition({
   *     path: "/response/who/:name",
   *     f: (c) => new Response(c.param.name),
   *   })
   * ```
   */
  stdPetition: <
    RM extends ResolveMap<any>,
    BM extends BranchMap<any>,
    QO extends QueryOptions,
    PO extends ParamOptions,
    CO extends CryptoOptions,
    AR = any,
    R = any,
  >(
    ob: Morphism<
      {
        type: "base";
        typeNotNeeded: true;
        hasPath: true;
        isAPetition: true;
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
  ) => Wrap<O>;
  /**
   * `logPaths` is a utility method that logs the paths of all the petitions wrapped by this instance.
   * It helps in debugging by providing a quick overview of the defined petition paths at any given moment.
   *
   * @example
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
  logPaths: () => Wrap<O>;
  /**
   * `logLastCheck` is a diagnostic tool that logs the keys or parameters currently being used by the last petition added.
   * This is particularly helpful for developers to understand which parts of the context (`c`) are being composed.
   *
   * @example
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
  logLastCheck: () => Wrap<O>;
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
  handleRequest: (
    s: string,
  ) => (
    injection: Partial<Petition>,
  ) => (r: Request) => Promise<Response | null>;
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
  testRequests: () => (r: Request) => Promise<Response>;
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
  changeOptions: <NC extends CyclePluginMap, NO extends FunRouterOptions<NC>>(
    newOptions?: NO,
  ) => Wrap<NO>;
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
  union: (b: Petition[]) => Wrap<O>;
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
  exclude: (list: string[] | string) => Wrap<O>;
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

  unwrap: () => Petition[];
  /**
   *  ```typescript
   * // Define an identity element for the monoid
   *   const identity = wrap({})();
   *   // Testing closure
   *   const a = wrap({})().stdPetition({
   *       path: '/a',
   *       f: () => 'test'
   *   });
   *   const b = wrap({})().stdPetition({
   *       path: '/b',
   *       f: () => 'test'
   *   });
   *   const c = a.union(b.unwrap());
   *   console.log(c.unwrap()); // Should log [{ path: '/a' , ...}, { path: '/b' , ...}]*
   *   // Testing associativity
   *   const d = wrap({})().stdPetition({
   *       path: '/d',
   *       f: () => 'test'
   *   });
   *   const assoc1 = a.union(b.unwrap()).union(d.unwrap());
   *   const assoc2 = a.union(b.union(d.unwrap()).unwrap());
   *   console.log(assoc1.unwrap()); // Should log [{ path: '/a' , ... }, { path: '/b' , ...}, { path: '/d' , ...}]
   *   console.log(assoc2.unwrap()); // Should log [{ path: '/a' , ...}, { path: '/b' , ...}, { path: '/d', ...}]*
   *   // Testing identity
   *   const idTest1 = a.union(identity.unwrap());
   *   const idTest2 = identity.union(a.unwrap());
   *   console.log(idTest1.unwrap()); // Should log [{ path: '/a' , ...}]
   *   console.log(idTest2.unwrap()); // Should log [{ path: '/a' , ...}]
   *  ```
   */
  pure: (petition: Petition) => Wrap<O>;
  /**
   * `addAnyPetition` allows for adding a petition of any type to the current wrap instance,
   * increasing flexibility in handling different Petitions as HTTP requests.
   * @example
   * ```js
   *
   *  const requestPetition = petitions.standard()({
   *    path: "/response",
   *    f: () => new Response("standard"),
   *  });
   *
   * const api = wrap()().addAnyPetition(requestPetition);
   * ```
   */
  addAnyPetition: (petition: Petition) => Wrap<O>;
  /**
   * `compose` consolidates all petitions within the wrap instance into a cohesive, operational unit,
   * ready for execution or further configuration. This method is pivotal for finalizing the setup
   * of routing and request handling mechanisms before application deployment.
   *
   * @returns {Object} A composite entity representing the fully configured request handling logic.
   *
   * @example
   * ```js
   * const app = wrap()()
   *   .addAnyPetition({ path: "/test", f: () => "Test" })
   *   .compose();
   * ```
   */
  compose: () => (r: Request) => Promise<Response> | Response;
  /**
   * Applies a function over each petition, wrapping each result, and then flattens all results into a single wrap.
   */
  flatMap: (fn: (p: Petition) => Wrap<O>) => Wrap<O>;
};

type WrapFunction = <FC extends CyclePluginMap, O extends FunRouterOptions<FC>>(
  o?: O,
) => (p?: Petition[]) => Wrap<O>;

/**
 * `wrap` is a key utility function in Vixeny for safeguarding and encapsulating `Petitions`, particularly when
 * they are exported, composed, mocked, or altered. This encapsulation maintains the purity of your code
 * by ensuring that `Petitions` remain modular and protected from unintended modifications.
 *
 * secure application routing and request handling.
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

export const wrap = ((o?) =>
(a = [] ) => ({
  petitionWithoutCTX: (I: {
    path: string;
    method?: ParamsMethod;
    r: { (ctx: Request): Response | Promise<Response> };
  }) =>
    //@ts-ignore
    wrap(o)(a.concat(
      //@ts-ignore
      {
        ...I,
        f: () =>
          new Response("Unreachable: TODO: make response work without an f"),
        type: "response",
      },
    )),
  customPetition: (
    ob,
  ) =>
    wrap(o)(a.concat(
      //@ts-ignore
      { ...ob, type: "request" } as Petition,
    )),

  stdPetition: (
    ob,
  ) =>
    wrap(o)(a.concat(
      { ...ob, type: "base" } as Petition,
    )),

  logPaths: () => void a.forEach((x) => console.log(x.path)) ?? wrap(o)(a),
  logLastCheck: () =>
    void console.log(
      a.length > 0
        ? composerTools.isUsing(o)(a[a.length - 1])
        : "This wrap is empty.",
    ) ??
      wrap(o)(a),
  handleRequest: (s: string) =>
  (
    injection: Partial<
      Petition
    >,
  ) =>
    (a.some((x) => x.path === s)
      ? (r: Request) =>
        Promise.resolve(
          response(o)(
            {
              ...a.find((x) => x.path === s),
              ...injection,
            } as unknown as Petition,
          )(r),
        )
      : void console.error(s + " was not found.") ??
        ((_: Request) => Promise.resolve(null))) as unknown as (
        r: Request,
      ) => Promise<Response>,
  testRequests: () =>
    ((v) => (r: Request) => Promise.resolve(v(r)))(
      vixeny({ ...o })(
        [...a],
      ),
    ),

  changeOptions: (o) =>
    wrap({ ...o })(
      [...a],
    ),
  union: (b) => wrap({ ...o })([...a, ...b]),
  exclude: (list) =>
    (
      (pathsSet) =>
        wrap(o)(a.filter((morphism) => !pathsSet.has(morphism.path)))
    )(
      new Set(Array.isArray(list) ? list : [list]),
    ),
  unwrap: () =>
    a.map((x) =>
      o && o.wrap?.startWith
        ? { ...x, path: o.wrap?.startWith + x.path }
        : { ...x }
    ),
  pure: (petition) => wrap(o)([petition]),
  addAnyPetition: (petition) => wrap(o)([...a, petition]),
  compose: () => vixeny(o)(a),
  flatMap: (fn) => a.reduce((acc, x) => acc.union(fn(x).unwrap()), wrap(o)([])),
})) as WrapFunction;
