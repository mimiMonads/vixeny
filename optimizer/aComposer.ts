import params from "./parameters/main.ts";
import query from "./queries/main.ts";
import signer from "../components/signer/signer.ts";
import verifier from "../components/signer/verifier.ts";
import { funRouterOptions } from "../types.ts";
import { ObjectRawResponseCommon, RequestArguments } from "./types.ts";
import { SignVerifyOptions } from "../components/signer/types.ts";

export default (o?: funRouterOptions) =>
  (f: ObjectRawResponseCommon) =>
    (ar: string[]) =>
      ((el) =>
        (
          async (endo) =>
            f.signer || f.verifier
              ? f.verifier && f.signer
                ? (
                  async (sign) =>
                    (
                      (verify) =>
                        endo(sign)(verify) as (r: Request) => RequestArguments
                    )(
                      await verifier(f.verifier as SignVerifyOptions),
                    )
                )(
                  await signer(f.signer),
                )
                : f.verifier
                ? (
                  (verify) => endo(verify) as (r: Request) => RequestArguments
                )(
                  await verifier(f.verifier),
                )
                : f.signer
                ? (
                  (sign) => endo(sign) as (r: Request) => RequestArguments
                )(
                  await signer(f!.signer),
                )
                : endo as (r: Request) => RequestArguments
              : endo as (r: Request) => RequestArguments
        )(
          (
            new Function(
              `return ${(f.signer !== undefined
                ? "sign=>"
                : "")}${(f.verifier !== undefined ? "verify=>" : "")} ${
                el.reduce(
                  (acc, y) =>
                    (y.type == 1 && ar.includes(y.name))
                      ? "(" + y.name + "=>" + acc + ")(" + y.f(o)(f) +
                        ")"
                      : acc,
                  `r=>({${
                    el.reduce(
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
