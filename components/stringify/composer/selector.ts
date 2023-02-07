import { JsonMap, JsonOptionsType } from "../types.ts";

export default (element: JsonOptionsType[]) =>
  (
    (l) =>
      element.map(
        (x) =>
          x.type === "string"
            ? x.required
              ? `'"${x.name}":' + str(o.${x.name})`
              : `'"${x.name}":' + (typeof o.${x.name} === "string"?str(o.${x.name}):'null')`
            : x.type === "boolean"
            ? `'"${x.name}":'+(o.${x.name} === true ?"true":"false")`
            : `'"${x.name}":'+( typeof o.${x.name} === "number"?o.${x.name} :null)`,
      ).join(" + ',' +")
  )(element.length - 1);
