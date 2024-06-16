import type { info } from "./types.ts";

import finder from "./finder.ts";
import sliceURL from "./sliceURL.ts";
import type { FunRouterOptions } from "../../options.ts";

export default (o?: FunRouterOptions<any>) => (info: info) =>
  (
    (slice) =>
      (
        (find) =>
          new Function(` return ( sl => (fi => p => fi(sl(p)))(${find} ))`)()(
            slice,
          ) as (url: string) => Record<string, string>
      )(
        finder(info),
      )
  )(
    typeof o?.indexBase?.at === "number"
      ? sliceURL.sliceUsingAt(info.firstParam + 1)(info.lastParam)
      : sliceURL.slice(info.firstParam + 1)(info.lastParam),
  );
