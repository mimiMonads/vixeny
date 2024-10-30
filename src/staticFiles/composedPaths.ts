import type {
  fileServerPetition,
  Petition,
  StaticFileOptions,
} from "../morphism.ts";
import type { FunRouterOptions } from "../options.ts";
import staticFileTools from "./staticFileTools.ts";

//TODO: make it more readable 🙏

export default (o?: FunRouterOptions<any>) =>
(f: fileServerPetition<any>) =>
(name: string) =>
(root: string) =>
(paths: string[]) =>
(mimes: [string, string][]): Petition[] =>
  mimes.length > 0
    ? (
      f.template !== undefined && f.template && f.template.length > 0
        ? paths.map(
          (x) =>
            ((checks) =>
              checks
                ? staticFileTools.getValidPetitionFromPlugin(o)(checks)(
                    root,
                  )(x)(name)
                : ({
                  path: root.slice(1, -1) + x.slice(name.length - 1),
                  ...mimeIsTrue(f)("." + x.split(".").at(-1)),
                  type: "base",
                  f: staticFileTools.fromStringToPetition(
                    //@ts-ignore
                    typeof Deno === "object"
                      ? `return async () =>  await Deno.readFile("${x}")`
                      : `return async ()=>  await ( Bun.file("${x}")).arrayBuffer() `,
                  ),
                }))(
                f.template!.find((y) =>
                  y.checker(createContext({ root, name, x, o, f }))
                ),
              ),
        ) as unknown as Petition[]
        : paths.map(
          (x) => ({
            path: root.slice(1, -1) + x.slice(name.length - 1),
            type: "base",
            headings: {
              headers: "." + x.split(".").at(-1),
            },
            f: staticFileTools.fromStringToPetition(
              //@ts-ignore
              typeof Deno === "object"
                ? `return async () => await Deno.readFile("${x}") `
                : `return async () =>  await ( Bun.file("${x}")).arrayBuffer()`,
            ),
          }),
        ) as unknown as Petition[]
    )
    //lazy way, fix later
    : "template" in f && f.template && f.template.length > 0
    ? paths.map(
      (x) =>
        ((checks) =>
          checks
            ? staticFileTools.getValidPetitionFromPlugin(o)(checks)(root)(x)(
                name)
            : ({
              path: root.slice(1, -1) + x.slice(name.length - 1),
              type: "base",
              ...mimeIsTrue(f)("." + x.lastIndexOf(".") || "text"),
              f: staticFileTools.fromStringToPetition(
                //@ts-ignore
                typeof Deno === "object"
                  ? `return async () => await Deno.readFile("${x}")`
                  : `return async ()=>  await ( Bun.file("${x}")).arrayBuffer()`,
              ),
            }))(
            f.template!.find((y) =>
              y.checker(createContext({ root, name, x, o, f }))
            ),
          ),
    ) as unknown as Petition[]
    : paths.map(
      (x) => ({
        path: root.slice(1, -1) + x.slice(name.length - 1),
        type: "base",
        ...mimeIsTrue(f)("." + x.split(".").at(-1)),
        f: staticFileTools.fromStringToPetition(
          //@ts-ignore
          typeof Deno === "object"
            ? `return async () =>  await Deno.readFile("${x}")`
            : `return async ()=>  await ( Bun.file("${x}")).arrayBuffer()`,
        ),
      }),
    ) as unknown as Petition[];

const mimeIsTrue = (f: fileServerPetition<any>) => (mime: string) =>
  f.mime
    ? {
      headings: {
        headers: mime,
      },
    }
    : { headings: undefined };

const createContext = (obj: {
  root: string;
  name: string;
  x: string;
  o?: FunRouterOptions<any>;
  f: fileServerPetition<any>;
}): StaticFileOptions => ({
  path: obj.root.slice(1, -1) + obj.x.slice(obj.name.length - 1),
  thisOptions: () => ({ ...obj.f }),
  globalOptions: () => ({ ...obj.o }),
});
