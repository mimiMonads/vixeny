import recursiveCheck from "../checkAsync.ts";
import { BranchOptions, ResponseResponse } from "./types.ts";
import table from "./table.ts";
import { specialOptions } from "../aComposer.ts";
import {
  AnyMorphismMap,
  CommonRequestMorphism,
  RequestMorphism,
} from "../types.ts";

export default (o?: specialOptions) =>
(path: string) =>
(input: AnyMorphismMap): ResponseResponse =>
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
              ar.some((x) =>
                recursiveCheck(
                  x as unknown as CommonRequestMorphism | RequestMorphism,
                )
              ),
            )
      )(
        table(o ? { ...o, branch: true } : { branch: true })(path)(
          ar,
        ),
      )
  )(
    Object.keys(input).map((x) => ({
      ...(input[x]),
      name: x,
    })) as BranchOptions,
  );
