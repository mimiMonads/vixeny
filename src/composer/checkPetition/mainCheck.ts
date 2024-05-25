
import type { Petition } from "../../morphism.ts";
import type { FunRouterOptions } from "../../options.ts";
import composerTools from "../composerTools.ts";
import checkParse from "./checkParse.ts";
import checkTool from "./checkTool.ts";

export default  (o?: FunRouterOptions) => (f: Petition) =>
  "options" in f && f.options 
    ? f.options.only
      ? f.options.only
      : (
        newOptions =>
        checkParse(newOptions.elements)(newOptions.remove)(newOptions.add)(f)

      )(
        checkTool.updateListOfAddAndRemove(f)(composerTools.elements(f))(o?.cyclePlugin ?? {})
      )
      
    : checkParse(composerTools.elements(f))([])([])(f)
