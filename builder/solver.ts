import { Atlas, RouteTypes } from "./types.ts";
import { funRouterOptions } from "../types.ts";
import solver from "./composer/methods.ts";
import specialString from "./composer/specialString.ts";
import finderMethods from "./composer/finderMethods.ts";

export default (o?: funRouterOptions) =>
  (atlas: Atlas) =>
    (
      (me) =>
        (
          (solve) =>
            atlas[4].length === 0
              ? (r: Request) =>
                me(r.method) !== -1
                  ? solve[me(r.method)](r.url)
                  : atlas[3].length - 1
              : (
                (sc) =>
                  (r: Request) =>
                    (
                      (w) =>
                        w === -1
                          ? me(r.method) !== -1
                            ? solve[me(r.method)](r.url)
                            : atlas[3].length - 1
                          : w
                    )(
                      sc(r.url),
                    )
              )(
                specialString({})(atlas[3].length - 1)(
                  atlas[4].map((x) => [x[0], x[3], x[2], x[1]] as RouteTypes),
                ),
              )
        )(
          solver(o)(atlas),
        )
    )(
      finderMethods(
        atlas[0],
      ),
    );
