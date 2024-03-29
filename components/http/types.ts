///

import {
  AnyMorphismMap,
  CommonRequestMorphism,
  CryptoOptions,
  MorphismMap,
  MutableKey,
  ObjectRawResponseReturn,
  ObjectRawResponseStatic,
  ParamOptions,
  Petition,
  QueryOptions,
  RequestMorphism,
} from "./src/framework/optimizer/types.ts";

import { CORSOptions } from "./src/cors/types.ts";

/**
 * Options for the router, it is `optional`
 * ```ts
 * import vixeny from "vixeny/fun"
 * import pettitions from "./someWhere"
 * vixeny({
 *  hasName: "http://127.0.0.1:8080/",
 *  404: r => new Response("Insert Not Found"),
 *  405: r => new Response("Insert Bad Method"),
 *  //default
 *  paramsStartsWith: ":"
 * })(...pettions)
 * ```
 */
export type FunRouterOptions = {
  /**
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
  hasName?: string;
  cors?: CORSOptions;
  readonly router?: {
    /**
     * When true, the router treats URLs with a trailing slash as distinct from those without. For example, /hello and /hello/ are considered different routes, and each can have its own handler.
     */
    strictTrailingSlash?: false;
  };
  /**
   * When an URL with a valid URL is detected and used it will be added to yout `context`
   *
   * ```ts
   * // default
   * {
   *  path: "/route/:name",
   *  f: ctx => ctx.param.name
   * }
   * // this behavour can change with this option, for example:
   * {
   *  path: "/route/-name",
   *  f: ctx => ctx.param.name
   * }
   * // assuming that `paramsStartsWith` was set to `-`, this option only takes the first character
   * ```
   */
  paramsStartsWith?: string;
  readonly stateFlags?: {
    isFileServer?: true;
    slashIs?: string;
    isWild?: true;
  };
  readonly retruns?: any;
  readonly enableLiveReloading?: true;
  /**
   * A function that takes a Request and returns a Response for 404 errors.
   */
  404?: (x: Request) => Response;

  /**
   * A function that takes a Request and returns a Response for 405 errors.
   */
  405?: (x: Request) => Response;

  readonly cyclePlugin?: CyclePluginMap;
};

export type CyclePluginMap = {
  readonly [key: string]: CyclePlugin;
};

export type CyclePlugin = {
  readonly name: symbol;
  readonly f: (
    o?: FunRouterOptions,
  ) => (
    p: Petition,
  ) => (r: Request | [Request, Record<string, unknown>]) => any;
  readonly type: unknown;
  readonly options?: { [k: string]: any };
} | {
  readonly name: symbol;
  readonly isFunction: true;
  readonly f: (o?: FunRouterOptions) => (p: Petition) => any;
  readonly type: unknown;
  readonly options?: { [k: string]: any };
} | {};

export type Vixeny = <O extends FunRouterOptions>(o?: O) => <
  T extends MorphismMap,
  B extends AnyMorphismMap,
  Q extends QueryOptions,
  P extends ParamOptions,
  CR extends CryptoOptions,
  _MU extends MutableKey,
>(
  routes: (
    | RequestMorphism<T, B, Q, P, O, CR, any>
    | CommonRequestMorphism<T, B, Q, P, O, CR, any>
    | ObjectRawResponseReturn
    | ObjectRawResponseStatic
  )[],
) => (r: Request) => Promise<Response> | Response;
