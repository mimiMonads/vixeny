import type { info } from "./types.ts";
import singleElement from "./singleElement.ts";
import singleElementUsingAt from "./singleElementUsingAt.ts";
import type { FunRouterOptions } from "../../options.ts";

export default (o?: FunRouterOptions<any>) => (map: info) =>
  // Using `at`
  typeof o?.indexBase?.at === "number"
    ? map?.bind === "string"
      // Reusing `bind`
      ? map.endsInSlash
        ? singleElement.creatingAnObjectWith(map.elements[0].slice(1))(
          singleElement.fixElementAndSlashAtTheEnd(map.firstParam),
        )
        : singleElement.creatingAnObjectWith(map.elements[0].slice(1))(
          singleElement.fixElementAtTheEnd(map.firstParam),
        )
      // Actual `at` impl
      : map.endsInSlash
      ? singleElement.creatingAnObjectWith(map.elements[0].slice(1))(
        singleElementUsingAt.elementAndSlashAtTheEnd(map.firstParam + 1)(
          // Adding `at`
          o.indexBase.at,
        ),
      )
      : singleElement.creatingAnObjectWith(map.elements[0].slice(1))(
        singleElementUsingAt.elementWithNoSlashAtTheEnd(map.firstParam + 1)(
          // Adding `at`
          o.indexBase.at,
        ),
      )
    : map?.bind === "string"
    // Not using `at`
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
