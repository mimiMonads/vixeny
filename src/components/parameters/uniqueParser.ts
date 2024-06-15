import type { info } from "./types.ts";
import singleElement from "./singleElement.ts";
import type { FunRouterOptions } from "../../options.ts";
export default (o?: FunRouterOptions<any>) => (map: info) =>
  map?.bind
    ? map.endsInSlash
      ? singleElement.fixElementAndSlashAtTheEnd(
        map.firstParam + map.bind.length,
      )
      : singleElement.fixElementAtTheEnd(map.firstParam + map.bind.length)
    : map.endsInSlash
    ? singleElement.elementAndSlashAtTheEnd(map.firstParam + 1)
    : singleElement.elementWithNoSlashAtTheEnd(map.firstParam + 1);
