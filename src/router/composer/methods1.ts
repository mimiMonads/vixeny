import type { FunRouterOptions } from "../../options.ts";
import parser from "./parser1.ts";
import map from "../atlas/map.ts";
import type { Atlas as Atlas1 } from "../atlas/main1.ts";
import mainSlicerUrl from "../../util/slicerURL/mainSlicerUrl.ts";

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
            ((parsed) =>
              o?.indexBase?.bind
                ? baseIndexed(o.indexBase.bind.length)(
                  o.router?.strictTrailingSlash === false,
                )(
                  parsed,
                )
                : o?.router?.strictTrailingSlash === false
                ? typeof o.indexBase?.at === "number"
                  ? baseWithStricTrailingSlachesAndAt(
                    parsed,
                  )
                  : baseWithStricTrailingSlaches(
                    parsed,
                  )
                : typeof o.indexBase?.at === "number"
                ? baseAndAt(
                  parsed,
                )
                : base(
                  parsed,
                ))(
                parser(o)(atlas[2][i])(position[i])(atlas[1][i])(start)(end),
              ),
        ) as [(s: string) => number],
      () => badMethod,
    ]
  )(
    map(atlas[2]),
  );

const baseIndexed = (index: number) => (strictTrailingSlash: boolean) =>
  new Function(
    ` return p => s => p(s.slice(${index - 1} ${
      strictTrailingSlash
        ? `, (s.indexOf('/?') +1 || s.indexOf('?') +1 || s.length + 1) -1 `
        : ""
    })${strictTrailingSlash ? `|| '/'` : ""}) `,
  )();

// TODO: check for posible optimization switching `?` for `/?`
const baseWithStricTrailingSlaches =
  (p: (url: string) => number) => (url: string) =>
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
    )(url.indexOf("/", url.indexOf("//") + 2));

// TODO: check for posible optimization switching `?` for `/?`
const baseWithStricTrailingSlachesAndAt =
  (p: (url: string) => number) => (at: number) =>
    (
      (slicer) => (url: string) =>
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
        )(slicer(url))
    )(
      mainSlicerUrl(at),
    );

// Based
const base = (p: (url: string) => number) => (url: string) =>
  p(url.slice(url.indexOf("/", url.indexOf("//") + 2)));

const baseAndAt = (p: (url: string) => number) => (at: number) =>
  (
    (slicer) => (url: string) => p(url.slice(slicer(url)))
  )(
    mainSlicerUrl(at),
  );
