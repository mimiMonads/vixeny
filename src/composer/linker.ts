import tools from "./composerTools.ts";
import type { FunRouterOptions } from "../options.ts";
import type { Petition } from "../morphism.ts";
import nativeComponents from "./nativeComponents.ts";
import nativeMaps from "./nativeMaps.ts";

export type specialOptions = {
  mutable?: true;
  branch?: boolean;
} & FunRouterOptions<any>;

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
          ((or) => nativeComponents(or)(f)(table))(o),
        )
    )(
      nativeMaps(o)(f)(ar)(false),
    ),
  );
