import { JsonStringType } from "../types.ts";

export default (x: JsonStringType) =>
  "const" in x && typeof x.const === "string"
    ? `'"${x.name}":"${x.const}"'`
    : x.required && !("default" in x)
    ? `'"${x.name}":' + str(o${x.path})`
    : `'"${x.name}":' + (typeof o${x.path} === "string"?str(o${x.path}):'${
      "default" in x && typeof x.default === "string"
        ? '"' + x.default + '"'
        : null
    }')`;
