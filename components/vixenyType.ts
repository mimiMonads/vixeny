import { Petitions, funRouterOptions } from "../types.ts"
import { SignVerifyOptions } from "./tokens/types.ts"
import vixeny from "../fun.ts"

type CustomVerifyVixeny =
  funRouterOptions & {
    at: string,
    500?: { (r: Request): Response },
    customVerify: { (r: Request): boolean } | { async(r: Request): boolean },
    sideEffectOnAccept?: { (r: Request): boolean } | { async(r: Request): boolean },
    sideEffectOnReject?: { (r: Request): boolean } | { async(r: Request): boolean },
  }

type VixVixeny =
  funRouterOptions & {
    at: string,
    500?: { (r: Request): Response }
    vixToken: SignVerifyOptions,
    sideEffectOnAccept?: { (r: Request): boolean } | { async(r: Request): boolean },
    sideEffectOnReject?: { (r: Request): boolean } | { async(r: Request): boolean },

  }

export type NestedVixeny = CustomVerifyVixeny | VixVixeny

export default (o: NestedVixeny) => (ar: Petitions) =>
  (
    filtered =>
      (new Function(`
      return ${"vixToken" in o
          ? 've =>'
          : o.customVerify.constructor.name === "AsyncFunction"
            ? 'async ve =>'
            : 've =>'
        }v=>${("customVerify" in o && o.customVerify.constructor.name === "AsyncFunction") ||
          ("sideEffectOnAccept" in o && o.sideEffectOnAccept.constructor.name === "AsyncFunction") ||
          ("sideEffectOnReject" in o && o.sideEffectOnReject.constructor.name === "AsyncFunction")
          ? 'async r =>'
          : 'r =>'

        }${"vixToken" in o
          ? 've(r)'
          : o.customVerify.constructor.name === "AsyncFunction"
            ? 'await ve(r)'
            : 've(r)'
        }
  ?
  : ${""}
`))()
    //vixeny(o)(filtered)
  )(
    (
      base => ar.map(x => ({ ...x, path: base + x.path }))
    )(
      o.at.at(-1) === "/" ? o.at.slice(0, -1) : o.at
    )
  )
