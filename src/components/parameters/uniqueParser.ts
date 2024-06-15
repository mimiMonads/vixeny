import type { info } from "./types.ts";
import singleElement from "./singleElement.ts";
import singleElementUsingAt from "./singleElementUsingAt.ts";
import type { FunRouterOptions } from "../../options.ts";

export default (o?: FunRouterOptions<any>) => (map: info) =>
  typeof o?.indexBase?.at === "number"
    // At
    ? map?.bind
      ? map.endsInSlash
        // Reusing fix point
        ? singleElement.fixElementAndSlashAtTheEnd(
          map.firstParam + map.bind.length,
        )
        : singleElement.fixElementAtTheEnd(map.firstParam + map.bind.length)
      // Actual use of `singleElementUsingAt`
      : map.endsInSlash
      ? singleElementUsingAt.elementAndSlashAtTheEnd(map.firstParam + 1)(
        o.indexBase.at,
      )
      : singleElementUsingAt.elementWithNoSlashAtTheEnd(map.firstParam + 1)(
        o.indexBase.at,
      )
    // Not using at
    : map?.bind
    ? map.endsInSlash
      ? singleElement.fixElementAndSlashAtTheEnd(
        map.firstParam + map.bind.length,
      )
      : singleElement.fixElementAtTheEnd(map.firstParam + map.bind.length)
    : map.endsInSlash
    ? singleElement.elementAndSlashAtTheEnd(map.firstParam + 1)
    : singleElement.elementWithNoSlashAtTheEnd(map.firstParam + 1);
