// File: vixeny/index.ts
import parseArguments from "./components/runtime/parseArguments.mjs";
import name from './components/runtime/name.mjs'
// Re-exporting from each file

export const runtime = {
    name: name,
    arguments: parseArguments
}
export { default as vixeny } from "./components/http/serve.ts";
export { wrap } from "./components/http/src/fold/foldMain.ts";
export { default as morphism } from "./components/http/src/optimizer/morphism.ts";
export { default as applyResolver } from "./components/http/src/optimizer/resolveComposer.ts";
export { default as applyBranch } from "./components/http/src/optimizer/branchComposer.ts";
export { default as assertOptions } from "./components/http/src/optimizer/assertOptions.ts";
export { default as assertPlugin } from "./components/http/src/optimizer/assertPlugin.ts";
