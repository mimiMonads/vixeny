import { ObjectRawResponseCommon } from "../../optimizer/types.ts";
import { funRouterOptions } from "../../types.ts";
import multi from "./multi.ts";
import one from "./one.ts";
import map from "./map.ts";

type ParamsResult = { (s: string): Record<string, string> };

export default (options?: funRouterOptions) =>
  (f: ObjectRawResponseCommon) =>
    (
      (info) =>
        info.firstParam === -1
          ? () => null
          : info.elements.length === 1 &&
            (info.elements.at(-1) || "")[0] === info.startsWith &&
            f.path.at(-1) !== "/"
            ? new Function(`return ${one(info)}`)()
            : new Function(`return ${multi(info)}`)()
    )(
      map(options)(f),
    );
