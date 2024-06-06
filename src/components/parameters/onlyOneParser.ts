import type { info } from "./types.ts";
import singleElement from "./singleElement.ts";

export default (map: info) =>
  map?.bind === "string"
    ? map.endsInSlash
      ? singleElement.creatingAnObjectWith(map.elements[0].slice(1))(
        singleElement.fixElementAndSlashAtTheEnd(map.firstParam),
      )
      : singleElement.creatingAnObjectWith(map.elements[0].slice(1))(
        singleElement.fixElementAtTheEnd(map.firstParam),
      )
    : map.endsInSlash
    ? singleElement.creatingAnObjectWith(map.elements[0].slice(1))(
      singleElement.elementAndSlashAtTheEnd(map.firstParam + 1),
    )
    : singleElement.creatingAnObjectWith(map.elements[0].slice(1))(
      singleElement.elementWithNoSlashAtTheEnd(map.firstParam + 1),
    );
