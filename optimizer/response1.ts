import { funRouterOptions } from "../types.ts";
import { ObjectRawCommonRequest, ObjectRawResponseCommon } from "./types.ts";
import checker from "./checker.ts";
import aComposer from "./aComposer.ts";

export default (o?: funRouterOptions) =>
(f: ObjectRawResponseCommon | ObjectRawCommonRequest) =>
  ((el) =>
    ((c) =>
      "type" in f
        ? (r: Request) => f.f(c(r))
        : f.f.constructor.name === "AsyncFunction"
        ? "status" in f || "header" in f
          ? ((h: ResponseInit) => async (r: Request) =>
            new Response(await f.f(c(r)) as BodyInit, h))(
              (new Function(
                `{${"header" in f ? "header:" + f.header + "," : ""}${
                  "status" in f ? "status:" + f.status + "," : ""
                }}`,
              ))(),
            )
          : async (r: Request) => new Response(await f.f(c(r)) as BodyInit)
        : "status" in f || "header" in f
        ? ((h: ResponseInit) => (r: Request) =>
          new Response(f.f(c(r)) as BodyInit, h))(
            (new Function(
              `{${"header" in f ? "header:" + f.header + "," : ""}${
                "status" in f ? "status:" + f.status + "," : ""
              }}`,
            ))(),
          )
        : (r: Request) => new Response(f.f(c(r)) as BodyInit))(
        aComposer(o)(f as ObjectRawResponseCommon)(el),
      ))(
      checker(f?.delete || [])(["param", "query", "req"])(f?.add || [])(
        f.f.toString(),
      ),
    );
