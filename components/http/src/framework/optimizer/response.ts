import { FunRouterOptions } from "../../../types.ts";
import { CommonRequestMorphism, RequestMorphism } from "./types.ts";
import checkAsync from "./recursiveCheckAsync.ts";
import aComposer from "./aComposer.ts";
import mime from "../../util/mime.ts";
import isUsing from "./tools/isUsing.ts";

export default (o?: FunRouterOptions) =>
(f: CommonRequestMorphism | RequestMorphism) =>
  ((elementsUsed) =>
    (
      (table) =>
        ((composition) =>
          (table.headers && table.json)
            ? composition(table.json)(table.headers)(f.f)(
              aComposer(o)(f)(elementsUsed),
            )
            : table.headers
            ? composition(table.headers)(f.f)(
              aComposer(o)(f)(elementsUsed),
            )
            : table.json
            ? composition(table.json)(f.f)(
              aComposer(o)(f)(elementsUsed),
            )
            : composition(f.f)(
              aComposer(o)(f)(elementsUsed),
            ))(
            "type" in f
              ? new Function(`
      return f=>c=>${table.async || table.asyncResolve ? "async " : ""}r=>${
                table.async || table.asyncResolve ? "await f" : "f"
              }(${table.asyncResolve ? "await c" : "c"}(${
                "mutable" in f ? "[r,{res: new Response()}]" : "r"
              }))`)()
              : new Function(
                `return ${table.headers ? "h=>" : ""}${
                  table.async ? "f=>" : "f=>"
                }${table.asyncResolve ? "c=>" : "c=>"}${
                  table.async || table.asyncResolve ? "async " : ""
                }r=> new Response(${
                  table.async || table.asyncResolve ? "await f" : "f"
                }(${table.asyncResolve ? "await c" : "c"}(${
                  "mutable" in f ? "[r,{res: new Response()}]" : "r"
                }))${table.headers ? ",h" : ""})`,
              )(),
          )
    )(
      {
        async: f.f.constructor.name === "AsyncFunction" ||
          (
            o && o.cyclePlugin && Object.keys(o.cyclePlugin || {})
              .some((x) =>
                elementsUsed.includes(x)
                  //@ts-ignore
                  ? "isAsync" in o.cyclePlugin[x] && o.cyclePlugin[x] === true
                  : false
              )
          ),
        asyncResolve: checkAsync(f) ||
          (
            o && o.cyclePlugin && Object.keys(o.cyclePlugin || {})
              .some((x) =>
                elementsUsed.includes(x)
                  //@ts-ignore
                  ? "isAsync" in o.cyclePlugin[x] && o.cyclePlugin[x] === true
                  : false
              )
          ),
        headers: "headings" in f
          ? typeof f.headings?.headers == "string"
            ? {
              ...f.headings,
              headers: {
                "Content-Type":
                  mime.find((x) => x[0] === f.headings?.headers)![1],
              },
            }
            : { ...f.headings }
          : null,
        json: "json" in f
          ? null //jsonComposer({ type: "safe" })(f.json.scheme)
          : null,
      },
    ))(
      isUsing(o)(f),
    );
