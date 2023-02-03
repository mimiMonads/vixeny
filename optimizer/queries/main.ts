import { funRouterOptions } from "../../types.ts";
import { ObjectRawResponseCommon } from "../types.ts";
import common from "./common.ts"
import elements from "./elements.ts"

export default (o?: funRouterOptions) => (f: ObjectRawResponseCommon) =>
   f && "query" in f &&  f.query?.only
    ? elements(f.query.only)
    : common(o)(f)
