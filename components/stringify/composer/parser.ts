import strings from "../composer/sanitizer.ts";

export default (s: string) =>
  (
    new Function(`return str=>o=>'{' + ${s} + '}'`)
  )()(strings);
