import parseargs from "./src/runtime/parseArguments.ts";
import name from "./src/runtime/name.ts";
import { f as query } from "./src/components/queries/mainQueries.ts";
import { f as param } from "./src/components/parameters/mainParameters.ts";
import { f as cookie } from "./src/components/parameters/mainParameters.ts";
import { f as token } from "./src/components/cookieToToken/mainCookieToToken.ts";

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
  query,
  param,
  cookie,
  token,
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
