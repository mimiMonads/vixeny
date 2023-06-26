///

import { Petition } from "./optimizer/types.ts";


export type funRouterOptions = {
  hasName?: string;
  paramsStartsWith?: string;
  notFound?: { (x: Request): Response };
  badMethod?: { (x: Request): Response };
};

export type Vixeny = (o?: funRouterOptions) => (routes: Petition[]) => (r: Request) => Promise<Response> | Response;
export type Petitions = Petition[]

