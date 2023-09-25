import string from "../methods/json_string.mjs";
import boolean from "../methods/json_boolean.mjs";
import number from "../methods/json_number.mjs";
import array from "../methods/json_array.mjs";

export default element =>
  element.map(
    x =>
      x.type === "string"
        ? string(x)
        : x.type === "boolean"
        ? boolean(x)
        : x.type === "number"
        ? number(x)
        : array(x),
  ).join(" + ',' +");