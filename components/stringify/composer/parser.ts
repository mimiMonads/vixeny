import strings from "../methods/strings.ts";

export default (s: string) =>
  (
    new Function(`return str=>o=>'{' + ${s} + '}'`)
  )()(strings);
