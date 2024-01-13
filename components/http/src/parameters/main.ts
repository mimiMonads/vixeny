import { CommonRequestMorphism, RequestMorphism } from "../framework/optimizer/types.ts";
import { FunRouterOptions } from "../../types.ts";
import multi from "./multi.ts";
import one from "./one.ts";
import map from "./map.ts";
import unique from "./unique.ts";

type ParamsResult = { (s: string): Record<string, string> };

export default (options?: FunRouterOptions) => (f: CommonRequestMorphism | RequestMorphism) =>
  (
    (info) =>
      f.param &&  typeof f.param.unique === "boolean" && f.param.unique
        ? new Function(`return ${unique(info)}`)()
        :       info.firstParam === -1 ? () => null : info.elements.length === 1 &&
        (info.elements.at(-1) || "")[0] === info.startsWith &&
        f.path.at(-1) !== "/"
      ? new Function(`return ${one(info)}`)()
      : new Function(`return ${multi(info)}`)()
  )(
    map(options)(f),
  );
