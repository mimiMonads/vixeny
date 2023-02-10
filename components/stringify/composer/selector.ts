import { JsonOptionsType } from "../types.ts";
import string from "../methods/string.ts";
import boolean from "../methods/boolean.ts";
import number from  "../methods/number.ts";
import array from  "../methods/array.ts";

export default (element: JsonOptionsType[]) =>
  (
      element.map(
        (x) =>
          x.type === "string"
            ? string(x)
            : x.type === "boolean"
            ? boolean(x)
            : x.type === "number"
              ? number(x)
              : array(x)
      ).join(" + ',' +"))