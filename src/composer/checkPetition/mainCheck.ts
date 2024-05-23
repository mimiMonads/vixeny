
import type { Petition } from "../../morphism.ts";
import type { FunRouterOptions } from "../../options.ts";
import composerTools from "../composerTools.ts";
import checkParse from "./checkParse.ts";

export default  (o?: FunRouterOptions) => (f: Petition) =>
  "options" in f && f.options 
    ? f.options.only
      ? f.options.only
      : checkParse(composerTools.elements(f))(f.options?.remove ?? [])(f.options?.add ?? [])(f)
    : checkParse(composerTools.elements(f))([])([])(f)
