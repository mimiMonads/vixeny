import type {
  defaultMime,
  fileServerPetition,
  Petition,
  StaticFilePlugin,
} from "../morphism.ts";
import type { FunRouterOptions } from "../options.ts";
import mime from "../util/mime.ts";
import bunSyncCheckDir from "./transverseFiles.ts";

export default {
  join: (base: string) => (target: string): string =>
    base.endsWith("/") ? base + target : base + "/" + target,

  mimeForm: (f: fileServerPetition<any>) =>
    "mime" in f && f.mime === false
      ? []
      : "extra" in f
      ? mime.concat(f.extra as [string, string][])
      : mime,

  getMime: (mimes: [string, string][]) => (ext: string): string =>
    (mimes.find((x) => x[0] === ext) || [".txt", "text/html"])[1],

  removeExtension: (f: fileServerPetition<any>) => (petitions: Petition[]) =>
    f.removeExtensionOf && Array.isArray(f.removeExtensionOf)
      ? petitions.map(
        (x) =>
          (
            (element) =>
              element
                ? {
                  ...x,
                  path: x.path.slice(0, x.path.length - element.length),
                }
                : x
          )(
            (f.removeExtensionOf as unknown as defaultMime[]).find((y) =>
              x.path.includes(y)
            ),
          ),
      ) as Petition[]
      : petitions,

  rectify: (path: string) =>
    [
      (x: string) => x[x.length - 1] !== "/" ? x + "/" : x,
      (x: string) => x[0] === "." ? x : "." + x,
    ].reduceRight((acc, x) => x(acc), path),

  getDir: (dirPath: string) => bunSyncCheckDir(dirPath).map((y) => y[0]).flat(),

  fromStringToPetition: (s: string) =>
    (new Function(
      s,
    ))() as (r: Request) => Promise<Response>,

  getValidPetitionFromPlugin:
    (o?: FunRouterOptions<any>) =>
    (checks: StaticFilePlugin) =>
    (root: string) =>
    (x: string) =>
    (name: string) =>
      checks!.p(
        {
          root: root,
          path: x,
          relativeName: root.slice(1, -1) + x.slice(name.length - 1),
        },
      ),
};
