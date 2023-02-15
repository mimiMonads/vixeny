import { RouteTypes } from "../types.ts";

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
                          `return async _=> new Response( await Deno.readTextFile("${x}"), 
                      {headers:  {'Content-Type': '${el[1]}'}}
                            )`,
                        ))(),
                        false,
                      ]
                      : [
                        "GET",
                        name + x.slice(path.length),
                        (new Function(
                          `return async _=> new Response(await Deno.readTextFile("${x}"))`,
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
