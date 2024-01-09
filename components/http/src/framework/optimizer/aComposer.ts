import params from "../../parameters/main.ts";

import query from "../../queries/main.ts";

import cookies from "../../cookies/main.ts";

import signer from "../tokens/signer.ts";
import verifier from "../tokens/verifier.ts";
import jVerify from "../tokens/jVerify.ts";
import jSigner from "../tokens/jSigner.ts";
import resolve from "./resolve/main.ts";
import checkAsync from "./recursiveCheckAsync.ts";
import branch from "./branch/main.ts";
import { SignVerifyOptions } from "../tokens/types.ts";
import { FunRouterOptions } from "../../../types.ts";
import { CommonRequestMorphism, RequestMorphism} from "./types.ts";
import { BranchOptions } from "./branch/types.ts";

export type specialOptions = {
  mutable?: true;
  branch?: boolean;
} & FunRouterOptions;

export default (o?: specialOptions) =>
(f: CommonRequestMorphism  | RequestMorphism) =>
(ar: string[]) =>
  ar.length === 0 && !(o && "branch" in o)
    ? ((r: Request) => r) 
    : (
      (el) => el
    )(
      (
        (table) =>
          (
            (functions) =>
              functions.reduce(
                (s, k) => s(k),
                new Function(
                  ` return ${
                    table.map((x) => x.type === 1 ? x.name + "=>" : "").join("")
                  } ${
                    f.resolve && checkAsync(f)
                      ? o && "branch" in o ? " r=>async b=> " : " async r=> "
                      : o && "branch" in o
                      ? "r=>b=>"
                      : "r=>"
                  }({${table.map((x) => x.name + ":" + x.value).join(",")}})`,
                )(),
              )
          )(
            ((o) =>
              table.map(
                (x) =>
                  x.type === 1
                    ? x.name === "param"
                      ? params(o)(f)
                      : x.name === "query"
                      ? query(o)(f)
                      : x.name === "sign"
                      ? "signer" in f
                        ? signer(f.signer as SignVerifyOptions)
                        : console.warn(
                          `"sign" is being used without "signer Options", use " delete: ["sign"]`,
                        ) as unknown ?? ((I: string) => I)
                      : x.name === "verify"
                      ? "verifier" in f
                        ? verifier(f.verifier as SignVerifyOptions)
                        : console.warn(
                          `"verify" is being used without "verifier Options", use " delete: ["verify"]`,
                        ) as unknown ?? (() => false)
                      : x.name === "jSign"
                      ? "jSigner" in f
                        ? jSigner(f.jSigner as SignVerifyOptions)
                        : console.warn(
                          `"jSign" is being used without "jSigner Options", use " delete: ["jSign"]`,
                        ) as unknown ?? ((I: Record<string, unknown>) => I)
                      : x.name === "jVerify"
                      ? "jVerifier" in f
                        ? jVerify(f.jVerifier as SignVerifyOptions)
                        : console.warn(
                          `"jVerify" is being used without "jVerify Options", use " delete: ["jVerifier"]`,
                        ) as unknown ?? (() => null)
                      : x.name === "cookie"
                      ? cookies(f)
                      : x.name === "resolve"
                      ? "resolve" in f && f.resolve
                        ? resolve(o)(f.path)(f.resolve)
                        : console.warn(
                          `"resolve" is being used without "resolve Options", use " delete: ["resolve"]`,
                        ) as unknown ?? (() => null)
                      : x.name === "branch"
                      ? "branch" in f && f.branch
                        ? branch({ ...o, branch: true })(f.path)(
                          f.branch ,
                        ) as unknown as null
                        : console.warn(
                          `"branch" is being used without "branch Options", use " delete: ["branch"]`,
                        ) as unknown ?? (() => null)
                      : null
                    : null,
              ).filter((x) => x !== null))(
                "mutable" in f
                  ? { ...o, mutable: true } as FunRouterOptions
                  : o,
              ),
          )
      )(
        ((mutable) =>
          [
            { name: "req", value: mutable ? "r.r" : "r", type: 0 },
            {
              name: "param",
              value: mutable ? "param(r.r.url)" : "param(r.url)",
              type: 1,
            },
            {
              name: "query",
              value: mutable ? "query(r.r.url)" : "query(r.url)",
              type: 1,
            },
            {
              name: "date",
              value: f.options?.setDate ? f.options.setDate : "Date.now()",
              type: 0,
            },
            {
              name: "randomNumber",
              value: f.options?.setRandomNumber
                ? f.options.setRandomNumber
                : "Math.random()",
              type: 0,
            },
            {
              name: "hash",
              value: f.options?.setHash
                ? f.options.setHash
                : "crypto.randomUUID()",
              type: 0,
            },
            { name: "sign", value: "sign", type: 1 },
            { name: "verify", value: "verify", type: 1 },
            {
              name: "cookie",
              value: mutable
                ? 'cookie(r.r.headers.get("cookie"))'
                : 'cookie(r.headers.get("cookie"))',
              type: 1,
            },
            { name: "jSign", value: "jSign", type: 1 },
            { name: "jVerify", value: "jVerify", type: 1 },
            {
              name: "resolve",
              value: `${checkAsync(f) ? " await resolve(r)" : "resolve(r)"}`,
              type: 1,
            },
            { name: "mutable", value: mutable ? "r.m" : "{}", type: 0 },
            {
              name: "branch",
              value: `${checkAsync(f) ? " await branch(r)" : "branch(r)"}`,
              type: 1,
            },
            {
              name: "arguments",
              value: o && "branch" in o ? "b" : null,
              type: 0,
            },
          ].filter((x) => ar.includes(x.name)))(
            ("mutable" in f) || (o && "mutable" in o),
          ),
      ),
    );
