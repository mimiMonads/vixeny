import type { fileServerPetition } from "../morphism.ts";
import type { FunRouterOptions } from "../options.ts";
import composedPaths from "./composedPaths.ts";
import tools from "./staticFileTools.ts";

export default (o?: FunRouterOptions<any>) =>
// This is for internal testing
(maybeOfFiles?: string[]) =>
(f: fileServerPetition<any>) =>
  tools.removeExtension(f)(
    composedPaths(o)(f)(tools.rectify(f.path))(
      tools.rectify(f.name),
    )(
      maybeOfFiles ?? tools.getDir(tools.rectify(f.path)),
    )(
      tools.mimeForm(f),
    ),
  );
