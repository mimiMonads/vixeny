import type { FunRouterOptions } from "../../options.ts";
import type { Petition, SupportedKeys } from "../../morphism.ts";
import cookieToTokenBodyParser from "./cookieToTokenBodyParser.ts";
import cookieToTokenGets from "./cookieToTokenGets.ts";
import cookieToTokenFilter from "./cookieToTokenFilter.ts";

export default (o?: FunRouterOptions) => (f: Petition) =>
  f.crypto && "globalKey" in f.crypto
    ? (
      (getCookies) =>
        "token" in f.crypto
          ? ((s: SupportedKeys) => (arr: string[]) =>
            arr.reduce(
              (acc, x) => acc(cookieToTokenGets(s)(x)),
              cookieToTokenBodyParser(arr),
            ))(f.crypto.globalKey)(
              //@ts-ignore
              Object.keys(f.crypto.token),
            )
          : getCookies.length > 0
          ? ((s: SupportedKeys) => (arr: string[]) =>
            arr.reduce(
              (acc, x) => acc(cookieToTokenGets(s)(x)),
              cookieToTokenBodyParser(arr),
            ))(f.crypto.globalKey)(
              getCookies,
            )
          : void console.error("No token found, please use 'token' ") ??
            (() => null)
    )(
      cookieToTokenFilter(
        f.f.toString()
          .split(" "),
      )("token"),
    )
    : () => ({ SystemError: "Crypto is requieres" });
