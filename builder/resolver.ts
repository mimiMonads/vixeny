import { funRouterOptions, RouteTypes, Atlas} from "../types.ts";
import stringParser from "./stringParser.ts";
import position from "./position.ts";
import sResolver from "./sResolver.ts"
import sSpecialString from "./sSpecialString.ts"
import methods from "./methods.ts"



export default 
(o?: funRouterOptions) => 
(at: Atlas) => 
  ((l) =>
    ((pu) =>
      ((p) =>
        ((u) => (
           sr => (
            (me) => 
        at[4].length === 0
    ? 
    (r: Request) => (
      n =>
      n !== -1
      ? (
        (sp) =>
          (
            (a) =>
              a !== -1
                ? (
                  (b) => b !== -1 ? u[n][a] + b : pu
                )(
                  sr[n][a](sp[1]),
                )
                : pu
          )(
            at[1][n].indexOf(sp[0]),
          )
      )(
        p(r.url),
      )
      : l
    )(
      me(r.method)
    )
    : (
      (sc) => 
      (r: Request) => 
      ( n =>        
        n !== -1
        ? (
          (sp) =>
            (
              (w) =>
                w === -1
                  ? (
                    (a) =>
                      a !== -1
                        ? (
                          (b) => b !== -1 ? u[n][a] + b : pu
                        )(
                          sr[n][a](sp[1]),
                        )
                        : pu
                  )(
                    at[1][n].indexOf(sp[0]),
                  )
                  : w
            )(
              sc(sp[1]),
            )
        )(
          p(r.url),
        )
        : l)(me(r.method))

          )(
      sSpecialString({})(l)(
        at[4].map((x) => [x[0], x[3], x[2], x[1]] as RouteTypes),
      ),
    )        
          )(
            methods(at[0])
          )

        )(
          sResolver(at[2])
        )
            )
            (
            position(o)(at[1])(at[2]),
          ))(
          stringParser(o)(at[1]),
        ))(
        l - 1,
      ))(
      at[3].length - 1,
    )


