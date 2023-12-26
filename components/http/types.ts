///

import { Petition } from "./optimizer/types.ts";
import { BranchOptions as branch } from "./optimizer/branch/types.ts";
import { ResolveOptions as resolve } from "./optimizer/resolve/types.ts";

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

  /**
   * A function that takes a Request and returns a Response for 404 errors.
   */
  404?: (x: Request) => Response;

  /**
   * A function that takes a Request and returns a Response for 405 errors.
   */
  405?: (x: Request) => Response;
};

export type Vixeny = (
  o?: FunRouterOptions,
) => (routes: Petition[]) => (r: Request) => Promise<Response> | Response;
/**
 * Vixeny takes an array ot `Petitions`
 *
 * ```ts
 * import arrayPetitions from "./someWhere"
 * vixeny(options)(...arrayPetitions)
 * ```
 * ---
 *
 * Also you can use add multiple `Petition`
 *
 * ```ts
 * import arrayPetitions from "./someWhere"
 * vixeny(options)([
 * {
 *    path: "/path",
 *    f: () => "Hello world"
 * },
 *  ...arrayPetitions
 * ])
 * ```
 */
export type Petitions = Petition[];
export type BranchOptions = branch;
export type ResolveOptions = resolve;
