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
(routes: (Petition | fileServerPetition)[]) =>
  ((re) =>
    ((map) =>
      ((s) => (r: Request): Promise<Response> | Response => map[s(r)](r))(
        solver(o)(re),
      ))([...re[3]]))(
      atlas(o)(
        split(o)(
          optimizer(o)(routes),
        ),
      ),
    ));
