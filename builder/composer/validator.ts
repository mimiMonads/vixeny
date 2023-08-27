import { funRouterOptions } from "../../types.ts";
import map from "./map.ts";
import parameters from "./parameters.ts";

export default (options?: funRouterOptions) =>
  (base: number) =>
    (notFound: number) =>
      (ar: string[]) =>
        (ar.reduce(
          (acc, x, i) =>
            x === "/"
              ? acc + ` s === "/" ? ${i + base}  : `
              : x.indexOf("/" + (options?.paramsStartsWith?.at(0) || ":")) ===
                -1
                ? acc + ((x.at(-1) === "/" )
                  ? ` s.indexOf("${x.slice(1)}") === 1 ? ${(i + base)} : `
                  : `  s === "${x}" || s.indexOf("${x.slice(1) + "?" }") === 1 ? ${(i + base)} :  `)
                : acc + parameters(base + i)(map(options)(x)),
          "",
        ) + notFound).trim();
// `(s.length > ${x.length - 1 } &&  s.indexOf("${x.slice(1) + "?" }") === 1  || s.indexOf("${x.slice(1)}") === 1 ? ${(i + base)} :  `