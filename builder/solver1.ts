import { Atlas as Atlas1 } from "./atlas/main1.ts"
import { funRouterOptions } from "../types.ts";
import solver from "./composer/methods1.ts";
import finderMethods from "./composer/finderMethods.ts";



export default (o?: funRouterOptions) =>
  (atlas: Atlas1) => (
    (me) =>
      (
        (solve) =>
          (atlas[4][0] as Atlas1[0]).length === 0
            ? (r: Request) =>
              me(r.method) !== -1
                ? solve[me(r.method)](r.url)
                : atlas[3].length - 1
            :
            (
              m1 => (
                solve1 =>
                  (r: Request) => (
                    w => w !== -1
                      ? w
                      :
                      me(r.method) !== -1
                        ? solve[me(r.method)](r.url)
                        : atlas[3].length - 1

                  )(
                    m1(r.method) !== - 1
                      ? solve1[m1(r.method)](r.url)
                      : -1
                  )

              )(
                solver(o)((atlas[4] as Atlas1))(
                  atlas[3].length - (atlas[4][3] as Atlas1[3]).length
                )(-1)
              )
            )(
              finderMethods(
                (atlas[4][0] as Atlas1[0])
              )
            )
      )(
        solver(o)(atlas)(0)(

          (atlas[4][0] as Atlas1[0]).length === 0
            ? atlas[3].length - 4 + (atlas[4][3] as Atlas1[3]).length
            : atlas[3].length -2
        ),
      )
  )(
    finderMethods(
      atlas[0]
    )
  )

