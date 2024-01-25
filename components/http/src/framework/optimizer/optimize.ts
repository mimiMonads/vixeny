import { FunRouterOptions } from "../../../types.ts";
import { RouteTypes } from "../builder/types.ts";
import {
  AnyMorphismMap,
  CommonRequestMorphism,
  CryptoOptions,
  MorphismMap,
  ObjectRawResponseReturn,
  ObjectRawResponseStatic,
  ParamOptions,
  QueryOptions,
  RequestMorphism,
} from "./types.ts";
import response from "./response.ts";
import staticFiles from "./staticFiles/main.ts";
import vixeny from "../../../serve.ts";

export default (
  o?: FunRouterOptions,
): <
  T extends MorphismMap,
  B extends AnyMorphismMap,
  Q extends QueryOptions,
  P extends ParamOptions,
  O extends FunRouterOptions,
  CR extends CryptoOptions,
>(routes: (
  | RequestMorphism<T, B, Q, P, O, CR>
  | CommonRequestMorphism<T, B, Q, P, O, CR>
  | ObjectRawResponseReturn
  | ObjectRawResponseStatic
)[]) => RouteTypes[] =>
(ar) =>
  ar
    .map(
      (x) =>
        "type" in x
          ? x.type === "response"
            ? [x?.method ? x.method : "GET", x.path, x.r, false] as RouteTypes
            : x.type === "fileServer"
            ? [
              "GET",
              x.name + "*",
              vixeny(o)(staticFiles(x)),
              "static",
            ] as RouteTypes
            : [
              x?.method ? x.method : "GET",
              x.path,
              response(o)(x as unknown as CommonRequestMorphism),
              false,
            ] as unknown as RouteTypes
          : [
            x?.method ? x.method : "GET",
            x.path,
            response(o)(x as unknown as CommonRequestMorphism),
            false,
          ] as unknown as RouteTypes,
    );