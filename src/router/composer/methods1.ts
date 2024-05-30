import type { FunRouterOptions } from "../../options.ts";
import parser from "./parser1.ts";
import map from "../atlas/map.ts";

import type { Atlas as Atlas1 } from "../atlas/main1.ts";

export default (o?: FunRouterOptions<any>) =>
(atlas: Atlas1) =>
(start: number) =>
(end: number) =>
(badMethod: number) =>
  (
    (position) => [
      ...atlas[0]
        .map(
          (_, i) =>
            o?.indexBase?.bind
              ? new Function(
                ` return p => s => p(s.substring(${
                  o.indexBase.bind.length - 1
                } ${
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
              ? ((p) => (url: string) =>
                (
                  (start) =>
                    p(
                      url.slice(
                        start,
                        url.indexOf("/?", start) !== -1
                          ? url.indexOf("/?", start)
                          : (url.indexOf("?", start) !== -1
                            ? url.indexOf("?", start)
                            : url.length),
                      ) || "/",
                    )
                )(url.indexOf("/", url.indexOf("//") + 2)))(
                  parser(o)(atlas[2][i])(position[i])(atlas[1][i])(start)(end),
                )
              : ((p) => (s: string) =>
                p(s.slice(s.indexOf("/", s.indexOf("//") + 2))))(
                  parser(o)(atlas[2][i])(position[i])(atlas[1][i])(start)(end),
                ),
        ) as [(s: string) => number],
      () => badMethod,
    ]
  )(
    map(atlas[2]),
  );
