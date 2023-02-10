import { JsonNumberType } from "../types.ts";

export default (x: JsonNumberType) =>
<<<<<<< HEAD
  "const" in x
    ? `'"${x.name}":' + ${x.const}`
=======
  "const" in x && typeof x.const === "number"
    ? `'"${x.name}":' + ${x.name}`
>>>>>>> 599ea90cc9137605e2710d4b8f0b78b68a7da256
    : `'"${x.name}":'+( typeof o.${x.name} === "number"?o.${x.name}:'${
      "default" in x ? x.default : null
    }')`;
