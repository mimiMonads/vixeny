import { JsonOptionsType } from "../types.ts";
import string from "../methods/json_string.ts";
import boolean from "../methods/json_boolean.ts";
import number from "../methods/json_number.ts";
import array from "../methods/json_array.ts";

export default (element: JsonOptionsType[]) => (
  element.map(
    (x) =>
      x.type === "string"
        ? string(x)
        : x.type === "boolean"
        ? boolean(x)
        : x.type === "number"
        ? number(x)
        : array(x),
  ).join(" + ',' +")
);
