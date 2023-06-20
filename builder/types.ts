
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
export type ParamsMethod = "GET" | "HEAD" | "POST" | "DELETE";
export type SearchIn = [number, string[], RequestFunction];
export type OptimizeList = [ParamsMethod[], SearchIn[][]];
export type Atlas = [
  ParamsMethod[],
  number[][],
  string[][][],
  RequestFunction[],
  RouteTypes[],
];
