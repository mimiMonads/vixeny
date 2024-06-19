import { plugins } from "../../../main.ts";
import type { Petition } from "../../morphism.ts";
import type { FunRouterOptions } from "../../options.ts";
import { body } from "./cookieBodyParser.ts";
import cookieDefaultCase from "./cookieDefaultCase.ts";
export const f = (o?: FunRouterOptions<any>) => (p: Petition) =>
  (
    (cookies) => cookies ? body(p.cookie?.only ?? cookies) : cookieDefaultCase()
  )(
    plugins.pluginIsUsing(p)("cookies"),
  );

export const isUsing = (o?: FunRouterOptions<any>) => (p: Petition): string =>
  (
    (uses) =>
      p.cookie?.only
        ? p.cookie?.only.toString()
        : uses && uses.length > 0
        ? `[` + uses.map((x) => x + "?") + "]"
        : `Record<string, string|null> | null`
  )(
    plugins.pluginIsUsing(p)("cookies"),
  );
