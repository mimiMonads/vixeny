import params from "../components/parameters/main.ts";
import query from "../components/queries/main.ts";
import cookies from "../components/cookies/main.ts";
import resolve from "./resolve/main.ts";
import branch from "./branch/main.ts";
import cookieToTokenMain from "../components/cookieToToken/cookieToTokenMain.ts";
// import signSha256 from "../../../../jwt/signSha256.mjs";
// import verifySha256 from "../../../../jwt/verifySha256.mjs";
import { parse, stringToFunction } from "../components/cors/mainCORS.ts";

import type { FunRouterOptions } from "../options.ts";
import type {
  Petition
} from "../morphism.ts";

import tools from "./composerTools.ts";

type NativeMaps = {
  name: string;
  value: string | number | null;
  type: number;
};

export default (o?: FunRouterOptions) =>
(f: Petition) =>
(native: NativeMaps[]) =>
  ((list) =>
    native.map((x) =>
      x.type === 1 ? list.find((y) => y.condition(x)) || null : null
    ).filter((x) => x !== null).map((x) => x!.action()))([
      {
        condition: (x: NativeMaps) => x.name === "param",
        action: () => params(o)(f),
      },
      {
        condition: (x: NativeMaps) => x.name === "query",
        action: () => query(o)(f),
      },
    //   {
    //     condition: (x: NativeMaps) => x.name === "verify",
    //     action: () =>
    //       f.crypto && "globalKey" in f.crypto
    //         ? verifySha256()(parsingToHexa(f.crypto as { globalKey: string }))
    //         : void console.error(
    //           "I don't know you got this message, contact me in discord," +
    //             " also verify will always return `false` ",
    //         ) ?? ((_: any) => false),
    //   },
    //   {
    //     condition: (x: NativeMaps) => x.name === "sign",
    //     action: () =>
    //       f.crypto && "globalKey" in f.crypto
    //         ? signSha256()(parsingToHexa(f.crypto as { globalKey: string }))
    //         : void console.error(
    //           "I don't know you got this message, contact me in discord," +
    //             " also sign will always return '' ",
    //         ) ?? ((_: any) => ""),
    //   },
      {
        condition: (x: NativeMaps) => x.name === "token",
        action: () =>
          cookieToTokenMain(o)({
            ...f,
            crypto: {
              ...f.crypto,
              globalKey: tools.parsingToHexa(f.crypto as { globalKey: string }),
            },
          }),
      },
      {
        condition: (x: NativeMaps) => x.name === "cookie",
        action: () => cookies(f),
      },
      {
        condition: (x: NativeMaps) => x.name === "headers",
        action: () => stringToFunction(parse()(o?.cors ?? {})),
      },
      {
        condition: (x: NativeMaps) => x.name === "resolve",
        action: () =>
          ("resolve" in f)
            ? resolve(o)(f.path as string)(f.resolve)
            : null,
      },
      {
        condition: (x: NativeMaps) => x.name === "branch",
        action: () =>
          ("branch" in f)
            ? branch({ ...o, branch: true })(f.path)(
              f!.branch,
            )
            : null,
      },
    ]
      .concat(
        Object.keys(o?.cyclePlugin || {}).map((x) => ({
          condition: ((name) => (x: NativeMaps) => x.name === name)(x),
          //@ts-ignore
          action: () => o!.cyclePlugin![x]!["f"](o)(f as CommonRequestMorphism),
        })),
      ));
