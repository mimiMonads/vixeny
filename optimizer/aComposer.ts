import params from "./parameters/main.ts";
import query from "./queries/main.ts";
import signer from "../components/tokens/signer.ts";
import verifier from "../components/tokens/verifier.ts";
import { SignVerifyOptions } from "../components/tokens/types.ts";
import { funRouterOptions } from "../types.ts";
import { ObjectRawResponseCommon, RequestArguments } from "./types.ts";



export default (o?: funRouterOptions) =>
  (f: ObjectRawResponseCommon) =>
    (ar: string[]) =>
      ar.length === 0 && !f.signer && f.verifier
        ? ((r: Request) => r) as unknown as (r: Request) => RequestArguments
        : ((el) =>
          (
            endo =>
              f.signer || f.verifier
                ? f.verifier && f.signer
                  ? (
                    (sign) =>
                      (
                        (verify) =>
                          endo(sign)(verify) as (r: Request) => RequestArguments
                      )(
                        verifier(f.verifier as SignVerifyOptions),
                      )
                  )(
                    signer(f.signer),
                  )
                  : f.verifier
                    ? (
                      (verify) => endo(verify) as (r: Request) => RequestArguments
                    )(
                      verifier(f.verifier),
                    )
                    : f.signer
                      ? (
                        (sign) => endo(sign) as (r: Request) => RequestArguments
                      )(
                        signer(f!.signer),
                      )
                      : endo as (r: Request) => RequestArguments
                : endo as (r: Request) => RequestArguments
          )
            (
              (
                new Function(
                  `return ${(f.signer !== undefined
                    ? "sign=>"
                    : "")}${(f.verifier !== undefined ? "verify=>" : "")} ${el.reduce(
                      (acc, y) =>
                        (y.type == 1 && ar.includes(y.name))
                          ? "(" + y.name + "=>" + acc + ")(" + y.f(o)(f) +
                          ")"
                          : acc,
                      `r=>({${el.reduce(
                        (acc, v) =>
                          ar.includes(v.name)
                            ? (v.type === 0)
                              ? acc + `${v.name}:r,`
                              : acc + `${v.name}:${v.name}(r.url),`
                            : acc,
                        (f.signer !== undefined ? "sign:sign," : "") +
                        (f.verifier !== undefined ? "verify:verify," : ""),
                      )
                      }})`,
                    )
                  }`,
                )
              )(),
            ))(
              [{ name: "req", type: 0, f: query }, {
                name: "query",
                type: 1,
                f: query,
              }, { name: "param", type: 1, f: params }],
            );
