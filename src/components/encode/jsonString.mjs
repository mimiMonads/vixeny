import unsafe from "./src/stringify/unsafe.mjs";
import safe from "./src/stringify/safe.mjs";

/**
 * Stringifies a given schema based on provided options.
 *
 * @function
 * @param {Object} [options] - Configuration options for stringifying.
 * @param {("unsafe" | "safe")} [options.type="safe"] - The type of stringify method to use, can be "unsafe" or "safe".
 * @returns {Function} A function that takes a `JsonStringify` schema and returns the stringified result.
 *
 * @example
 * // Using the default safe stringify method
 * const str_one_string = stringify()({
 *    type: "object",
 *    properties: {
 *      hello: { type: "string" },
 *    },
 *    required: ["hello"],
 * });
 *
 * // Using the unsafe stringify method
 * const ustr_one_string = stringify({type:"unsafe"})({
 *    type: "object",
 *    properties: {
 *      hello: { type: "string" },
 *    },
 *    required: ["hello"],
 * });
 * @note
 * To use the TypeScript typings for this function, import the `JsonStringifyFunction` type from the corresponding type definition file. Example:
 * `import { JsonStringifyFunction } from 'vixeny/components/encode/types;`
 */

export default (options) => (schema) =>
  typeof options === "object" && "type" in options && options.type === "unsafe"
    ? unsafe(schema)
    : safe(schema);
