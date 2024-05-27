import parseArguments from "./src/runtime/parseArguments.ts";
import name from "./src/runtime/name.mjs";

import objectNullRequest from "./components/http/src/optimizer/objectNullRequest.ts";

import checker from "./components/http/src/framework/optimizer/checker.ts";
import resolveComposer from "./components/http/src/optimizer/resolveComposer.ts";
import anyRequest from "./components/http/src/optimizer/anyRequest.ts";

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
 * Testing utilities
 */
export const testing = {
  resolve: resolveComposer,
};
/**
 * @deprecated use composeResponse .
 */
export { default as vixeny } from "./fun.ts";

export { default as composeResponse } from "./fun.ts";
export { wrap } from "./src/exportable/wrap.ts";
export { petitions } from "./src/morphism.ts";
