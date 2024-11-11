import aComposer from "../linker.ts";
import tools from "../composerTools.ts";
import type { ResolveOptions } from "./types.ts";
import type { FunRouterOptions } from "../../options.ts";
import type { Petition } from "../../morphism.ts";

export default (o?: FunRouterOptions<any>) => (path: string) => async (table: ResolveOptions) => {
  // Process each item in the table asynchronously
  const results = await Promise.all(
    table.map(async (x) => {
      // Add the path to each item
      const newX = { ...x, path };

      // Await the async aComposer function
      const composed = await aComposer(o)(newX as unknown as Petition)(tools.isUsing(o)(newX as unknown as Petition));

      // Check if either x.f or composed is an async function
      const isAsync =
        x.f.constructor.name === "AsyncFunction" ||
        composed.constructor.name === "AsyncFunction";

      // Define the function 'f' based on whether it's async or not
      let f;

      if (isAsync) {
        f = async (r: any) => {
          const resComposed = await composed(r);
          return await x.f(resComposed);
        };
      } else {
        f = (r: any) => x.f(composed(r));
      }

      // Return the updated item
      return {
        name: x.name,
        f,
      };
    })
  );

  return results;
};

  
    
