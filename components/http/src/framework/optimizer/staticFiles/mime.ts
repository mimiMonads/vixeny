import mime from "../../../util/mime.ts";

import { ObjectRawResponseStatic } from "../types.ts";

export default (f: ObjectRawResponseStatic) =>
  "mime" in f && f.mime === false
    ? []
    : "extra" in f
    ? mime.concat(f.extra)
    : mime;
