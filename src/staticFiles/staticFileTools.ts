import type {
  defaultMime,
  fileServerPetition,
  Petition,
  StaticFilePluginExtensions,
} from "../morphism.ts";
import type { FunRouterOptions } from "../options.ts";
import mime from "../util/mime.ts";
import bunSyncCheckDir from "./transverseFiles.ts";

export default {
  // Correctly joins string that starts with `/` or ends with `/`
  join: (base: string) => (target: string): string =>
    base.endsWith("/") ? base + target : base + "/" + target,

  // Checks 
  mimeForm: (f: fileServerPetition<any>) =>
    "mime" in f && f.mime === false
      ? []
      : f.extra
        // Creates a map of mime and overwrites the extra keys if already exist
      ? [... f.extra.reduce( ( map , v) =>  ( 
        map.set(v[0], v[1]),
        map
      ) ,  new Map<string,string>(mime))]

      : mime,

  getMime: (mimes: [string, string][]) => (ext: string): string =>
    (mimes.find((x) => x[0] === ext) || [".txt", "text/html"])[1],

  removeExtension: (f: fileServerPetition<any>) => (petitions: Petition[]) =>
    f.removeExtensionOf && Array.isArray(f.removeExtensionOf)
      // Maps over all the petitions
      ? petitions.map(
        (x) =>
          (
            (ifExtension) =>
              ifExtension
                ? {
                  ...x,
                  path: x.path.slice(0, x.path.length - ifExtension.length),
                }
                : x
          )(
            // Checks if this petition has any of the extension and returning the first instance
            (f.removeExtensionOf as defaultMime[]).find((y) =>
              x.path.includes(y)
            ),
          ),
          
      ) as Petition[]
      : petitions,

  rectify: (path: string) =>
    // Add functions to check modify the `path`
    [
      // Ensures a `/` ad the end
      (x: string) => x[x.length - 1] !== "/" ? x + "/" : x,
      // Ensures a `.` at the start
      (x: string) => x[0] === "." ? x : "." + x,
    ].reduceRight((acc, x) => x(acc), path),

  getDir: (dirPath: string) => bunSyncCheckDir(dirPath).map((y) => y[0]).flat(),

  fromStringToPetition: (s: string) =>
    (new Function(
      s,
    ))() as (r: Request) => Promise<Response>,

  getValidPetitionFromPlugin:
    (o?: FunRouterOptions<any>) =>
    (checks: StaticFilePluginExtensions<any>) =>
    (root: string) =>
    (path: string) =>
    (name: string) =>
      "r" in checks
        ? checks!.r(
          {
            root: root,
            path,
            o: o,
            relativeName: root.slice(1, -1) + path.slice(name.length - 1),
          },
        )
        : checks!.f(
          {
            root: root,
            path,
            o: o,
            relativeName: root.slice(1, -1) + path.slice(name.length - 1),
          },
        ),
};
