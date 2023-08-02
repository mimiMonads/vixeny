
import elements from "../../components/util/elements.ts";
import checker from "../checker.ts";
import aComposer from "../aComposer.ts";
import { ResolveOptions, TypeResolveOptions } from "./types.ts";
import { funRouterOptions } from "../../types.ts";
import { ObjectRawResponseCommon } from "../types.ts";

export default (o?: funRouterOptions) => (path: string) => (input: ResolveOptions | ResolveOptions[]):TypeResolveOptions =>
  (
    ar =>
      (
        table => table.reduce( (a,k) => a(k.f) ,
        new Function(` return ${table.map(x =>  x.name + "=>" ).join("")}r=>({${table.map(x => x.name + ":" + x.name + "(r)").join(",")}})`)()) as unknown as TypeResolveOptions
      )(
        ar
        .map(x => ({ ...x, path: path }))
        .map(x => ({
          name: x.name, 
          f: aComposer(o)(x as ObjectRawResponseCommon)(checker(x?.delete ?? [])(elements)(x?.add ?? [])(x.f.toString()))
        }))
      )
        
  )(
    (Array.isArray(input) ? input : [input]) as ResolveOptions[]
  )  
