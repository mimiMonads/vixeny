import parseArguments from "./src/runtime/parseArguments.ts";
import name from "./src/runtime/name.ts";

/**
 * Runtime utilities
 */
export const runtime = {
  name: name,
  arguments: parseArguments,
};

/**
 * Plugins utilities
 */
export { default as plugins } from "./src/exportable/plugin.ts";

/**
 * Petition utilities
 */

export { petitions } from "./src/morphism.ts";

/**
 * Composer utilities
 */

export { default as composer } from "./src/exportable/composer.ts";

/**
 * @deprecated use composeResponse .
 */
export { default as vixeny } from "./fun.ts";
export { default as composeResponse } from "./fun.ts";
export { wrap } from "./src/exportable/wrap.ts";
