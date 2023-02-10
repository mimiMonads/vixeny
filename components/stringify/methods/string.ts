import { JsonStringType } from "../types.ts";

export default (x: JsonStringType) =>
  "const" in x && typeof x.const === "string"
    ? `'"${x.name}":"${x.const}"'`
    : x.required && !("default" in x)
    ? `'"${x.name}":' + str(o.${x.name})`
    : `'"${x.name}":' + (typeof o.${x.name} === "string"?str(o.${x.name}):'${
      "default" in x && typeof x.default === "string"
        ? '"' + x.default + '"'
        : null
    }')`;
