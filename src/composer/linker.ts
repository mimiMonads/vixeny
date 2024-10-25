import tools from "./composerTools.ts";
import type { FunRouterOptions } from "../options.ts";
import type { Petition } from "../morphism.ts";
import nativeComponents from "./nativeComponents.ts";
import nativeMaps from "./nativeMaps.ts";

export type specialOptions = {
  mutable?: true;
  branch?: boolean;
} & FunRouterOptions<any>;

export default (o?: specialOptions) => (f: Petition) => (isUsing: string[]) => {
  // Base case: if 'isUsing' is empty and 'branch' is not in options, return the identity function
  // TODO: change it and add the branch flag in the petition
  if (isUsing.length === 0 && !(o && "branch" in o)) {
    return (r: Request) => r;
  }

  // Generate the 'table' using nativeMaps
  const table = nativeMaps(o)(f)(isUsing)(false);

  // Generate 'functions' using nativeComponents
  const functions = nativeComponents(o)(f)(table);

  // Determine if asynchronous functions are needed
  const needsAsync = (f.resolve && tools.recursiveCheckAsync(f)) ||
    f.f.constructor.name === "AsyncFunction" ||
    table.some((x) => "isAsync" in x && x.isAsync === true);

  // Build the function chain prefix from 'table'
  const functionChain = table
    .filter((x) => x.type === 1)
    .map((x) => `${x.name}=>`)
    .join("");

  // Determine the function signature based on options
  let functionSignature = "";
  if (needsAsync) {
    functionSignature = o && "branch" in o ? " r=>async b=> " : " async r=> ";
  } else {
    functionSignature = o && "branch" in o ? "r=>b=>" : "r=>";
  }

  // Build the function body, injecting variables from 'table'
  const functionBody = `({${
    table.map((x) => `${x.name}:${x.value}`).join(",")
  }})`;

  // Build the full function string
  const functionString =
    `return ${functionChain} ${functionSignature} ${functionBody}`;

  // Create the function using 'new Function'
  const generatedFunc = new Function(functionString)();

  // Reduce the functions over the generated function
  const resultFunction = functions.reduce((s, k) => s(k), generatedFunc);

  return resultFunction;
};
