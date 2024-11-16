import tools from "./composerTools.ts";
import type { FunRouterOptions } from "../options.ts";
import type { Petition } from "../morphism.ts";
import nativeComponents from "./nativeComponents.ts";
import nativeMaps from "./nativeMaps.ts";

export type specialOptions = {
  mutable?: true;
  branch?: boolean;
} & FunRouterOptions<any>;

export default (o?: specialOptions) =>
(p: Petition) =>
async (isUsing: string[]): Promise<any> => {
  // Checks if the function has to be applied again for an extra function
  const isApplyTo = p.applyTo !== undefined && typeof p.applyTo === "object";

  // Base case: if 'isUsing' is empty and 'branch' is not in options, return the identity function
  // TODO: change it and add the branch flag in the petition

  if (isUsing.length === 0 && !(o && "branch" in o)) {
    if (isApplyTo) {
      return (r: Request) => (b: unknown) => r;
    }
    return (r: Request) => r;
  }

  if (o && "branch" in o && isApplyTo) {
    // TODO: implement this, just add another wrap , do it before 0.2.0
    throw new Error("PANIC_ONERROR: branch cannot have an on error yet");
  }

  // Generate the 'table' using nativeMaps
  const table = nativeMaps(o)(p)(isUsing)(false);

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
      // Place to add more in the future
      "",
    );

  // Determine the function signature based on options
  let functionSignature = "";
  if (needsAsync) {
    // We are using the same structure of a branch for OnError

    functionSignature = (o && "branch" in o) || isApplyTo
      ? " r=> async b=> "
      : " async r=> ";
  } else {
    functionSignature = (o && "branch" in o) || isApplyTo ? "r=>b=>" : "r=>";
  }

  // Build the function body, injecting variables from 'table'
  const functionBody = `({${
    table.map((x) => `${x.name}:${x.value}`).join(",")
  }})`;

  // Build the full function string
  const functionString =
    `return ${functionChain} ${functionSignature} ${functionBody}`;

  return (await nativeComponents(o)(p)(table)).reduce(
    (s, k) => s(k),
    new Function(functionString)(),
  );
};
