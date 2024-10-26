import tools from "./composerTools.ts";
import type { FunRouterOptions } from "../options.ts";
import type { Petition } from "../morphism.ts";
import nativeComponents from "./nativeComponents.ts";
import nativeMaps from "./nativeMaps.ts";

export type specialOptions = {
  mutable?: true;
  branch?: boolean;
} & FunRouterOptions<any>;

export default (o?: specialOptions) => (p: Petition) => (isUsing: string[]) => {
  // Base case: if 'isUsing' is empty and 'branch' is not in options, return the identity function
  // TODO: change it and add the branch flag in the petition
  if (isUsing.length === 0 && !(o && "branch" in o)) {
    return (r: Request) => r;
  }

  if (o && "branch" in o && p.thrush) {
    // TODO: implement this, just add another wrap , do it before 0.2.0
    throw new Error("PANIC_ONERROR: branch cannot have an on error yet");
  }

  // Generate the 'table' using nativeMaps
  const table = nativeMaps(o)(p)(isUsing)(false);

  // Generate 'functions' using nativeComponents
  const functions = nativeComponents(o)(p)(table);

  // Determine if asynchronous functions are needed
  const needsAsync = (p.resolve && tools.recursiveCheckAsync(p)) ||
    p.f.constructor.name === "AsyncFunction" ||
    table.some((x) => "isAsync" in x && x.isAsync === true);

  // Build the function chain prefix from 'table'
  const functionChain = table
    .filter((x) => x.type === 1)
    .map((x) => `${x.name}=>`)
    .reduceRight(
      (acc, v) => v + acc,
      // If thrush is in
      typeof p.thrush === "object" ? "onError=>" : "",
    );

  // Determine the function signature based on options
  let functionSignature = "";
  if (needsAsync) {
    // We are using the same structure of a branch for OnError

    functionSignature = (o && "branch" in o) || typeof p.thrush === "object"
      ? " r=> async b=> "
      : " async r=> ";
  } else {
    functionSignature = (o && "branch" in o) || p.thrush ? "r=>b=>" : "r=>";
  }

  // Adding thrush at the table to insert it in the final CTX object
  const expandedTable = typeof p.thrush === "object"
    ? [...table, p.thrush]
    : table;

  // Build the function body, injecting variables from 'table'
  const functionBody = `({${
    expandedTable.map((x) => `${x.name}:${x.value}`).join(",")
  }})`;

  // Build the full function string
  const functionString =
    `return ${functionChain} ${functionSignature} ${functionBody}`;

  // Create the function using 'new Function'
  const generatedFunc = new Function(functionString)();

  // Reduce the functions over the generated function
  const resultFunction = functions.reduce((s, k) => s(k), generatedFunc);

  if (typeof p.thrush === "object") {
    // We apply it so we need a `Request` and the thrown unknown to resolve the ctx
    return resultFunction(p.f);
  }

  return resultFunction;
};
