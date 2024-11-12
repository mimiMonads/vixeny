import aComposer from "../linker.ts";
import tools from "../composerTools.ts";
import type { ResolveOptions } from "./types.ts";
import type { FunRouterOptions } from "../../options.ts";
import type { Petition } from "../../morphism.ts";

export default (o?: FunRouterOptions<any>) =>
(path: string) =>
async (table: ResolveOptions) => {
  // Process each item in the table asynchronously
  const results = await Promise.all(
    table.map(async (x) => {
      // Add the path to each item
      const newX = { ...x, path } as unknown as Petition;

      // Await the async aComposer function
      const composed = await aComposer(o)(newX)(tools.isUsing(o)(newX));

      // Check if either x.f or composed is an async function
      const isAsync = x.f.constructor.name === "AsyncFunction" ||
        composed.constructor.name === "AsyncFunction";

      // Return the updated item
      return {
        name: x.name,
        f: isAsync
          ? async (r: any) => await x.f(await composed(r))
          : (r: any) => x.f(composed(r)),
      };
    }),
  );

  return results;
};
