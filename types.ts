///

import {
  ObjectRawResponseStatic,
  Petition,
} from "./components/http/src/framework/optimizer/types.ts";
import { FunRouterOptions } from "./components/http/types.ts";

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
export type { FunRouterOptions, ObjectRawResponseStatic, Petition };
