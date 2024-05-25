import signer from "./signer.ts";

import stringify from "../../../../encode/src/stringify/safe.mjs";

import { SignVerifyOptions } from "./types.ts";
import {
  JsonStringify,
  JsonType,
} from "../../../../encode/src/stringify/types.ts";
export type JsonSinger = SignVerifyOptions & {
  schema?: JsonStringify;
};

export default (o: JsonSinger) =>
  (
    (sign) =>
      "schema" in o && typeof o.schema == "object"
        ? ((str) => (obj: JsonType) => sign(btoa(str(obj))))(
          stringify(o.schema),
        )
        : (obj: JsonType) => sign(btoa(JSON.stringify(obj)))
  )(
    signer(o),
  );
