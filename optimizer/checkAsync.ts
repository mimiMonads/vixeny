// deno-lint-ignore-file

import { ResolveOptions } from "./resolve/types.ts";
import { ObjectRawResponseCommon, ObjectRawCommonRequest } from "./types.ts";


type RecFunc = (f: ObjectRawResponseCommon) => boolean;

export default 
((f: (x: RecFunc) => RecFunc) => 
  ((x: (arg: (x: any) => any) => any) => x(x))(
    (x: (arg: any) => any) => 
      f((y: ObjectRawResponseCommon) => x(x)(y))
  )
)(
  (solver: RecFunc) => (f: ObjectRawResponseCommon) => 
    f.f.constructor.name === "AsyncFunction"
    ? true
    : f.f.constructor.name === "Function" && typeof f.resolve == "undefined"
      ? false
      : !Array.isArray(f.resolve) && f.resolve && f.resolve.f.constructor.name === "AsyncFunction"
        ? true
        : "resolve" in f && Array.isArray(f.resolve) && f.resolve.some(x => solver(x as unknown as ObjectRawResponseCommon))
          ? true
          : false
) as unknown as (f: ObjectRawResponseCommon) => boolean;