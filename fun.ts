import type { FunRouterOptions } from "./src/options.ts";

import optimizer from "./src/composer/mainComposer.ts";
import atlas from "./src/router/atlas/main1.ts";
import split from "./src/router/atlas/splitter.ts";
import solver from "./src/router/solver1.ts";
import type { fileServerPetition, Petition } from "./src/morphism.ts";

/**
 * Main function , use in wrap
 */


export default ((o?: FunRouterOptions<any>) =>
  async (routes: (Petition | fileServerPetition<any>)[]) => {
    // Await the optimizer function to ensure `awaited` is fully resolved
    const awaited = await optimizer(o)(routes);

    // Proceed with your operations using the resolved `awaited`
    const splitResult = split(o)(awaited);
    const re = atlas(o)(splitResult);
    const map = [...re[3]];

    const s = solver(o)(re);

    // Define your handler function as an async function
    const handler = async (r: Request): Promise<Response> => {
      return await map[s(r)](r);
    };

    // Return the handler function
    return handler;
  });


