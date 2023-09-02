
import recursiveCheck from "../checkAsync.ts";
import { ResolveOptions, ResponseResponse } from "./types.ts";
import { FunRouterOptions } from "../../types.ts";
import { ObjectRawResponseCommon } from "../types.ts";

import table from "./table.ts";

export default (o?: FunRouterOptions) => (path: string) => (input: ResolveOptions | ResolveOptions[]): ResponseResponse =>
  (
    ar =>
      (
        table => 
          (isAsync => 
        table.reduce((a, k) => a(k.f),
          new Function(` return ${table.map(x => x.name + "=>").join("")}${isAsync?"async r =>":" r=>"}({${table.map(x => x.name 
            + ":" +( isAsync ? "await ": "")+ x.name + "(r)").join(",")}})`)()
          ) as unknown as ResponseResponse
           )(
              ar.some(x => recursiveCheck(x as ObjectRawResponseCommon )) 
            )
      )(
        table(false)(o)(path)(ar) as ({name:string,f:  (r:Request) => any  | Promise<any>})[]
      )
  )(
    (Array.isArray(input) ? [...input] : [...[input]]) as ResolveOptions[]
  )  
