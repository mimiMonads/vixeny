import params from "./parameters/main.ts";
import query from "./queries/main.ts";
import { funRouterOptions } from "../types.ts";
import { ObjectRawResponseCommon, RequestArguments } from "./types.ts";

export default (o?: funRouterOptions) =>
  (f: ObjectRawResponseCommon) =>
    (ar: string[]) =>
      ((el) =>
        (
          endo => endo as (r: Request) => RequestArguments
        )(
          (
            new Function(
              `return ${
                el.reduce(
                  (acc, y) =>
                    (y.type == 1 && ar.includes(y.name))
                      ? "(" + y.name + "=>" + acc + ")(" + y.f(o)(f) +
                        ")"
                      : acc,
                  `r=>({${
                    el.reduce((acc, v) =>
                      ar.includes(v.name)
                        ? (v.type === 0)
                          ? acc + `${v.name}:r,`
                          : acc + `${v.name}:${v.name}(r.url),`
                        : acc, "")
                  }})`,
                )
              }`,
            )
          )()
        )
        )(
          [{ name: "req", type: 0, f: query }, 
          {name: "query",type: 1,f: query, },
           { name: "param", type: 1, f: params }],
        );
