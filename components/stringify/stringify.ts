import sanitizer from "./composer/sanitizer.ts";
import { JsonStringify, JsonType } from "./types.ts";
import finder from "./composer/finder.ts";

export default (o: JsonStringify) =>
  (
    new Function(`return str=>o=> ${finder(o)} `)
  )()(sanitizer) as (o: JsonType | Promise<JsonType>) => string;
