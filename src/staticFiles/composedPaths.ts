import type { fileServerPetition, Petition } from "../morphism.ts";
import staticFileTools from "./staticFileTools.ts";

//TODO: make it more readable 🙏

export default (f: fileServerPetition<any>) =>
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
                  ? staticFileTools.getValidPetitionFromPlugin(checks)(root)(x)(
                    name,
                  )
                  : ({
                    path: root.slice(1, -1) + x.slice(name.length - 1),
                    type: "base",
                    f: staticFileTools.fromStringToPetition(
                      //@ts-ignore
                      typeof Deno === "object"
                        ? `return async () => new Response( await Deno.readFile("${x}"), {headers:  {'Content-Type': '${
                          checker("." + x.split(".").at(-1))
                        }'}})`
                        : `return async _=> new Response( await ( Bun.file("${x}")).arrayBuffer(), {headers:  {'Content-Type': '${
                          checker("." + x.split(".").at(-1))
                        }'}})`,
                    ),
                  }))(
                  f.template!.find((y) =>
                    y.checker(root.slice(1, -1) + x.slice(name.length - 1))
                  ),
                ),
          ) as unknown as Petition[]
          : paths.map(
            (x) => ({
              path: root.slice(1, -1) + x.slice(name.length - 1),
              type: "base",
              f: staticFileTools.fromStringToPetition(
                //@ts-ignore
                typeof Deno === "object"
                  ? `return async () => new Response( await Deno.readFile("${x}"), {headers:  {'Content-Type': '${
                    checker("." + x.split(".").at(-1))
                  }'}})`
                  : `return async _=> new Response( await ( Bun.file("${x}")).arrayBuffer(), {headers:  {'Content-Type': '${
                    checker("." + x.split(".").at(-1))
                  }'}})`,
              ),
            }),
          ) as unknown as Petition[]
    )(
      staticFileTools.getMime(mimes),
    )
    //lazy way, fix later
    : "template" in f && f.template && f.template.length > 0
    ? paths.map(
      (x) =>
        ((checks) =>
          checks
            ? staticFileTools.getValidPetitionFromPlugin(checks)(root)(x)(name)
            : ({
              path: root.slice(1, -1) + x.slice(name.length - 1),
              type: "base",
              f: staticFileTools.fromStringToPetition(
                //@ts-ignore
                typeof Deno === "object"
                  ? `return async () => new Response( await Deno.readFile("${x}"))`
                  : `return async ()=>  new Response(await ( Bun.file("${x}")).arrayBuffer())`,
              ),
            }))(
            f.template!.find((y) =>
              y.checker(root.slice(1, -1) + x.slice(name.length - 1))
            ),
          ),
    ) as unknown as Petition[]
    : paths.map(
      (x) => ({
        path: root.slice(1, -1) + x.slice(name.length - 1),
        type: "base",
        f: staticFileTools.fromStringToPetition(
          //@ts-ignore
          typeof Deno === "object"
            ? `return async () => new Response( await Deno.readFile("${x}"))`
            : `return async ()=>  new Response(await ( Bun.file("${x}")).arrayBuffer())`,
        ),
      }),
    ) as unknown as Petition[];
