import type { FunRouterOptions } from "../../options.ts";
import type { Petition } from "../../morphism.ts";
import common from "./common.ts";
import elements from "./querryElements.ts";
import unique from "./unique.ts";
import plugin from "../../exportable/plugin.ts";

export default (o?: FunRouterOptions<any>) => (p: Petition) =>
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
          : () => null
    )(plugin.pluginIsUsing(p)("query"));
