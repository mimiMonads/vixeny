import tools from "../composerTools.ts";
import type { ResolveOptions, ResponseResponse } from "./types.ts";
import type { FunRouterOptions } from "../../options.ts";
import type { Petition, ResolveMap } from "../../morphism.ts";

import table from "./table.ts";

export default (o?: FunRouterOptions<any>) =>
(path: string) =>
async (input: ResolveMap<any>): Promise<ResponseResponse> => {
  // Convert input ResolveMap to ResolveOptions array
  const ar = Object.keys(input).map((x) => ({
    ...input[x],
    name: x,
  })) as ResolveOptions;

  // Await the table function since it might now be async
  const tableResult = await table(o)(path)(ar) as {
    name: string;
    f: (r: any) => any | Promise<any>;
  }[];

  // Check if any function in the tableResult is asynchronous
  const isAsync = tableResult.some((x) =>
    x.f.constructor.name === "AsyncFunction"
  );

  // Compose the functions into a single function that returns an object with function names as keys
  const composedFunction = isAsync
    ? async (r: any) => {
      const resultObj: { [key: string]: any } = {};
      for (const item of tableResult) {
        resultObj[item.name] = await item.f(r);
      }
      return resultObj;
    }
    : (r: any) => {
      const resultObj: { [key: string]: any } = {};
      for (const item of tableResult) {
        resultObj[item.name] = item.f(r);
      }
      return resultObj;
    };

  // Return the composed function as the ResponseResponse
  return composedFunction as unknown as ResponseResponse;
};
