import type { FunRouterOptions } from "../../options.ts";
import type { Petition } from "../../morphism.ts";
import common from "./common.ts";
import elements from "./queryElements.ts";
import unique from "./unique.ts";
import plugin from "../../exportable/plugin.ts";

export const f = (o?: FunRouterOptions<any>) =>
(
  p: Petition,
): (url: string) => string | Record<string, string | null> | null =>
  p.query && p.query.name
    ? new Function(`return ${unique([p.query.name])}`)()
    : p.query && Array.isArray(p.query.only)
    ? new Function(`return ${elements(p.query.only)}`)()
    : (
      (only) =>
        only
          ? only.length > 0
            ? new Function(`return ${elements(only)}`)()
            : new Function(`return ${common(o)(p)}`)()
          : new Function(`return ${common(o)(p)}`)()
    )(plugin.pluginIsUsing(p)("query"));

export const isUsing = (o?: FunRouterOptions<any>) => (p: Petition): string =>
  (
    (uses) =>
      uses && uses?.length > 0
        ? `[` + uses.map((x) => x + "?") + "]"
        : p.query?.unique
        ? "[" + p.query?.name + "?" + "]"
        : `Record<string, string|null> | null`
  )(
    plugin.pluginIsUsing(p)("query"),
  );
