import sanitizer from "../composer/sanitizer.ts";
import { JsonStringify } from "../types.ts";
import finder from "./finder.ts"

export default (o: JsonStringify) =>
  (
    new Function(`return str=>o=> ${finder(o)} `)
  )()(sanitizer);