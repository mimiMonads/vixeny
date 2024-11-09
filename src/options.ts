import type { CORSOptions } from "./components/cors/types.ts";
import type { CyclePluginType } from "./exportable/plugin.ts";

/**
 * Options for the router, it is `optional`
 * ```ts
 * import vixeny from "vixeny/fun"
 * import pettitions from "./someWhere"
 * vixeny({
 *  404: r => new Response("Insert Not Found"),
 *  405: r => new Response("Insert Bad Method"),
 *  //default
 *  paramsStartsWith: ":"
 * })(...pettions)
 * ```
 */
export type FunRouterOptions<
  PI extends CyclePluginMap,
> = {
  /**
   * @deprecated
   * Optimize the router. It always has to end with "/"
   *
   * ```ts
   * //Correct
   * {
   *  "http://127.0.0.1:8080/"
   * }
   * //Incorrect
   * {
   *  "http://127.0.0.1:8080"
   * }
   * ```
   */
  readonly hasName?: string;
  readonly indexBase?: {
    bind?: string;
    at?: number;
  };
  readonly cors?: CORSOptions;
  readonly router?: {
    /**
     * When true, the router treats URLs with a trailing slash as distinct from those without. For example, /hello and /hello/ are considered different routes, and each can have its own handler.
     */
    strictTrailingSlash?: false;
  };
  /**
   * @deprecated
   *
   * When an URL with a valid URL is detected and used it will be added to your `context`
   *
   * ```ts
   * // default
   * {
   *  path: "/route/:name",
   *  f: ctx => ctx.param.name
   * }
   * // this behaviour can change with this option, for example:
   * {
   *  path: "/route/-name",
   *  f: ctx => ctx.param.name
   * }
   * // assuming that `paramsStartsWith` was set to `-`, this option only takes the first character
   * ```
   */
  readonly paramsStartsWith?: string;
  readonly stateFlags?: {
    isFileServer?: true;
    slashIs?: string;
    isWild?: true;
  };
  readonly runtimeOptions?: {
    returns?: any;
  };
  readonly debugging?: {
    injectHtml?: string;
  };

  /**
   * A function that takes a Request and returns a Response for 404 errors.
   */
  404?: (x: Request) => Response;

  /**
   * A function that takes a Request and returns a Response for 405 errors.
   */
  405?: (x: Request) => Response;

  readonly cyclePlugin?: PI;
  readonly wrap?: {
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
};

export type CyclePluginMap = {
  readonly [key: string]: CyclePluginType<any, any, any, any>;
};

/**
 * Provides a function to configure global options for Vixeny's plugins.
 * This allows setting options based on the provided plugin configuration map.
 *
 * @template FC - Specifies the type for the cycle plugin map.
 * @template O - Specifies the type for the functional router options.
 * @param {O} [options] - Optional configuration options to initialize plugins.
 * @returns {O} Returns the passed configuration options or undefined.
 *
 * Example usage:
 * @example
 * ```ts
 * import { plugins } from 'vixeny';
 *
 * // Define a plugin method with nested function returns.
 * const pluginMethod = plugins.type({
 *   name: Symbol.for("example"),
 *   type: undefined,
 *   f: () => () => () => " inCycle",
 * });
 *
 * // Set global options using the defined plugin method.
 * const options = plugins.globalOptions({
 *   cyclePlugin: {
 *     example: pluginMethod,
 *   },
 * });
 *
 * ```
 */

export const globalOptions = <
  FC extends CyclePluginMap,
  O extends FunRouterOptions<FC>,
>(
  options?: O,
) => options;
