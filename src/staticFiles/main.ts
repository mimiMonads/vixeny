import type { fileServerPetition } from "../morphism.ts";
import composedPaths from "./composedPaths.ts";
import getDir from "./getDir.ts";
import mime from "./mimeFrom.ts";
import removeExtensionOf from "./removeExtensionOf.ts";

export default (f: fileServerPetition) =>
  (
    (rectify) =>
      removeExtensionOf(f)(
        composedPaths(f)(rectify(f.path))(rectify(f.name))(
          getDir(rectify(f.path)),
        )(
          mime(f),
        ),
      )
  )(
    (s: string) =>
      [
        (x: string) => x[x.length - 1] !== "/" ? x + "/" : x,
        (x: string) => x[0] === "." ? x : "." + x,
      ].reduceRight((acc, x) => x(acc), s),
  );
