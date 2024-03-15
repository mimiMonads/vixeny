import { FunRouterOptions } from "../../types.ts";
import {
  AnyMorphismMap,
  BodyNull,
  CryptoOptions,
  MorphismMap,
  MutableKey,
  ObjectAndNullMorphism,
  ParamOptions,
  QueryOptions,
  RequestMorphism,
} from "../framework/optimizer/types.ts";

import response from "../framework/optimizer/response.ts";

/**
 * Creates a handler that processes HTTP requests based on a Petition. It is designed to work with Vixeny's plugin system and routing capabilities, allowing for flexible request handling and response generation. The handler can conditionally return data for template engines or trigger default templates based on the presence of query parameters.
 *
 * Example usage:
 * ```js
 * import { plugins } from 'vixeny';
 * import { globalOptions } from "./somewhere";
 *
 * // Define a function that uses query parameters to decide what object to return.
 * // If a 'name' query parameter is present, it returns an object with the user's name.
 * // Otherwise, it returns null to signify no specific data was found.
 * const functionForTemplates = plugins.objectNullRequest(globalOptions)({
 *   f: c => c.query.name ? { user: c.query.name } : null
 * });
 *
 * // Example calls to `functionForTemplates` demonstrating how it works with different requests.
 * // Returns an object with the name 'dave' to pass to the template engine.
 * functionForTemplates(new Request('http://localhost/page?name=dave'));
 *
 * // Returns null, which will trigger the default template.
 * functionForTemplates(new Request('http://localhost/page'));
 *
 * // Compose a response handler that incorporates file serving with dynamic template generation.
 * // The handler is configured to serve files from './yourDir/' and use Pug for templates.
 * const handler = composeResponse(globalOptions)([
 *   {
 *     type: "fileServer",
 *     name: "/serverPath", // It's recommended to use `/` to add it to the root.
 *     path: "./yourDir/",
 *     template: [
 *       yourPlugin(pluginModule)({
 *         petition: functionForTemplates
 *       }),
 *     ],
 *   },
 * ]);
 * ```
 */
export default <O extends FunRouterOptions>(o?: O) =>
<
  R extends MorphismMap,
  B extends AnyMorphismMap,
  Q extends QueryOptions,
  P extends ParamOptions,
  CR extends CryptoOptions,
  MU extends MutableKey,
  Return = any,
>(
  r: ObjectAndNullMorphism<R, B, Q, P, O, CR, MU, Return>,
) =>
  response(o)({ ...r, type: "object" } as unknown as RequestMorphism) as (
    r: Request,
  ) => Promise<BodyNull> | BodyNull;
