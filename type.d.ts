
import { funRouterOptions } from "./types.ts"
import { ObjectRawResponse } from "./optimizer/types.ts";


//TODO : NPM TYPES SUPPORT

type Vixeny = (o?: funRouterOptions) => (routes: ObjectRawResponse[]) => (r: Request) => Promise<Response> | Response;
export default Vixeny
// Define the default exported function
