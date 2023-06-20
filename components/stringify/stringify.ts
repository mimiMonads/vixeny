import sanitizer from "./composer/sanitizer.js";
import { JsonStringify, JsonType } from "./types.js";
import finder from "./composer/finder.js";

export default (o: JsonStringify) =>
  (
    new Function(`return str=>o=> ${finder(o)} `)
  )()(sanitizer) as (o: JsonType | Promise<JsonType>) => string;
