import { JsonNumberType } from "../types.ts";

export default (x: JsonNumberType) =>
  "const" in x
    ? `'"${x.name}":' + ${x.const}`
    : `'"${x.name}":'+( typeof o.${x.name} === "number"?o.${x.name}:'${
      "default" in x ? x.default : null
    }')`;
