///

import { ObjectRawResponse } from "./optimizer/types.ts";


export type funRouterOptions = {
  hasName?: string;
  paramsStartsWith?: string;
  notFound?: { (x: Request): Response };
  badMethod?: { (x: Request): Response };
};

export type Vixeny = (o?: funRouterOptions) => (routes: ObjectRawResponse[]) => (r: Request) => Promise<Response> | Response;
export type Petitions = ObjectRawResponse[]

