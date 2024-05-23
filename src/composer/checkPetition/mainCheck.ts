import type { Petition } from "../../morphism.ts";
import checkParse from "./checkParse.ts";
export default (_TBD: any) => (elements: string[]) => (f: Petition) =>
  "options" in f && f.options
    ? f.options.only
      ? f.options.only
      : checkParse(elements)(f.options?.remove ?? [])(f.options?.add ?? [])(f)
    : checkParse(elements)([])([])(f);
