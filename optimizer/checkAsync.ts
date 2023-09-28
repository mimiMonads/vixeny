// deno-lint-ignore-file
import { ObjectRawCommonRequest, ObjectRawResponseCommon } from "./types.ts";

type RecFunc = (f: ObjectRawResponseCommon) => boolean;

export default (f: ObjectRawResponseCommon) =>
  f.f.constructor.name === "AsyncFunction"
    ? true
    : f.f.constructor.name === "Function" && typeof f.resolve == "undefined"
    ? false
    : !Array.isArray(f.resolve) && f.resolve &&
        f.resolve.f.constructor.name === "AsyncFunction"
    ? true
    : "resolve" in f && Array.isArray(f.resolve) &&
        f.resolve.some((x) => x.f.constructor.name === "AsyncFunction")
    ? true
    : false;
