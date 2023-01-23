import { funRouterOptions } from "./types.ts";
import { ObjectRawResponse } from "./optimizer/types.ts";
import optimizer from "./optimizer/optimize.ts";
import atlas from "./builder/atlas.ts";
import arraySwap from "./builder/arraySwap.ts";
import resolver from "./builder/resolver.ts";

export default (o?: funRouterOptions) => (routes: ObjectRawResponse[]) =>
  ((re) =>
      ((s) => (r: Request) => re[3][s(r)](r)
      )(
        resolver(o)(re),
      ))(
      atlas(o)(
        arraySwap(o)(
          optimizer(o)(routes),
        ),
      ),
    );
