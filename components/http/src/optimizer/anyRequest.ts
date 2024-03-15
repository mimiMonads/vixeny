import { FunRouterOptions } from "../../types.ts";
import response from "../framework/optimizer/response.ts";
import {
  AnyMorphismMap,
  CommonRequestMorphism,
  CryptoOptions,
  MorphismMap,
  MutableKey,
  ObjectaAnyMorphism,
  ParamOptions,
  QueryOptions,
} from "../framework/optimizer/types.ts";

/**
 * Creates a handler for processing HTTP requests and generating responses suitable for any framework.
 * This function is designed to be highly adaptable, allowing for extensive customization of request processing
 * and response generation based on a wide range of options.
 *
 * It's important to note that if you are handling operations that are asynchronous in nature (e.g., fetching data from
 * a database or making network requests), you should ensure that the handling function is asynchronous and returns a Promise.
 *
 * Example usage:
 * ```js
 * import { createResponseHandler } from './path/to/this/file';
 *
 * const options = {...}; // Custom options for your handler
 * const petition = {...}; // Define how to process the request and generate a response
 *
 * // Create a response handler with specified options and morphism
 * const handler = createResponseHandler(options)(responseMorphism);
 *
 * // Example of using the handler with an asynchronous operation
 * async function handleRequest(request: Request) {
 *   return await handler(request);
 * }
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
  T = any, // The return type is based on the provided morphism configuration `r`.
>(
  r: ObjectaAnyMorphism<R, B, Q, P, O, CR, MU, T>,
) =>
  (response(o)(r as unknown as CommonRequestMorphism)) as unknown as (
    re: Request,
  ) => Promise<T> | T;
