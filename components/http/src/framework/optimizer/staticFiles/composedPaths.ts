import { ObjectRawResponseStatic, Petition } from "../types.ts";
import getMime from "./getMime.ts";

export default (f: ObjectRawResponseStatic) =>
(name: string) =>
(root: string) =>
(paths: string[]) =>
(mimes: [string, string][]): Petition[] =>
  mimes.length > 0
    ? (
      (checker) =>
        f.template !== undefined && f.template
          ? paths.map(
            (x) =>
              f.template!.checker(root.slice(1, -1) + x.slice(name.length - 1))
                ? f.template!.r(
                  {
                    root: root,
                    path: x,
                    relativeName: root.slice(1, -1) + x.slice(name.length - 1),
                  },
                )
                : ({
                  path: root.slice(1, -1) + x.slice(name.length - 1),
                  type: "response",
                  r: (new Function(
                    typeof Deno === "object"
                      ? `return async () => new Response( await Deno.readFile("${x}"), {headers:  {'Content-Type': '${
                        checker("." + x.split(".").at(-1))
                      }'}})`
                      : `return async _=> new Response( await ( Bun.file("${x}")).arrayBuffer(), {headers:  {'Content-Type': '${
                        checker("." + x.split(".").at(-1))
                      }'}})`,
                  ))() as () => Promise<Response>,
                }),
          )
          : paths.map(
            (x) => ({
              path: root.slice(1, -1) + x.slice(name.length - 1),
              type: "response",
              r: (new Function(
                typeof Deno === "object"
                  ? `return async () => new Response( await Deno.readFile("${x}"), {headers:  {'Content-Type': '${
                    checker("." + x.split(".").at(-1))
                  }'}})`
                  : `return async _=> new Response( await ( Bun.file("${x}")).arrayBuffer(), {headers:  {'Content-Type': '${
                    checker("." + x.split(".").at(-1))
                  }'}})`,
              ))() as () => Promise<Response>,
            }),
          )
    )(
      getMime(mimes),
    )
    //lazy way, fix later
    : f.template !== undefined && f.template
    ? paths.map(
      (x) =>
        f.template!.checker(root.slice(1, -1) + x.slice(name.length - 1))
          ? f.template!.r(
            {
              root: root,
              path: x,
              relativeName: root.slice(1, -1) + x.slice(name.length - 1),
            },
          )
          : ({
            path: root.slice(1, -1) + x.slice(name.length - 1),
            type: "response",
            r: (new Function(
              typeof Deno === "object"
                ? `return async () => new Response( await Deno.readFile("${x}"))`
                : `return async ()=>  new Response(await ( Bun.file("${x}")).arrayBuffer())`,
            ))() as () => Promise<Response>,
          }),
    )
    : paths.map(
      (x) => ({
        path: root.slice(1, -1) + x.slice(name.length - 1),
        type: "response",
        r: (new Function(
          typeof Deno === "object"
            ? `return async () => new Response( await Deno.readFile("${x}"))`
            : `return async ()=>  new Response(await ( Bun.file("${x}")).arrayBuffer())`,
        ))() as () => Promise<Response>,
      }),
    );
