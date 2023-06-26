import { funRouterOptions } from "../types.ts";
import { RouteTypes } from "../builder/types.ts"
import { Petition } from "./types.ts";
import response from "./response1.ts";
import staticFiles from "./staticFiles.ts";
export default (
  o?: funRouterOptions,
): (ar: Petition[]) => RouteTypes[] =>
  (ar) =>
    ar
      .map(
        (x) =>
          "type" in x
            ? x.type === "response"
              ? [x?.method ? x.method : "GET", x.path, x.r, false] as RouteTypes
              : x.type === "static"
              ? ["GET", x.path, staticFiles(o)(x), x.name] as RouteTypes
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
