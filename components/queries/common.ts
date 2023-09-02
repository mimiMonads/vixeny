import { FunRouterOptions } from "../../types.ts";
import { ObjectRawResponseCommon } from "../../optimizer/types.ts";
export default (o?: FunRouterOptions) =>
  (f: ObjectRawResponseCommon) =>
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
      typeof o?.hasName === "string" ? o.hasName.length : -1,
    );
