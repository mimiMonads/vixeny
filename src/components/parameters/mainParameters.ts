import type { Petition } from "../../morphism.ts";
import type { FunRouterOptions } from "../../options.ts";
import composeMultiParameters from "./composeMultiParameters.ts";
import map from "./map.ts";
import onlyOneParser from "./onlyOneParser.ts";
import uniqueParser from "./uniqueParser.ts";

type Parameters = (
  options?: FunRouterOptions<any>,
) => (p: Petition) => (url: string) => string | Record<string, string> | null;

//TODO
const f = ((options?: FunRouterOptions<any>) => (p: Petition) =>
  (
    (map) =>
      p?.param?.unique === true
        ? uniqueParser(options)(map)
        : map.elements.length === 1
        ? onlyOneParser(options)(map)
        : map.elements.length > 1
        ? composeMultiParameters(options)(map)
        : () => null
  )(
    map(options)(p),
  )) as Parameters;

const isUsing = (options?: FunRouterOptions<any>) => (p: Petition) =>
  p.param?.unique === true
    ? "unique"
    : "[" + [map(options)(p).elements.toString()].map((x) =>
      x.slice(1)
    ).toString() + "]";

export { f, isUsing };
