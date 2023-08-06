import params from "../components/parameters/main.ts";
import query from "../components/queries/main.ts";
import cookies from '../components/cookies/main.ts'
import signer from "../components/tokens/signer.ts";
import verifier from "../components/tokens/verifier.ts";
import jVerify from "../components/tokens/jVerify.ts";
import jSigner from "../components/tokens/jSigner.ts";
import resolve from "./resolve/main.ts"
import checkAsync from "./recursiveCheckAsync.ts";
import { SignVerifyOptions } from "../components/tokens/types.ts";
import { funRouterOptions } from "../types.ts";
import { ObjectRawResponseCommon, RequestArguments } from "./types.ts";
import { ResolveOptions } from "./resolve/types.ts";



export default (o?: funRouterOptions) =>
  (f: ObjectRawResponseCommon) =>
    (ar: string[]) =>
      ar.length === 0
        ? ((r: Request) => r) as unknown as (r: Request) => RequestArguments
        : (
          el => el
        )(
          (
            table => (
              functions =>
                functions.reduce((a, k) =>
                  a(k)
                  ,
                  new Function(` return ${table.map(x => x.type === 1 ? x.name + "=>" : "").join("")} ${ f.resolve &&  checkAsync(f) ?" async r=> ": "r=>"}({${table.map(x => x.name + ":" + x.value).join(",")}})`)()
                )
            )(
              table.map(
                x => x.type === 1
                  ? x.name === "param"
                    ? params(o)(f as ObjectRawResponseCommon)
                    : x.name === "query"
                      ? query(o)(f as ObjectRawResponseCommon)
                      : x.name === "sign"
                        ? signer(f.signer as SignVerifyOptions)
                        : x.name === "verify"
                          ? verifier(f.verifier as SignVerifyOptions)
                          : x.name === "jSigner"
                            ? jSigner(f.jSigner as SignVerifyOptions)
                            : x.name === "jVerify"
                              ? jVerify(f.verifier as SignVerifyOptions)
                              : x.name === "cookie"
                                ? cookies(f)
                                : x.name === "resolve"
                                  ? resolve(o)(f.path)(f.resolve as ResolveOptions)
                                  : null

                  : null
              ).filter(x => x !== null)
            )
          )(
            [
              { name: "req", value: "r", type: 0 },
              { name: "param", value: "param(r.url)", type: 1 },
              { name: "query", value: "query(r.url)", type: 1 },
              { name: "date", value: "Date.now()", type: 0 },
              { name: "randomNumber", value: "Math.random()", type: 0 },
              { name: "hash", value: "crypto.randomUUID()", type: 0 },
              { name: "sign", value: "sign", type: 1 },
              { name: "verify", value: "verify", type: 1 },
              { name: 'cookie', value: 'cookie(r.headers.get("cookie"))', type: 1 },
              { name: "jSign", value: "jSign", type: 1 },
              { name: "jVerify", value: "jVerify", type: 1 },
              { name: "resolve", value: `${checkAsync(f)?" await resolve(r) ": "resolve(r)"}`, type: 1}
            ].filter(x => ar.includes(x.name))
          )
        )

