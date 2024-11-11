import tools from "../composerTools.ts";
import type { BranchOptions, ResponseResponse } from "./types.ts";
import table from "./table.ts";
import type { specialOptions } from "../linker.ts";
import type { BranchMap } from "../../morphism.ts";
import type { Petition } from "../../morphism.ts";

export default (o?: specialOptions) =>
(path: string) =>
(input: BranchMap<any>): Promise<ResponseResponse> =>
  (
    async (ar) =>
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
              ar.some((x) =>
                tools.recursiveCheckAsync(
                  x as unknown as Petition,
                )
              ),
            )
      )(
        await table(o ? { ...o, branch: true } : { branch: true })(path)(
          ar,
        ),
      )
  )(
    Object.keys(input).map((x) => ({
      ...(input[x]),
      name: x,
    })) as BranchOptions,
  );
