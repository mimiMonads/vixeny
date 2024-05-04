
import type { FunRouterOptions } from "../../options.ts";
import type { Petition } from "../../morphism.ts";
import multi from "./multi.ts";
import one from "./one.ts";
import map from "./map.ts";
import unique from "./unique.ts";


export default (options?: FunRouterOptions) =>
(f: Petition ) =>
  (
    (info) =>
      f.param && "unique" in f.param && typeof f.param.unique === "boolean" &&
        f.param.unique
        ? new Function(`return ${unique(info)}`)()
        : info.firstParam === -1
        ? () => null
        : info.elements.length === 1 &&
            (info.elements.at(-1) || "")[0] === info.startsWith &&
            f.path.at(-1) !== "/"
        ? new Function(`return ${one(info)}`)()
        : new Function(`return ${multi(info)}`)()
  )(
    map(options)(f),
  );
