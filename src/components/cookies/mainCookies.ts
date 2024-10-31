import plugins from "../../exportable/plugin.ts";
import type { Petition } from "../../morphism.ts";
import type { FunRouterOptions } from "../../options.ts";
import { body } from "./cookieBodyParser.ts";
import cookieDefaultCase from "./cookieDefaultCase.ts";

type Cookie = (string: string | null) => Record<string, string | undefined>;

/**
 * Native vixeny implementation
 * @param o
 * @returns
 */
const f = (o?: FunRouterOptions<any>) =>
/**
 * // TODO: add useful info here
 *
 * @param p
 * @returns
 */
(p: Petition): Cookie =>
  (
    (cookies) =>
      cookies && cookies.length > 0
        ? body(p.cookie?.only ?? cookies) as Cookie
        : cookieDefaultCase() as Cookie
  )(
    plugins.pluginIsUsing(p)("cookie"),
  );

const isUsing = (o?: FunRouterOptions<any>) => (p: Petition): string =>
  (
    (uses) =>
      p.cookie?.only
        ? `[` + p.cookie?.only.map((x) => x + "?").toString() + "]"
        : uses && uses.length > 0
        ? `[` + uses.map((x) => x + "?") + "]"
        : `Record<string, string|null> | null`
  )(
    plugins.pluginIsUsing(p)("cookie"),
  );

export { f, isUsing };
