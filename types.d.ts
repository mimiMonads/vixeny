
import { funRouterOptions } from "./types.ts"
import { ObjectRawResponse } from "./optimizer/types.ts";


//TODO : NPM TYPES SUPPORT

export type Vixeny = (o?: funRouterOptions) => (routes: ObjectRawResponse[]) => (r: Request) => Promise<Response> | Response;
export type RouterOptions = ObjectRawResponse[]
// Define the default exported function
