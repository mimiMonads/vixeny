import { ObjectRawResponseCommon } from "./../types.ts";
import { funRouterOptions } from "../../types.ts";
import multi from "./multi.ts";
import one from "./one.ts"
import map from "./map.ts"


type ParamsResult = { (s: string): Record<string, string> };


export default
 (options?: funRouterOptions) => 
 (f: ObjectRawResponseCommon) => (
        info => 
          info.elements.length === 1 && 
          (info.elements.at(-1) || "")[0] === info.startsWith &&
          f.path.at(-1) !== "/"
              ? one(info)
              : multi(info)
    )(
      map(options)(f)
    )
 