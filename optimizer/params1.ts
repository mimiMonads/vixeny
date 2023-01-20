import { ObjectRawResponseCommon } from "./types.ts";
import { funRouterOptions } from "../types.ts";

type ParamsResult = string | { (s: string): Record<string, string> };

export default (o?: funRouterOptions) => (f: ObjectRawResponseCommon) =>
  ((sp) =>
    ((el) =>
      ((p) =>
        (
          (v) =>
            p === -1 && v
              ? (new Function(
                `return e => ( ${
                  el.reduce(
                    (acc, v) => acc + `"${v}": "Error in the Parameters" ,`,
                    "",
                  )
                })`,
              ))()
              : (
                (st) =>
                  ((l) =>
                    l !== -1
                      ? `(f=>s=>f(s.indexOf("?") === -1?s.slice(${
                        f.path.indexOf(sp) + l - 1
                      })
                                 .split("/")
                                 .filter((x) => x !== ""):s.slice(${
                        f.path.indexOf(sp) + l - 1
                      })
                                 .slice(0,s.slice(${
                        f.path.indexOf(sp) + l - 1
                      }).lastIndexOf("?"))
                                 .split("/")
                                 .filter((x) => x !== "")))(${st.toString()})
                        `
                      : `(n=>st=>s=>    
                          n !== -1
                          ? s.indexOf("?") === -1?
                          st(
                            s.slice(n)
                              .split("/")
                              .filter((x) => x !== "")
                          ):st(
                            s.slice(n).slice(0,s.slice(n).indexOf("?"))
                              .split("/")
                              .filter((x) => x !== "")
                          )
                          : st(
                            s.slice(
                              n = s
                                .split("/")
                                .filter((x) => x !== "")
                                .reduce(
                                  (acc, x, u) =>
                                    u <= 1 ? acc + x.length : acc,
                                  2,
                                ) +
                                            ${
                        f.path
                          .indexOf(sp)
                      }
                            )
                              .split("/")
                              .filter((x) => x !== "")
                            )
                          )(-1)(${st.toString()})`)(
                      typeof o?.hasName === "string" ? o.hasName.length : -1,
                    )
              )(
                ((a: string[]) =>
                  (new Function(
                    `return e => ({ ${
                      a.reduce((acc, v, i) => acc + `"${v}": e[${i}],`, "")
                    }})`,
                  ))())(
                    el.slice(p).map((x) => x.slice(1)),
                  ) as (s: string[]) => Record<string, string>,
              )
        )(
          el.slice(p).every((x) => x[0] === sp),
        ))(el.findIndex((x) => x[0] === sp)))(
        f.path
          .split("/")
          .filter((x) => x !== ""),
      ))(
      typeof o?.paramsStartsWith === "string" ? o.paramsStartsWith : ":",
    );
