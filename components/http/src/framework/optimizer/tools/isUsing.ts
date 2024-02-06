import { FunRouterOptions } from "../../../../types.ts";
import elements from "../../../util/elements.ts";
import checker from "../checker.ts";
import { CommonRequestMorphism, RequestMorphism } from "../types.ts";

export default (o?: FunRouterOptions) =>
(f: CommonRequestMorphism | RequestMorphism) =>
  (
      f.options && typeof f.options?.only !== "undefined" &&
      f.options.only.length > 0
    )
    ? Object.keys(f.options.only)
    : checker(
      (f.options && f.options.remove) ? Object.keys(f.options.remove) : [],
    )([...elements(f), ...(Object.keys(o?.cyclePlugin || {}) || [])])(
      [
        ...((f.options && f.options.add) ? f.options.add : []),
      ],
    )(
      f.f.toString(),
    );
