import checkAsync from "./recursiveCheckAsync.ts";
import { FunRouterOptions } from "../../../types.ts";
import { CommonRequestMorphism, RequestMorphism } from "./types.ts";
import nativeComponets from "./nativeComponets.ts";
import nativeMaps from "./nativeMaps.ts";

export type specialOptions = {
  mutable?: true;
  branch?: boolean;
} & FunRouterOptions;

export default (o?: specialOptions) =>
(f: CommonRequestMorphism | RequestMorphism) =>
(ar: string[]) =>
  ar.length === 0 && !(o && "branch" in o) ? ((r: Request) => r) : (
    (el) => el
  )(
    (
      (table) =>
        (
          (functions) => 
            functions.reduce(
              (s, k) => s(k),
              new Function(
                ` return ${
                  table.map((x) => x.type === 1 ? x.name + "=>" : "").join("")
                } ${
                  f.resolve && checkAsync(f) ||
                    f.f.constructor.name === "AsyncFunction" ||
                    table.some((x) => "isAsync" in x && x.isAsync === true)
                    ? o && "branch" in o ? " r=>async b=> " : " async r=> "
                    : o && "branch" in o
                    ? "r=>b=>"
                    : "r=>"
                }({${table.map((x) => x.name + ":" + x.value).join(",")}})`,
              )(),
            )
        )(
          ((or) =>  nativeComponets(or)(f)(table))(
            "mutable" in f ? { ...o, mutable: true } as FunRouterOptions : o,
          ),
        )
    )(
      nativeMaps(o)(f)(ar)(("mutable" in f) || (o && "mutable" in o) || false),
    ),
  );
