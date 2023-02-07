import { funRouterOptions } from "./types.ts";
import { ObjectRawResponse } from "./optimizer/types.ts";
import optimizer from "./optimizer/optimize.ts";
import atlas from "./builder/atlas/main.ts";

import solver from "./builder/solver.ts";
import split from "./builder/atlas/split.ts";

export default (o?: funRouterOptions) =>
  (routes: ObjectRawResponse[]) =>
    ((re) =>
      ((s) => (r: Request) => re[3][s(r)](r))(
        solver(o)(re),
      ))(
        atlas(o)(
          split(o)(
            optimizer(o)(routes),
          ),
        ),
      );
