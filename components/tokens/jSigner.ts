import signer from "./signer.ts"
import stringify from "../stringify/stringify.ts";
import { SignVerifyOptions } from "./types.ts";
import { JsonStringify, JsonType } from "../stringify/types.ts";
export type JsonSinger = SignVerifyOptions & {
  schema?: JsonStringify
}


export default (o: JsonSinger) => (
  sign =>
    "schema" in o && typeof o.schema == "object"
      ? (str => (obj: JsonType) => sign(btoa(str(obj))))(stringify(o.schema))
      : (obj: JsonType) => sign(btoa(JSON.stringify(obj)))
)(
  signer(o)
)
