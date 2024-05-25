import bun from "./src/base64toUrl/convertBase64ToBase64urlBun.mjs";
import deno from "./src/base64toUrl/convertBase64ToBase64urlDeno.mjs";
import node from "./src/base64toUrl/convertBase64ToBase64urlNode.mjs";
import name from "../runtime/name.mjs";

/**
 * Selects and returns a function to convert Base64 strings to Base64Url strings based on the runtime environment.
 *
 * The function checks the runtime (Bun, Deno, or Node) and returns the respective conversion function. If the runtime
 * is not Bun or Deno, it defaults to Node.
 *
 * @function
 * @returns {Function} A function that takes a Base64 string and returns its Base64Url representation.
 *
 * @example
 * const base64ToBase64Url = unwrapBase64ToBase64UrlFunction();
 * const myBase64UrlString = base64ToBase64Url(myBase64String);
 *
 * @note
 * The function relies on the `name` module to determine the runtime environment. Ensure the module correctly detects your environment.
 */

export default () =>
  (
    (rt) => rt === "Bun" ? bun() : rt === "Deno" ? deno() : node()
  )(
    name(),
  );
