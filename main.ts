// File: vixeny/index.ts
import parseArguments from "./components/runtime/parseArguments.mjs";
import name from "./components/runtime/name.mjs";
import objectNullRequest from "./components/http/src/optimizer/objectNullRequest.ts";
import {
  assertOptions,
  asssertPlugin,
  getName,
  getOptions,
} from "./components/http/src/optimizer/pluginUtil.ts";
import checker from "./components/http/src/framework/optimizer/checker.ts";
import applyResolver from "./components/http/src/optimizer/branchComposer.ts";
import applyBranch from "./components/http/src/optimizer/branchComposer.ts";
import anyRequest from "./components/http/src/optimizer/anyRequest.ts";

// Re-exporting from each file

export const runtime = {
  name: name,
  arguments: parseArguments,
};

export const plugins = {
  objectNullRequest,
  assertOptions,
  asssertPlugin,
  getName,
  getOptions,
  checker: checker,
  anyRequest: anyRequest,
};

export const testing = {
  resolve: applyResolver,
  branch: applyBranch,
};
export { default as vixeny } from "./components/http/serve.ts";
export { wrap } from "./components/http/src/fold/foldMain.ts";
export { default as morphism } from "./components/http/src/optimizer/morphism.ts";

export { default as applyBranch } from "./components/http/src/optimizer/branchComposer.ts";
/**
 * @deprecated use plugins.assertOptions .
 */
export { default as assertOptions } from "./components/http/src/optimizer/assertOptions.ts";
/**
 * @deprecated use plugins.assertPlugin .
 */
export { default as assertPlugin } from "./components/http/src/optimizer/assertPlugin.ts";
