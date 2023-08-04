// deno-lint-ignore-file
import { ResolveOptions } from "./resolve/types.ts";
import { ObjectRawResponseCommon, ObjectRawCommonRequest } from "./types.ts";

export default (f: ObjectRawResponseCommon) =>
  (y: (arg0: (y: any) => any) => any) =>
    ((x) => x(x))((x: (arg0: any) => ({ (arg0: any): any; new(): any })) =>
      y((y: any) => x(x)(y))
    )(

      y =>
        (f.f.constructor.name === "AsyncFunction")
          ? true
          : (f.f.constructor.name === "Function" && typeof f.resolve == "undefined")
            ? false
            : (!Array.isArray(f.resolve) && f.resolve && f.resolve.f.constructor.name === "AsyncFunction")
              ? true
              : ("resolve" in f && Array.isArray(f.resolve) && f.resolve.every(x => y({ ...x })))
                ? true
                : false
    ) as boolean
