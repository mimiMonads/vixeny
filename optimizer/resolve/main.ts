
import elements from "../../components/util/elements.ts";
import recursiveCheck from "../checkAsync.ts";
import aComposer from "../aComposer.ts";

import { ResolveOptions, ResponseResponse } from "./types.ts";
import { funRouterOptions } from "../../types.ts";
import { ObjectRawResponseCommon } from "../types.ts";
import checker from "../checker.ts";

export default (o?: funRouterOptions) => (path: string) => (input: ResolveOptions | ResolveOptions[]): ResponseResponse =>
  (
    ar =>
      (
        table => 
          (isAsync => 
            // console.log(
            //   "--main--",
            //   ` return ${table.map(x => x.name + "=>").join("")}${isAsync?"async r =>":" r=>"}({${table.map(x => x.name  + ":" +( x.f.constructor.name === "AsyncFunction" ? "await ": "")+ x.name + "(r)").join(",")}})`
            //   ,"-----"
            //   ) as unknown as ResponseResponse ??
        table.reduce((a, k) => a(k.f),
          new Function(` return ${table.map(x => x.name + "=>").join("")}${isAsync?"async r =>":" r=>"}({${table.map(x => x.name 
            + ":" +( x.f.constructor.name === "AsyncFunction" ? "await ": "")+ x.name + "(r)").join(",")}})`)()
          ) as unknown as ResponseResponse
           )(
              ar.some(x => recursiveCheck(x as ObjectRawResponseCommon )) 
            )
      )(
        ar
          .map(x => ({ ...x, path: path }))
          .map(x => ({
            name: x.name,
            f: x.f.constructor.name === "AsyncFunction"
              ?
              (a => (k: (arg0: any) => any) => async (r: Request) => await k(  a(r)))(aComposer(o)(x as ObjectRawResponseCommon)(checker(x?.delete ?? [])(elements)(x?.add ?? [])(x.f.toString())))
                (x.debug?.type === "list"
                ? ( n => (l: any) => (k: (arg0: any) => any) => (f: any) => console.log("Vixeny in ' " + n + " ' is using : " + JSON.stringify(l)) as unknown as null ?? k(f))
                  (x.debug.name)
                  (checker(x?.delete ?? [])(elements)(x?.add ?? [])(x.f.toString()))
                  (x.f)
                : x.f)
              : (a => (k: (arg0: any) => any) => (r: Request)=> k(a(r)))(aComposer(o)(x as ObjectRawResponseCommon)(checker(x?.delete ?? [])(elements)(x?.add ?? [])(x.f.toString())))
                (x.debug?.type === "list"
                  ? ( n => (l: any) => (k: (arg0: any) => any) => (f: any) => console.log("Vixeny in ' " + n + " ' is using : " + JSON.stringify(l)) as unknown as null ?? k(f))
                    (x.debug.name)
                    (checker(x?.delete ?? [])(elements)(x?.add ?? [])(x.f.toString()))
                    (x.f)
                  : x.f)
          }))
      )

  )(
    (Array.isArray(input) ? [...input] : [...[input]]) as ResolveOptions[]
  )  
