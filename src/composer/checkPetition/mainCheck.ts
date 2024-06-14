import type { Petition } from "../../morphism.ts";
import type { FunRouterOptions } from "../../options.ts";
import composerTools from "../composerTools.ts";
import checkParse from "./checkParse.ts";
import checkTool from "./checkTool.ts";
import checkfrom from "./checkTools.ts";

export default ((o?: FunRouterOptions<any>) => (p: Petition) =>
  (
    (elements) =>
      p?.options?.only && Array.isArray(p.options.only) ? p.options.only : (
        (destructured) =>
          Array.isArray(destructured)
            ? destructured
            : destructured === null
            ? []
            : addAndRemove(p?.options?.remove ?? [])(p?.options?.add ?? [])([
              ...new Set(
                checkfrom.getDestructedElements(p.f)(destructured)
                  .concat(checkfrom.getDots(p.f)(destructured))
                  
              ),
            ].filter((item) => elements.includes(item)))
      )(
        checkfrom.getArgsname(p.f),
      )
  )(
    [
      ...composerTools.elements(p).concat(Object.keys(o?.cyclePlugin ?? {})),
    ],
  ));

const addAndRemove = (remove:string[]) => (add: string[]) => (elements: string[]) =>
        [
          ...new Set(
            (elements.filter( x => !remove.includes(x))?? []).concat(add)
          )
        ]