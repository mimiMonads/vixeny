import { plugins } from "../../../main.ts";
import type { Petition } from "../../morphism.ts";
import type { FunRouterOptions } from "../../options.ts";
import { body } from "./cookieBodyParser.ts";
export default (o?: FunRouterOptions<any>) => (p: Petition) =>
  (
    (cookies) => cookies ? body(cookies) : () => null
  )(
    plugins.pluginIsUsing(p)("cookies"),
  );
