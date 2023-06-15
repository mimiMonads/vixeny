import { funRouterOptions } from "../types.ts";
import { ObjectRawCommonRequest, ObjectRawResponseCommon } from "./types.ts";
import checker from "./checker.ts";
import aComposer from "./aComposer.ts";
import mime from "../components/util/mime.ts";
import jsonComposer from "../components/stringify/main.ts";

export default (o?: funRouterOptions) =>
  (f: ObjectRawResponseCommon | ObjectRawCommonRequest) =>
    ((el) =>
      ((c) =>
        "type" in f
          ? (r: Request) => f.f((c)(r))
          : f.f.constructor.name === "AsyncFunction" || "signer" in f
            ? "status" in f || "headers" in f
              ? ((h: ResponseInit) =>
                "json" in f
                  ? (
                    (j) =>
                      async (r: Request) =>
                        new Response(
                          j(await f.f((c)(r))) as BodyInit,
                          h,
                        )
                  )(
                    jsonComposer(f.json.scheme),
                  )
                  : async (r: Request) =>
                    new Response(
                      await (f.f((c)(r))) as BodyInit,
                      h,
                    ))(
                      {
                        headers:
                          typeof f.headers === "string"
                            ? {
                              "Content-Type": mime.find((x) => x[0] === f.headers)![1],
                            }
                            : f.headers ? Object.entries({...f.headers}) : { "Content-Type": "text/plain" },

                        status: "status" in f ? f.status : 200,
                      },
                    )
              : "json" in f
                ? (
                  (j) =>
                    async (r: Request) =>
                      new Response(
                        j(await f.f((c)(r))) as BodyInit,
                      )
                )(
                  jsonComposer(f.json.scheme),
                )
                : async (r: Request) =>
                  new Response(
                    await (f.f((c)(r))) as BodyInit,
                  )
            : "status" in f || "headers" in f
              ? ((h: ResponseInit) =>
                "json" in f
                  ? (
                    (j) =>
                      (r: Request) =>
                        new Response(j(f.f((c)(r))) as BodyInit, h)
                  )(
                    jsonComposer(f.json.scheme),
                  )
                  : (r: Request) =>
                    new Response(f.f((c)(r)) as BodyInit, h))({
                      headers:
                        typeof f.headers === "string"
                          ? {
                            "Content-Type": mime.find((x) => x[0] === f.headers)![1],
                          }
                          : f.headers ? Object.entries({...f.headers}) : { "Content-Type": "text/plain" },
                      status: "status" in f ? f.status : 200,
                    })
              : "json" in f
                ? (
                  (j) =>
                    (r: Request) =>
                      new Response(j(f.f((c)(r))) as BodyInit)
                )(
                  jsonComposer(f.json.scheme),
                )
                : (r: Request) => new Response(f.f((c)(r)) as BodyInit))(
                  aComposer(o)(f as ObjectRawResponseCommon)(el),
                ))(
                  checker(f?.delete || [])(["param", "query", "req"])(f?.add || [])(
                    f.f.toString(),
                  ),
                );
