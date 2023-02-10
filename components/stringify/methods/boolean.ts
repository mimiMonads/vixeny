import { JsonBooleanType } from "../types.ts";

export default (x: JsonBooleanType) =>
  "const" in x && typeof x.const === "boolean"
    ? `'"${x.name}":' + ${x.name}`
    : `'"${x.name}":'+( typeof o.${x.name} === "boolean"?o.${x.name}:'${
      "default" in x ? x.default : null
    }')`;
