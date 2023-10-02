import recursiveCheck from "../checkAsync.ts";
import { BranchOptions, ResponseResponse } from "./types.ts";
import { ObjectRawResponseCommon } from "../types.ts";
import table from "./table.ts";
import { specialOptions } from "../aComposer.ts";

export default (o?: specialOptions) =>
(path: string) =>
(input: BranchOptions | BranchOptions[]): ResponseResponse =>
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
            ))(
              ar.some((x) => recursiveCheck(x as ObjectRawResponseCommon)),
            )
      )(
        table(false)(o ? { ...o, branch: true } : { branch: true })(path)(
          ar,
        ) as ({ name: string; f: (r: Request) => any | Promise<any> })[],
      )
  )(
    (Array.isArray(input) ? [...input] : [...[input]]) as BranchOptions[],
  );
