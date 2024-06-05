import type { info } from "./types.ts";
import singleElement from "./singleElement.ts";

export default (map: info) =>
  map?.bind === "string"
    ? map.endsInSlash
      ? singleElement.fixElementAndSlashAtTheEnd(map.firstParam)
      : singleElement.fixElementAtTheEnd(map.firstParam)
    : map.endsInSlash
    ? singleElement.elementAndSlashAtTheEnd(map.firstParam )
    : singleElement.elementWithNoSlashAtTheEnd(map.firstParam + 1);
