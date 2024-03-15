import parseArguments from "./components/runtime/parseArguments.ts";
import name from "./components/runtime/name.mjs";
import objectNullRequest from "./components/http/src/optimizer/objectNullRequest.ts";
import {
  assertOptions,
  assertPlugin,
  getName,
  getOptions,
} from "./components/http/src/optimizer/pluginUtil.ts";
import checker from "./components/http/src/framework/optimizer/checker.ts";
import applyResolver from "./components/http/src/optimizer/branchComposer.ts";
import applyBranch from "./components/http/src/optimizer/branchComposer.ts";
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
  resolve: applyResolver,
  //TODO: Improve it
  //branch: applyBranch,
};
/**
 * @deprecated use composeResponse .
 */
export { default as vixeny } from "./components/http/serve.ts";

export { default as composeResponse } from "./components/http/serve.ts";
export { wrap } from "./components/http/src/fold/foldMain.ts";
export { default as morphism } from "./components/http/src/optimizer/morphism.ts";
/**
 * @deprecated use plugins.assertOptions .
 */
export { default as applyBranch } from "./components/http/src/optimizer/branchComposer.ts";
/**
 * @deprecated use plugins.assertOptions .
 */
export { default as assertOptions } from "./components/http/src/optimizer/assertOptions.ts";
/**
 * @deprecated use plugins.assertPlugin .
 */
export { default as assertPlugin } from "./components/http/src/optimizer/assertPlugin.ts";
