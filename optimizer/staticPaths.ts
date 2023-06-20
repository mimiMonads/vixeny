import { RouteTypes } from "../builder/types.ts";

export default (mine: [string, string][]) =>
  (arr: string[]) =>
    (name: string) =>
      (path: string) =>
        arr.map(
          (x) =>
            (
              (ext) =>
                (
                  (el) =>
                    el
                      ? [
                        "GET",
                        name + x.slice(path.length),
                        (new Function(
                          typeof Deno === "object" 
                          ?`return async _=> new Response( await Deno.readTextFile("${x}"), {headers:  {'Content-Type': '${el[1]}'}})`
                          :`return async _=> new Response( await ( Bun.file("${x}")).arrayBuffer(), {headers:  {'Content-Type': '${el[1]}'}})`
                          ,
                        ))(),
                        false,
                      ]
                      : [
                        "GET",
                        name + x.slice(path.length),
                        (new Function(
                          typeof Deno === "object" ?
                           `return (async _ => new Response( await Deno.readTextFile("${x}"))` :
                            `return async _ => new Response( await ( Bun.file("${x}")).arrayBuffer())`
                        ))(),
                        false,
                      ]
                )(
                  mine.find((x) => x[0] === ext) || null,
                )
            )(
              "." + x.split(".").at(-1),
            ),
        ) as RouteTypes[];
