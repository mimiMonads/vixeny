import type { CyclePluginMap, FunRouterOptions } from "../options.ts";
import response from "../composer/compose.ts";
import composerTools from "../composer/composerTools.ts";
import vixeny from "../../fun.ts";
import { display, displayPaths } from "./display.ts";
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
 * `MethodMorphism` is a utility type that defines the function signatures for HTTP method-specific
 * route definitions such as `get`, `post`, `delete`, and `put` within the `Wrap` interface.
 *
 * This type extends the `Morphism` type but omits the `method` field from its parameters. The HTTP
 * method is enforced by the method name itself (e.g., `get`, `post`), ensuring that users cannot
 * override the method accidentally by specifying it in the parameters.
 *
 * @example
 * ```typescript
 * const api = wrap()()
 *   .get({
 *     path: "/users",
 *     f: () => "Get Users",
 *   })
 *   .post({
 *     path: "/users",
 *     f: () => "Create User",
 *   })
 *   .delete({
 *     path: "/users/:id",
 *     f: (c) => `Delete User ${c.param.id}`,
 *   })
 *   .put({
 *     path: "/users/:id",
 *     f: (c) => `Update User ${c.param.id}`,
 *   });
 * ```
 *
 * @typeparam O - The type of the router options (`FunRouterOptions`).
 */
type MethodMorphism<O extends FunRouterOptions<any>> = <
  RM extends ResolveMap<any>,
  BM extends BranchMap<any>,
  QO extends QueryOptions,
  PO extends ParamOptions,
  CO extends CryptoOptions,
  AR = any,
  R = any,
>(
  ob: Omit<
    Morphism<
      {
        type: "add";
        hasPath: true;
        isAPetition: true;
        typeNotNeeded: true;
        hasMaybe: true;
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
    "method"
  >,
) => Wrap<O>;

/**
 * The second `()` can either be left empty or used to add another `wrap`.
 * This allows for flexible composition of your application's routing and request handling.
 *
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
 * For more details, see the [first-and-second-curried](https://vixeny.dev/library/wrap#first-and-second-curried).
 */
type Wrap<O extends FunRouterOptions<any>> = {
  get: MethodMorphism<O>;
  post: MethodMorphism<O>;
  delete: MethodMorphism<O>;
  put: MethodMorphism<O>;
  route: MethodMorphism<O>;
  /**
   *    * @deprecated use `add` instead
   *
   * `petitionWithoutCTX` allows to bypass the `composer` and it is not bind to it's rules, keeping the function untouched.
   *
   * ```js
   * const api = wrap()().addAnyPetition({
   *   path: "/data",
   *   r: wrappedPetitions.compose()
   * });
   * ```
   * For more details, see the [petitionWithoutCTX](https://vixeny.dev/library/wrap#petitionwithoutctx.
   */
  petitionWithoutCTX: <RM, BM, QO, PO, CO, AR, R>(I: {
    path: string;
    method?: ParamsMethod;
    r: (ctx: Request) => Response | Promise<Response>;
  }) => Wrap<O>;
  /**
   * @deprecated use `add` instead
   *
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
   * For more details, see the [customPetition](https://vixeny.dev/library/wrap#custompetition.
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
        hasMaybe: true;
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
   * @deprecated use `add` instead
   *
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
   * For more details, see the [stdPetition](https://vixeny.dev/library/wrap#stdpetition).
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
        hasMaybe: true;
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
   * For more details, see the [logPaths](https://vixeny.dev/library/wrap#logpaths).
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
   *   .debugLast()
   *   .stdPetition({
   *       path: '/two/:id',
   *       f: c => c.param.id
   *   })
   *   // Logging the used context after adding a petition that accesses a URL parameter:
   *   // Output: [ "param" ]
   *   .debugLast()
   * ```
   * For more details, see the [debugLast](https://vixeny.dev/library/wrap#debuglast).
   */
  debugLast: () => Wrap<O>;
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
   * For more details, see the [handleRequest](https://vixeny.dev/library/wrap#handlerequest).
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
   * For more details, see the [testRequests](https://vixeny.dev/library/wrap#testrequests).
   */
  testRequests: () => Promise<(r: Request) => Promise<Response>>;
  /**
   * Allows for changing the wrap options of the current instance, creating a new instance with the updated options
   * while preserving the existing petitions. This is useful for dynamically adjusting configurations, such as
   * modifying routes or other settings, without needing to redefine all petitions.
   *
   *  For more details, see the [documentation](https://vixeny.dev/library/wrap#changeoptions).
   *
   * Usage example:
   * ```javascript
   * const initialWrap = wrap(initialOptions)().stdPetition({path: '/test', f: () => "Test"});
   * // Now, changing options for the wrap
   * const modifiedWrap = initialWrap.changeOptions(newOptions);
   * // `modifiedWrap` now operates with `newOptions`, while still handling the '/test' petition
   * ```
   * For more details, see the [changeOptions](https://vixeny.dev/library/wrap#changeoptions).
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
   *
   * For more details, see the [union](https://vixeny.dev/library/wrap#union).
   */
  union: (b: Petition[]) => Wrap<O>;
  /**
   * @deprecated use filter
   *
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
   * For more details, see the [exclude](https://vixeny.dev/library/wrap#exclude).
   */
  exclude: (list: string[] | string) => Wrap<O>;
  /**
   * Filter one or more petitions based on their paths from the current wrap instance, creating a new instance without the specified paths.
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
   * For more details, see the [exclude](https://vixeny.dev/library/wrap#exclude).
   */
  filter: (opt: string[] | string | { (p: Petition): boolean }) => Wrap<O>;
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
   * For more details, see the [unwrap](https://vixeny.dev/library/wrap#unwrap).
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
   * For more details, see the [pure](https://vixeny.dev/library/wrap#pure).
   */
  pure: (petition?: Petition) => Wrap<O>;
  /**
   * `addAnyPetition` allows for adding a petition of any type to the current wrap instance,
   * increasing flexibility in handling different Petitions as HTTP requests.
   *
   * ```js
   *
   *  const requestPetition = petitions.custom()({
   *    path: "/response",
   *    f: () => new Response("standard"),
   *  });
   *
   * const api = wrap()().addAnyPetition(requestPetition);
   * ```
   *
   * For more details, see the [addAnyPetition](https://vixeny.dev/library/wrap#addanypetition).
   */

  addAnyPetition: (petition: Petition) => Wrap<O>;
  /**
   * `compose` consolidates all petitions within the wrap instance into a cohesive, operational unit,
   * ready for execution or further configuration. This method is pivotal for finalizing the setup
   * of routing and request handling mechanisms before application deployment.
   *
   * ```js
   * const app = wrap()()
   *   .addAnyPetition({ path: "/test", f: () => "Test" })
   *   .compose();
   * ```
   * For more details, see the [compose](https://vixeny.dev/library/wrap#compose).
   */
  compose: () => Promise<(r: Request) => Promise<Response> | Response>;
  /**
   * Applies a function over each petition, wrapping each result, and then flattens all results into a single wrap.
   *
   * For more details, see the [flatMap](https://vixeny.dev/library/wrap#flatmap).
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

export const wrap = ((o?) => (a = []) => ({
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
  route: (
    ob,
  ) =>
    wrap(o)(a.concat(
      //@ts-ignore
      { ...ob, type: "add" } as Petition,
    )),

  stdPetition: (
    ob,
  ) =>
    wrap(o)(a.concat(
      { ...ob, type: "base" } as Petition,
    )),

  logPaths: () => (
    void a.forEach(
      (x) => displayPaths(x),
    ), wrap(o)(a)
  ),
  debugLast: () => (
    void (
      (isUsing) =>
        display(o)(a[a.length - 1])({
          using: isUsing,
          isAsync: composerTools.localAsync(o)(a[a.length - 1])(isUsing),
        })
    )(
      composerTools.isUsing(o)(a[a.length - 1]),
    ), wrap(o)(a)
  ),
  handleRequest: (s: string) =>
  (
    injection: Partial<
      Petition
    >,
  ) =>
    (a.some((x) => x.path === s)
      ? async (r: Request) =>
        Promise.resolve(
          (await response(o)(
            {
              ...a.find((x) => x.path === s),
              ...injection,
            } as unknown as Petition
          ))(r),
        )
      : ((_: Request) => Promise.resolve(null))) as unknown as (
        r: Request,
      ) => Promise<Response>,
  testRequests: (async () => {
    return await vixeny({ ...o })(
      [...a],
    ).then( v =>  async (r: Request) =>  await v(r))
  }),
  get: (ob) =>
    wrap(o)(
      a.concat(
        { ...ob, method: "GET", type: "add" } as Petition,
      ),
    ),
  post: (ob) =>
    wrap(o)(
      a.concat(
        { ...ob, method: "POST", type: "add" } as Petition,
      ),
    ),
  delete: (ob) =>
    wrap(o)(
      a.concat(
        { ...ob, method: "DELETE", type: "add" } as Petition,
      ),
    ),
  put: (ob) =>
    wrap(o)(
      a.concat(
        { ...ob, method: "PUT", type: "add" } as Petition,
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
  filter: (opt) =>
    typeof opt === "function" ? wrap(o)(a.filter(opt)) : (
      (pathsSet) =>
        wrap(o)(a.filter((morphism) => !pathsSet.has(morphism.path)))
    )(
      new Set(Array.isArray(opt) ? opt : [opt]),
    ),
  unwrap: () =>
    a.map((x) =>
      o && o.wrap?.startWith
        ? { ...x, path: o.wrap?.startWith + x.path }
        : { ...x }
    ),
  pure: (petition) => wrap(o)(petition ? [petition] : []),
  addAnyPetition: (petition) => wrap(o)([...a, petition]),
  compose: async () => {
    const v = await vixeny(o)(a)
    return v
  },
  flatMap: (fn) => a.reduce((acc, x) => acc.union(fn(x).unwrap()), wrap(o)([])),
})) as WrapFunction;
