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


 export type specialOptions = {
  mutable?: true
} & funRouterOptions

export default (o?: specialOptions ) =>
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
                functions.reduce((s, k) =>
                  s(k)
                  ,
                  new Function(` return ${table.map(x => x.type === 1 ? x.name + "=>" : "").join("")} ${ f.resolve &&  checkAsync(f) ?" async r=> ": "r=>"}({${table.map(x => x.name + ":" + x.value).join(",")}})`)()
                )
            )(
              ( o => 
                table.map(
                  x => x.type === 1
                    ? x.name === "param"
                      ? params(o)(f as ObjectRawResponseCommon)
                      : x.name === "query"
                        ? query(o)(f as ObjectRawResponseCommon)
                        : x.name === "sign"
                          ?  "signer" in f 
                              ? signer(f.signer as SignVerifyOptions)
                              :  console.warn(`"sign" is being used without "signer Options", use " delete: ["sign"]`) as unknown ?? ((I:string) => I)
                          : x.name === "verify"
                            ? "verifier" in f 
                                ? verifier(f.verifier as SignVerifyOptions)
                                : console.warn(`"verify" is being used without "verifier Options", use " delete: ["verify]`) as unknown ??  (() => false)
                            : x.name === "jSign"
                              ?  "jSigner" in f
                                  ? jSigner(f.jSigner as SignVerifyOptions)
                                  : console.warn(`"jSign" is being used without "jSigner Options", use " delete: ["jSign]`) as unknown ?? ((I:Record<string,unknown>) => I)
                              : x.name === "jVerify"
                                ? "jVerifier" in f
                                  ? jVerify(f.verifier as SignVerifyOptions)
                                  :  console.warn(`"jSign" is being used without "jSigner Options", use " delete: ["jSign]`) as unknown ?? (() => null)
                                : x.name === "cookie"
                                  ? cookies(f)
                                  : x.name === "resolve"
                                    ? "resolve" in f
                                      ? resolve(o)(f.path)(f.resolve as ResolveOptions)
                                      : console.warn(`"resolve" is being used without "resolve Options", use " delete: ["jSign]`) as unknown ?? (() => null)
                                  : null
                    : null
                ).filter(x => x !== null)
                )(
                  "mutable" in f ? {...o, mutable: true} as funRouterOptions: o
              )
            )
          )(
            (mutable =>
              [
                { name: "req", value: mutable ? "r.r" : "r", type: 0 },
                { name: "param", value: mutable ? "param(r.r.url)" : "param(r.url)", type: 1 },
                { name: "query", value:  mutable ? "query(r.r.url)" : "query(r.url)", type: 1 },
                { name: "date", value: "Date.now()", type: 0 },
                { name: "randomNumber", value: "Math.random()", type: 0 },
                { name: "hash", value: "crypto.randomUUID()", type: 0 },
                { name: "sign", value: "sign", type: 1 },
                { name: "verify", value: "verify", type: 1 },
                { name: 'cookie', value:  mutable ?'cookie(r.r.headers.get("cookie"))' :'cookie(r.headers.get("cookie"))', type: 1 },
                { name: "jSign", value: "jSign", type: 1 },
                { name: "jVerify", value: "jVerify", type: 1 },
                { name: "resolve", value: `${checkAsync(f)? " await resolve(r)": "resolve(r)"}`, type: 1},
                { name: "mutable", value: mutable ? "r.m" : "{}", type: 0}
              ].filter(x => ar.includes(x.name))
            )(
              ("mutable" in f) || ( o && "mutable" in o)
            )
          )
        )

