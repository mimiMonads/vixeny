import { funRouterOptions } from "./types.ts";
import { ObjectRawResponse } from "./optimizer/types.ts";
import optimizer from "./optimizer/optimize.ts";
import methods from "./builder/methods.ts";
import atlas from "./builder/atlas.ts";
import arraySwap from "./builder/arraySwap.ts";
import resolver from "./builder/resolver.ts";

export default (o?: funRouterOptions) => (routes: ObjectRawResponse[]) =>
  ((re) =>
    ((fm) =>
      ((s) => (r: Request) => 
      (
        ((p) => re[3][p](r))(
          s(fm(r.method))(r.url),
        )
      )
      )(
        resolver(o)(re[3].length)(re[1])(re[2])(re[4]),
      ))(
        methods(re[0]),
      ))(
      atlas(o)(
        arraySwap(o)(
          optimizer(o)(routes),
        ),
      ),
    );
