import { funRouterOptions } from "../../types.ts";
import common from "./common.ts";
import elements from "./elements.ts";
import { ObjectRawResponseCommon } from "../../optimizer/types.ts";
import filter from "./filter.ts";
export default (o?: funRouterOptions) =>
  (f: ObjectRawResponseCommon) =>
    f && "query" in f && f.query?.only 
    ? new Function(`return ${elements(f.query.only)}`)() 
    : (
      only => 
        only.length > 0 
         ? new Function(`return ${elements(only)}`)() 
         : new Function(`return ${common(o)(f)}`)()
    )(filter(f.f.toString().split(" "))("query"))
