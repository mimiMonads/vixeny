import parseargs from "./src/runtime/parseArguments.ts";
import name from "./src/runtime/name.ts";
import { f as query } from "./src/components/queries/mainQueries.ts";
import { f as param } from "./src/components/parameters/mainParameters.ts";
import { f as cookie } from "./src/components/cookies/mainCookies.ts";
import { f as token } from "./src/components/cookieToToken/mainCookieToToken.ts";

/**
 * Components utilities
 */
export const components = {
  query,
  param,
  cookie,
  token,
};

/**
 * Runtime utilities
 */
export const runtime = {
  name: name,
  arguments: parseargs,
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

/**
 * Dev stuff
 */
export const symbolExport = {
  /**
   * Version
   */
  [Symbol.for("vixeny")]: [0, 1, 43],
} as {
  [key: symbol]: [number, number, number];
};
