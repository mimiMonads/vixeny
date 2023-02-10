import { JsonNumberType } from "../types.ts";

export default (x: JsonNumberType) =>
  "const" in x && typeof x.const === "number"
    ? `'"${x.name}":' + ${x.const}`
    : `'"${x.name}":'+( typeof o${x.path} === "number"?o${x.path}:'${
      "default" in x ? x.default : null
    }')`;
