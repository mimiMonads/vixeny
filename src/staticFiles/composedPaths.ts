import type { fileServerPetition, Petition } from "../morphism.ts";
import getMime from "./getMime.ts";

//TODO: make it more redable 🙏

export default (f: fileServerPetition) =>
(name: string) =>
(root: string) =>
(paths: string[]) =>
(mimes: [string, string][]): Petition[] =>
  mimes.length > 0
    ? (
      (checker) =>
        f.template !== undefined && f.template && f.template.length > 0
          ? paths.map(
            (x) =>
              ((checks) =>
                checks
                  ? checks!.r(
                    {
                      root: root,
                      path: x,
                      relativeName: root.slice(1, -1) +
                        x.slice(name.length - 1),
                    },
                  )
                  : ({
                    path: root.slice(1, -1) + x.slice(name.length - 1),
                    type: "response",
                    r: (new Function(
                      //@ts-ignore
                      typeof Deno === "object"
                        ? `return async () => new Response( await Deno.readFile("${x}"), {headers:  {'Content-Type': '${
                          checker("." + x.split(".").at(-1))
                        }'}})`
                        : `return async _=> new Response( await ( Bun.file("${x}")).arrayBuffer(), {headers:  {'Content-Type': '${
                          checker("." + x.split(".").at(-1))
                        }'}})`,
                    ))() as () => Promise<Response>,
                  }))(
                  f.template!.find((y) =>
                    y.checker(root.slice(1, -1) + x.slice(name.length - 1))
                  ),
                ),
          ) as unknown as Petition[]
          : paths.map(
            (x) => ({
              path: root.slice(1, -1) + x.slice(name.length - 1),
              type: "response",
              r: (new Function(
                //@ts-ignore
                typeof Deno === "object"
                  ? `return async () => new Response( await Deno.readFile("${x}"), {headers:  {'Content-Type': '${
                    checker("." + x.split(".").at(-1))
                  }'}})`
                  : `return async _=> new Response( await ( Bun.file("${x}")).arrayBuffer(), {headers:  {'Content-Type': '${
                    checker("." + x.split(".").at(-1))
                  }'}})`,
              ))() as () => Promise<Response>,
            }),
          ) as unknown as Petition[]
    )(
      getMime(mimes),
    )
    //lazy way, fix later
    : f.template !== undefined && f.template && f.template.length > 0
    ? paths.map(
      (x) =>
        ((checks) =>
          checks
            ? checks!.r(
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
                //@ts-ignore
                typeof Deno === "object"
                  ? `return async () => new Response( await Deno.readFile("${x}"))`
                  : `return async ()=>  new Response(await ( Bun.file("${x}")).arrayBuffer())`,
              ))() as () => Promise<Response>,
            }))(
            f.template!.find((y) =>
              y.checker(root.slice(1, -1) + x.slice(name.length - 1))
            ),
          ),
    ) as unknown as Petition[]
    : paths.map(
      (x) => ({
        path: root.slice(1, -1) + x.slice(name.length - 1),
        type: "response",
        r: (new Function(
          //@ts-ignore
          typeof Deno === "object"
            ? `return async () => new Response( await Deno.readFile("${x}"))`
            : `return async ()=>  new Response(await ( Bun.file("${x}")).arrayBuffer())`,
        ))() as () => Promise<Response>,
      }),
    ) as unknown as Petition[];
