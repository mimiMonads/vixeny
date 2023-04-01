
import { funRouterOptions}  from "./types.ts"
import { ObjectRawResponse } from "./optimizer/types.ts";


// Define the default exported function
export default function (o?: funRouterOptions): (routes: ObjectRawResponse[]) => (r: Request) => Response;