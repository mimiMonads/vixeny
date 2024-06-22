import type { fileServerPetition } from "../morphism.ts";
import composedPaths from "./composedPaths.ts";
import staticFileTools from "./staticFileTools.ts";

export default (maybeOfFiles?: string[]) => (f: fileServerPetition<any>) =>
  staticFileTools.removeExtension(f)(
    composedPaths(f)(staticFileTools.rectify(f.path))(
      staticFileTools.rectify(f.name),
    )(
      maybeOfFiles ?? staticFileTools.getDir(staticFileTools.rectify(f.path)),
    )(
      staticFileTools.mimeForm(f),
    ),
  );
