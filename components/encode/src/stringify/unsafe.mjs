import finder from "./composer/finder.mjs";

export default (o) =>
  (
    new Function(`return str=>o=> ${finder(o)} `)
  )()((i) => i);
