import { f as params } from "../components/parameters/mainParameters.ts";
import { f as query } from "../components/queries/mainQueries.ts";
import { f as cookies } from "../components/cookies/mainCookies.ts";
import resolve from "./resolve/main.ts";
import branch from "./branch/branchMain.ts";
import { f as mainCookieToToken } from "../components/cookieToToken/mainCookieToToken.ts";
import signSha256 from "../components/jwt/signSha256.ts";
import verifySha256 from "../components/jwt/verifySha256.ts";
import mainIO from "../components/io/mainIO.ts";
import { parse, stringToFunction } from "../components/cors/mainCORS.ts";

import type { FunRouterOptions } from "../options.ts";
import type { Petition } from "../morphism.ts";

import tools from "./composerTools.ts";
import mime from "../util/mime.ts";
import { pluginCTX } from "../exportable/plugin.ts";

type NativeMaps = {
  name: string;
  value: string | number | null;
  type: number;
};

export default (o?: FunRouterOptions<any>) =>
(p: Petition) =>
(native: NativeMaps[]) =>
  (async (list) =>
    await Promise.all(
      native.map((x) =>
        x.type === 1 ? list.find((y) => y.condition(x)) || null : null
      ).filter((x) => x !== null).map(async (x) => await x!.action()),
    ))([
      {
        condition: (x: NativeMaps) => x.name === "param",
        action: () => params(o)(p),
      },
      {
        condition: (x: NativeMaps) => x.name === "io",
        action: () => mainIO(o)(p),
      },
      {
        condition: (x: NativeMaps) => x.name === "query",
        action: () => query(o)(p),
      },
      {
        condition: (x: NativeMaps) => x.name === "verify",
        action: () =>
          p.crypto && "globalKey" in p.crypto
            ? verifySha256()(
              tools.parsingToHexa(p.crypto.globalKey),
            )
            : ((_: any) => false),
      },
      {
        condition: (x: NativeMaps) => x.name === "sign",
        action: () =>
          p.crypto && "globalKey" in p.crypto
            ? signSha256()(
              tools.parsingToHexa(p.crypto.globalKey),
            )
            : ((_: any) => ""),
      },
      {
        condition: (x: NativeMaps) => x.name === "token",
        action: () =>
          mainCookieToToken(o)({
            ...p,
            crypto: {
              ...p.crypto,
              globalKey: tools.parsingToHexa(p.crypto.globalKey),
            },
          }),
      },
      {
        condition: (x: NativeMaps) => x.name === "cookie",
        action: () => cookies(o)(p),
      },
      {
        condition: (x: NativeMaps) => x.name === "headers",
        action: () => stringToFunction(joinHeaders(o)(p)),
      },
      {
        condition: (x: NativeMaps) => x.name === "resolve",
        action: async () =>
          ("resolve" in p)
            ? await resolve(o)(p.path as string)(p.resolve)
            : null,
      },
      {
        condition: (x: NativeMaps) => x.name === "branch",
        action: () =>
          ("branch" in p)
            ? branch({ ...o, branch: true })(p.path)(
              p!.branch,
            )
            : null,
      },
    ]
      .concat(
        Object.keys(o?.cyclePlugin || {}).map((x) => ({
          condition: ((name) => (x: NativeMaps) => x.name === name)(x),

          action: () => o!.cyclePlugin![x]!["f"](pluginCTX(o)(p)),
        })),
      ));

const maybeOfArray = (arr?: [string, string]) => arr ? arr[1] : "text/html";

const joinHeaders = (o?: FunRouterOptions<any>) => (p: Petition) => {
  const fromPetition = typeof p.headings === "object"
    ? typeof p.headings?.headers == "string"
      ? {
        "Content-Type": maybeOfArray(
          mime.find((x) => x[0] === p.headings?.headers),
        ),
      }
      : p.headings.headers
    : {};

  const fromCORS = typeof o?.cors === "object"
    ? stringToFunction(parse()(o.cors))()
    : {};

  return {
    ...fromCORS,
    ...fromPetition,
  };
};
