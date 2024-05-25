import tools from "./composerTools.ts";
import type { FunRouterOptions } from "../options.ts";
import type { Petition } from "../morphism.ts";
import nativeComponets from "./nativeComponents.ts";
import nativeMaps from "./nativeMaps.ts";

export type specialOptions = {
  mutable?: true;
  branch?: boolean;
} & FunRouterOptions;

export default (o?: specialOptions) => (f: Petition) => (ar: string[]) =>
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
                  f.resolve && tools.recursiveCheckAsync(f) ||
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
          ((or) => nativeComponets(or)(f)(table))(
            "mutable" in f ? { ...o, mutable: true } as FunRouterOptions : o,
          ),
        )
    )(
      nativeMaps(o)(f)(ar)(("mutable" in f) || (o && "mutable" in o) || false),
    ),
  );
