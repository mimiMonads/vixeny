import { Petitions, FunRouterOptions } from "../../types.ts"
import { SignVerifyOptions } from "../../components/tokens/types.ts"
import vixeny from "../../fun.ts"
import mapping from "./map.ts"
type CustomVerifyVixeny =
  FunRouterOptions & {
    at: string,
    401?: { (r: Request): boolean } | { async(r: Request): boolean },
    customVerify: { (r: Request): boolean } | { async(r: Request): boolean },
    sideEffectOnAccept?: { (r: Request): boolean } | { async(r: Request): boolean },
    sideEffectOnReject?: { (r: Request): boolean } | { async(r: Request): boolean },
  }

type VixVixeny =
  FunRouterOptions & {
    at: string,
    401?: { (r: Request): boolean } | { async(r: Request): boolean },
    vixToken: SignVerifyOptions,
    sideEffectOnAccept?: { (r: Request): boolean } | { async(r: Request): boolean },
    sideEffectOnReject?: { (r: Request): boolean } | { async(r: Request): boolean },

  }

export type NestedVixeny = CustomVerifyVixeny | VixVixeny

export default (o: NestedVixeny) => (ar: Petitions) =>
  (
    filtered =>
      (
        map => (
          new Function(
            `return i=>i`
          )
        )()
      )(mapping(o))
    //vixeny(o)(filtered)
  )(
    (
      base => ar.map(x => ({ ...x, path: base + x.path }))
    )(
      o.at.at(-1) === "/" ? o.at.slice(0, -1) : o.at
    )
  )
