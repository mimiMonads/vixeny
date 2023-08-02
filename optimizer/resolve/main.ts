
import elements from "../../components/util/elements.ts";
import checker from "../checker.ts";
import aComposer from "../aComposer.ts";
import { ResolveOptions, TypeResolveOptions } from "./types.ts";
import { funRouterOptions } from "../../types.ts";
import { ObjectRawResponseCommon } from "../types.ts";

export default (o?: funRouterOptions) => (path: string) => (input: ResolveOptions | ResolveOptions[]) =>
  (
    ar =>
      ar
        .map(x => ({ ...x, path: path }))
        .map(x => (
          f => ({
            async: f.constructor.name === "AsyncFunction",
            f: f
          })
        )(
          aComposer(o)(x as ObjectRawResponseCommon)(checker(x?.delete ?? [])(elements)(x?.add ?? [])(x.f.toString()))
        )) as TypeResolveOptions
  )(
    (Array.isArray(input) ? input : [input]) as ResolveOptions[]
  )  
