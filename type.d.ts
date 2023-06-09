
import { funRouterOptions } from "./types.ts"
import { ObjectRawResponse } from "./optimizer/types.ts";


//TODO : NPM TYPES SUPPORT

// Define the default exported function
declare function vixeny(o?: funRouterOptions): (routes: ObjectRawResponse[]) => (r: Request) => Response;
export default vixeny
