import type { FunRouterOptions } from "../../options.ts";
import type { Petition } from "../../morphism.ts";

// TODO: Redo

export default (o?: FunRouterOptions<any>) => (f: Petition) =>
  (
    (b) =>
      (
        (p) =>
          b !== -1
            ? `s=>(i=>
                i!==-1?
                Object.fromEntries(
                s.slice(i+1).split("&").map((x) => x.split("="))
                )
                :null)(s.indexOf("?"))`
            : ` (b=>s =>
                
                b !== -1
                  ? Object.fromEntries(
                    s.slice(b).split("&").map((x) => x.split("=")),
                  )
                  : Object.fromEntries(
                    s.slice(
                      b = s
                        .split("/")
                        .filter((x) => x !== "")
                        .reduce(
                          (acc, x, u) => u <= 1 ? acc + x.length : acc,
                          3,
                        ) +
                        ${p},
                    ).split("&").map((x) => x.split("=")),
                  ))(-1)`
      )(
        f.path.includes("/" + (o?.paramsStartsWith || ":"))
          ? f.path.indexOf("/" + (o?.paramsStartsWith || ":"))
          : f.path.length,
      )
  )(
    o?.indexBase?.bind ? o.indexBase.bind.length : -1,
  );
