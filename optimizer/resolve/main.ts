
import elements from "../../components/util/elements.ts";
import checker from "../checker.ts";
import aComposer from "../aComposer.ts";
import { ResolveOptions, TypeResolveOptions } from "./types.ts";
import { funRouterOptions } from "../../types.ts";
import { ObjectRawResponseCommon } from "../types.ts";

export default (o?: funRouterOptions) => (path: string) => (input: ResolveOptions | ResolveOptions[]): TypeResolveOptions =>
  (
    ar =>
      (
        table => table.reduce((a, k) => a(k.f),
          new Function(` return ${table.map(x => x.name + "=>").join("")}r=>({${table.map(x => x.name + ":" + x.name + "(r)").join(",")}})`)()) as unknown as TypeResolveOptions
      )(
        ar
          .map(x => ({ ...x, path: path }))
          .map(x => ({
            name: x.name,
            f: x.f.constructor.name === "AsyncFunction"
              ? (a => (k: ((value: any) => any)|null|undefined) => (r: any) => Promise.resolve(a(r)).then(k))(aComposer(o)(x as ObjectRawResponseCommon)(checker(x?.delete ?? [])(elements)(x?.add ?? [])(x.f.toString())))
                (x.debug?.type === "list"
                ? ( n => (l: any) => (k: (arg0: any) => any) => (f: any) => console.log("Vixeny in ' " + n + " ' is using : " + JSON.stringify(l)) as unknown as null ?? k(f))
                  (x.debug.name)
                  (checker(x?.delete ?? [])(elements)(x?.add ?? [])(x.f.toString()))
                  (x.f)
                : x.f)
              : (a => (k: (arg0: any) => any) => (r: any) => k(a(r)))(aComposer(o)(x as ObjectRawResponseCommon)(checker(x?.delete ?? [])(elements)(x?.add ?? [])(x.f.toString())))
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