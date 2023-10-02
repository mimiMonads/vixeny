import sanitizer from "./composer/sanitizer.mjs";
import finder from "./composer/finder.mjs";

export default (o) =>
  (
    new Function(`return str=>o=> ${finder(o)} `)
  )()(sanitizer);
