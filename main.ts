import parseargs from "./src/runtime/parseArguments.ts";
import name from "./src/runtime/name.ts";
import mainQueries from "./src/components/queries/mainQueries.ts";
import mainParameters from "./src/components/parameters/mainParameters.ts";

/**
 * Runtime utilities
 */
export const runtime = {
  name: name,
  arguments: parseargs,
};

/**
 * Runtime utilities
 */
export const components = {
  query: mainQueries,
  parameters: mainParameters,
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

export { composer } from "./src/exportable/composer.ts";

/**
 * @deprecated use composeResponse .
 */
export { default as vixeny } from "./fun.ts";
export { default as composeResponse } from "./fun.ts";
export { wrap } from "./src/exportable/wrap.ts";
