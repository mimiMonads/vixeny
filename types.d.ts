
import { funRouterOptions}  from "./types.ts"
import { ObjectRawResponse } from "./optimizer/types.ts";

export type vixiny
 = (options:funRouterOptions) => (routes:ObjectRawResponse[]) => (req:Request) => Response

 export type ObjectResponse = ObjectRawResponse