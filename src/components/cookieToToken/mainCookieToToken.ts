import type { FunRouterOptions } from "../../options.ts";
import type { Petition, SupportedKeys } from "../../morphism.ts";
import cookieToTokenBodyParser from "./cookieToTokenBodyParser.ts";
import cookieToTokenGets from "./cookieToTokenGets.ts";
import { plugins } from "../../../main.ts";

export const f = (o?: FunRouterOptions<any>) => (p: Petition) =>
  p.crypto && "globalKey" in p.crypto
    ? (
      (getCookies) =>
        "token" in p.crypto
          ? ((s: SupportedKeys) => (arr: string[]) =>
            arr.reduce(
              (acc, x) => acc(cookieToTokenGets(s)(x)),
              cookieToTokenBodyParser(arr),
            ))(p.crypto.globalKey)(
              //@ts-ignore
              Object.keys(p.crypto.token),
            )
          : getCookies && getCookies.length > 0
          ? ((s: SupportedKeys) => (arr: string[]) =>
            arr.reduce(
              (acc, x) => acc(cookieToTokenGets(s)(x)),
              cookieToTokenBodyParser(arr),
            ))(p.crypto.globalKey)(
              getCookies,
            )
          : void console.error("No token found, please use 'token' ") ??
            (() => null)
    )(
      plugins.pluginIsUsing(p)("token"),
    )
    : () => null;

export const isUsing = (o?: FunRouterOptions<any>) => (p: Petition): string =>
  (
    (uses) =>
      uses && uses.length > 0 ? `[` + uses.map((x) => x + "?") + "]" : "null"
  )(
    plugins.pluginIsUsing(p)("token"),
  );
