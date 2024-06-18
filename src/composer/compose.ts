import type { FunRouterOptions } from "../options.ts";
import type { Petition } from "../morphism.ts";
import { parse, stringToFunction } from "../components/cors/mainCORS.ts";
import tools from "./composerTools.ts";
import linker from "./linker.ts";
import mime from "../util/mime.ts";

export default (o?: FunRouterOptions<any>) =>
(p: Petition): (ctx: Request) => Promise<Response> | Response =>
  ((elementsUsed) =>
    (
      (table) =>
        ((composition) =>
          table.headers
            ? composition(table.headers)(p.f)(
              linker(o)(p)(elementsUsed),
            )
            : composition(p.f)(
              linker(o)(p)(elementsUsed),
            ))(
            p.type === "request" || p.type === "morphism" ||
              typeof p.type === "undefined"
              ? new Function(`
      return ${table.headers ? "h=>" : ""}f=>c=>${
                table.async || table.asyncResolve ? "async " : ""
              }r=>${table.async || table.asyncResolve ? "await f" : "f"}(${
                table.asyncResolve ? "await c" : "c"
              }(${"mutable" in p ? "[r,{res: {}}]" : "r"}))`)()
              : new Function(
                `return ${table.headers ? "h=>" : ""}${
                  table.async ? "f=>" : "f=>"
                }${table.asyncResolve ? "c=>" : "c=>"}${
                  table.async || table.asyncResolve ? "async " : ""
                }r=> new Response(${
                  table.async || table.asyncResolve ? "await f" : "f"
                }(${table.asyncResolve ? "await c" : "c"}(${
                  "mutable" in p ? "[r,{res: {}}]" : "r"
                }))${table.headers ? ",h" : ""})`,
              )(),
          )
    )(
      //elements int table
      {
        async: tools.localAsync(o)(p)(elementsUsed),
        asyncResolve: tools.recursiveCheckAsync(p) 
        // ||
        //   (
        //     o && o.cyclePlugin && Object.keys(o.cyclePlugin || {})
        //       .some((x) =>
        //         elementsUsed.includes(x)
        //           //@ts-ignore
        //           ? "isAsync" in o.cyclePlugin[x] &&
        //             o.cyclePlugin[x].isAsync === true
        //           : false
        //       )
        //   )
          ,
        headers: "headings" in p
          ? typeof p.headings?.headers == "string"
            ? {
              ...p.headings,
              headers: {
                "Content-Type": mime.find((x) =>
                  x[0] === p.headings?.headers
                )![1],
                ...(o && o.cors ? stringToFunction(parse()(o.cors))() : {}),
              },
            }
            : {
              ...p.headings,
              ...(o && o.cors ? stringToFunction(parse()(o.cors))() : {}),
            }
          : null,
      },
    ))(
      tools.isUsing(o)(p),
    );


