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

  return ((re) =>
    ((map) =>
      ((s) => (r: Request): Promise<Response> | Response => map[s(r)](r))(
        solver(o)(re),
      ))([...re[3]]))(
      atlas(o)(
        split(o)(
          awaited,
        ),
      ),
    );
});
