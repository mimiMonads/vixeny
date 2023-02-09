import {  JsonOptionsType } from "../types.ts";
import string from "../methods/string.ts"
import boolean from "../methods/boolean.ts"
import number from "../methods/number.ts"

export default (element: JsonOptionsType[]) =>
  (
    (l) =>
      element.map(
        (x) =>
          x.type === "string" 
            ? string(x)
            : x.type === "boolean"
            ? boolean(x)
            : number(x)
      ).join(" + ',' +")
  )(element.length - 1);
