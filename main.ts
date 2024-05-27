import parseArguments from "./src/runtime/parseArguments.ts";
import name from "./src/runtime/name.mjs";
import objectNullRequest from "./components/http/src/optimizer/objectNullRequest.ts";
import {
  assertOptions,
  assertPlugin,
  getName,
  getOptions,
} from "./components/http/src/optimizer/pluginUtil.ts";
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
export const plugins = {
  objectNullRequest,
  assertOptions,
  assertPlugin,
  getName,
  getOptions,
  checker: checker,
  anyRequest: anyRequest,
};
/**
 * Testing utilities
 */
export const testing = {
  resolve: resolveComposer,
  //TODO: Improve it
  //branch: applyBranch,
};
/**
 * @deprecated use composeResponse .
 */
export { default as vixeny } from "./fun.ts";

export { default as composeResponse } from "./fun.ts";
export { wrap } from "./src/exportable/wrap.ts";
export { petitions } from "./src/morphism.ts";
