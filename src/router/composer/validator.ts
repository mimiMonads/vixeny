import { FunRouterOptions } from "../../../../types.ts";
import map from "./map.ts";
import parameters from "./parameters.ts";

export default (options?: FunRouterOptions) =>
(base: number) =>
(notFound: number) =>
(ar: string[]) =>
  (ar.reduce(
    (acc, x, i) =>
      x === "/"
        ? acc + ` s === "/" ${
          options?.router?.strictTrailingSlash === false
            ? ""
            : `|| s.startsWith("/?")`
        } ? ${i + base}  : `
        : x.indexOf("/" + (options?.paramsStartsWith?.at(0) || ":")) ===
            -1
        ? acc + ((x.at(-1) === "/")
          ? ` s.startsWith("${x}") ? ${(i + base)} : `
          : `  s === "${x}"  ${
            options?.router?.strictTrailingSlash === false
              ? ""
              : `|| s.indexOf("${x.slice(1) + "?"}") === 1`
          } ? ${(i + base)} :  `)
        : acc + parameters(base + i)(map(options)(x)),
    "",
  ) + notFound).trim();
