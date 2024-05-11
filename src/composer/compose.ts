import type { FunRouterOptions } from "../options.ts";
import type { Petition } from "../morphism.ts";
import { parse, stringToFunction } from "../components/cors/mainCORS.ts";
import tools from "./composerTools.ts";
import linker from "./linker.ts";
import mime from "../util/mime.ts";

export default (o?: FunRouterOptions) =>
(f: Petition): (ctx: Request) => Promise<Response> | Response =>
  ((elementsUsed) =>
    (
      (table) =>
        ((composition) =>
          (table.headers && table.json && f.type !== "request")
            ? composition(table.json)(table.headers)(f.f)(
              linker(o)(f)(elementsUsed),
            )
            : table.headers
            ? composition(table.headers)(f.f)(
              linker(o)(f)(elementsUsed),
            )
            : table.json
            ? composition(table.json)(f.f)(
              linker(o)(f)(elementsUsed),
            )
            : composition(f.f)(
              linker(o)(f)(elementsUsed),
            ))(
            f.type === "request"
              ? new Function(`
      return ${table.headers ? "h=>" : ""}f=>c=>${
                table.async || table.asyncResolve ? "async " : ""
              }r=>${table.async || table.asyncResolve ? "await f" : "f"}(${
                table.asyncResolve ? "await c" : "c"
              }(${"mutable" in f ? "[r,{res: new Response()}]" : "r"}))`)()
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
      //elements int table
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
        asyncResolve: tools.recursiveCheckAsync(f) ||
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
                "Content-Type": mime.find((x) =>
                  x[0] === f.headings?.headers
                )![1],
                ...(o && o.cors ? stringToFunction(parse()(o.cors))() : {}),
              },
            }
            : {
              ...f.headings,
              ...(o && o.cors ? stringToFunction(parse()(o.cors))() : {}),
            }
          : null,
        json: "json" in f
          ? null //jsonComposer({ type: "safe" })(f.json.scheme)
          : null,
      },
    ))(
      tools.isUsing(o)(f)(tools.elements),
    );
