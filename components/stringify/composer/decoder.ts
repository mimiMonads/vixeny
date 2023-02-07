import { JsonMap, JsonStringify } from "../types.ts";

export default (j: JsonStringify) =>
  Object.keys(j.properties)
    .map(
      (x) =>
        ({
          type: j.properties[x].type,
          required: j.required?.includes(x) === true ? true : false,
          name: x,
        }) as JsonMap,
    );
