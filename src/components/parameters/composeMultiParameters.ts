import type { info } from "./types.ts";

import finder from "./finder.ts";
import sliceURL from "./sliceURL.ts";

export default (info: info) =>
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
    sliceURL.slice(info.firstParam + 1)(info.lastParam),
  );
