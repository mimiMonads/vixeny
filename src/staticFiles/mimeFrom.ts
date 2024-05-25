import mime from "../util/mime.ts";

import type { fileServerPetition } from "../morphism.ts";

export default (f: fileServerPetition) =>
  "mime" in f && f.mime === false
    ? []
    : "extra" in f
    ? mime.concat(f.extra)
    : mime;
