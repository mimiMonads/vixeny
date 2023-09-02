import { FunRouterOptions } from "../types.ts";
import { RouteTypes } from "../builder/types.ts"
import { Petition } from "./types.ts";
import response from "./response.ts";
import staticFiles from "./staticFiles/main.ts";
import vixeny from "../fun.ts"

export default (
  o?: FunRouterOptions,
): (ar: Petition[]) => RouteTypes[] =>
  (ar) =>
    ar
      .map(
        (x) =>
          "type" in x
            ? x.type === "response"
              ? [x?.method ? x.method : "GET", x.path, x.r, false] as RouteTypes
              : x.type === "fileServer"
                ? ["GET", x.name + "*", vixeny(o)(staticFiles(x)), 'static'] as RouteTypes
                : [
                  x?.method ? x.method : "GET",
                  x.path,
                  response(o)(x),
                  false,
                ] as unknown as RouteTypes
            : [
              x?.method ? x.method : "GET",
              x.path,
              response(o)(x),
              false,
            ] as unknown as RouteTypes,
      );
