

import type {  defaultMime, fileServerPetition  , Petition} from "../morphism.ts";

export default (f: fileServerPetition) => (petitions: Petition[]) =>
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
    : petitions;
