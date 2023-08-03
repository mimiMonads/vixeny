// deno-lint-ignore-file
import { ResolveOptions } from "./resolve/types.ts";
import { ObjectRawResponseCommon, ObjectRawCommonRequest } from "./types.ts";

export default (f: ObjectRawResponseCommon)=> 
(y: (arg0: (y: any) => any) => any) =>
((x) => x(x))((x: (arg0: any) => ({ (arg0: any): any; new (): any })) =>
  y((y: any) => x(x)(y))
) ( //@ts-ignore
    y => 
    f.f.constructor.name !== "AsyncFunction" && 
    ( typeof f.resolve !== 'undefined' && 
        (Array.isArray(f.resolve)) 
            ? y(f.resolve) 
            : (f.resolve as unknown as ResolveOptions).f.constructor.name !== "AsyncFunction"
    )
) as ( f :ObjectRawResponseCommon | ObjectRawCommonRequest) => boolean