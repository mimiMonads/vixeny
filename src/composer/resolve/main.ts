import tools from "../composerTools.ts";
import type { ResolveOptions, ResponseResponse } from "./types.ts";
import type { FunRouterOptions } from "../../options.ts";
import type { Petition, ResolveMap } from "../../morphism.ts";

import table from "./table.ts";

export default (o?: FunRouterOptions<any>) =>
(path: string) =>
(input: ResolveMap<any>): ResponseResponse =>
  (
    (ar) =>
      (
        (table) =>
          ((isAsync) =>
            table.reduce(
              (a, k) => a(k.f),
              new Function(
                ` return ${table.map((x) => x.name + "=>").join("")}${
                  isAsync ? "async r =>" : " r=>"
                }({${
                  table.map((x) =>
                    x.name +
                    ":" + (isAsync ? "await " : "") + x.name + "(r)"
                  ).join(",")
                }})`,
              )(),
            ) as unknown as ResponseResponse)(
              ar.some((x) =>
                tools.recursiveCheckAsync(
                  x as unknown as Petition,
                )
              ),
            )
      )(
        table(o)(path)(
          ar,
        ) as ({ name: string; f: (r: Request) => any | Promise<any> })[],
      )
  )(
    Object.keys(input).map((x) => ({ ...input[x], name: x })) as ResolveOptions,
  );
