///
export type ParamsMethod = "GET" | "HEAD" | "POST" | "DELETE";

export type funRouterOptions = {
  hasName?: string;

  paramsStartsWith?: string;
  notFound?: { (x: Request): Response };
  badMethod?: { (x: Request): Response };
};

export type ArrayFiler = [ArraySwap[], RouteTypes[]];
export type ArraySwap = [number, string, ParamsMethod, RequestFunction];
export type RequestUrl = [string[], string];
export type RequestFunction = { (r: Request): Response };
export type RouteTypes = [
  ParamsMethod,
  string,
  RequestFunction,
  string | false,
];
export type SearchIn = [number, string[], RequestFunction];
export type OptimizeList = [ParamsMethod[], SearchIn[][]];
