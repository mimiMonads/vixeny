import type { Petition } from "../../morphism.ts";
import type { FunRouterOptions } from "../../options.ts";
import map from "./map.ts";
import onlyOneParser from "./onlyOneParser.ts";
import uniqueParser from "./uniqueParser.ts";

//TODO
export default (options?: FunRouterOptions<any>) => (p: Petition) =>
  (
    (map) =>
       p?.param?.unique === true
        ? uniqueParser(map)
        : map.elements.length === 1
        ? onlyOneParser(map)
        : () => null as unknown as (key: string) => string
  )(
    map(options)(p),
  );
