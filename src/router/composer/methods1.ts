import { FunRouterOptions } from "../../../../types.ts";
import parser from "./parser1.ts";
import map from "../atlas/map.ts";

import { Atlas as Atlas1 } from "../atlas/main1.ts";

export default (o?: FunRouterOptions) =>
(atlas: Atlas1) =>
(start: number) =>
(end: number) =>
(badMethod: number) =>
  (
    (position) => [
      ...atlas[0]
        .map(
          (_, i) =>
            o && "hasName" in o && typeof o.hasName === "string"
              ? new Function(
                ` return p => s => p(s.substring(${o!.hasName!.length - 1} ${
                  o && o.router && o.router.strictTrailingSlash &&
                    o?.router?.strictTrailingSlash === false
                    ? `, (s.indexOf('/?') +1 || s.indexOf('?') +1 || s.length + 1) -1 `
                    : ""
                })${
                  o && o.router && o.router.strictTrailingSlash &&
                    o.router.strictTrailingSlash === false
                    ? `|| '/'`
                    : ""
                }) `,
              )()(
                parser(o)(atlas[2][i])(position[i])(atlas[1][i])(start)(end),
              )
              : o && o.router && o.router.strictTrailingSlash &&
                  o.router.strictTrailingSlash === false
              ? ((p) =>
                (
                  (n) => (s: string) =>
                    n !== -1
                      ? p(
                        s.substring(
                          n,
                          (s.indexOf("/?") + 1 || s.indexOf("?") + 1 ||
                            s.length + 1) - 1,
                        ) || "/",
                      )
                      : p(
                        s.slice(
                          n = s
                            .split("/")
                            .filter((x) => x !== "")
                            .reduce(
                              (acc, x, u) => u <= 1 ? acc + x.length : acc,
                              3,
                            ) - 1,
                          (s.indexOf("/?") + 1 || s.indexOf("?") + 1 ||
                            s.length + 1) - 1,
                        ) || "/",
                      )
                )(
                  -1,
                ))(
                  parser(o)(atlas[2][i])(position[i])(atlas[1][i])(start)(end),
                )
              : ((p) =>
                (
                  (n) => (s: string) =>
                    n !== -1 ? p(s.substring(n)) : p(s.substring(
                      n = s
                        .split("/")
                        .filter((x) => x !== "")
                        .reduce(
                          (acc, x, u) => u <= 1 ? acc + x.length : acc,
                          3,
                        ) - 1,
                    ))
                )(
                  -1,
                ))(
                  parser(o)(atlas[2][i])(position[i])(atlas[1][i])(start)(end),
                ),
        ) as [(s: string) => number],
      () => badMethod,
    ]
  )(
    map(atlas[2]),
  );
