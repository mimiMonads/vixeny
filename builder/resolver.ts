import { funRouterOptions, RouteTypes } from "../types.ts";
import stringParser from "./stringParser.ts";
import position from "./position.ts";
import sResolver from "./sResolver.ts"
import sSpecialString from "./sSpecialString.ts"


export default (o?: funRouterOptions) =>
(last: number) =>
(m: number[][]) =>
(g: string[][][]) =>
(se: RouteTypes[]) =>
  ((l) =>
    ((pu) =>
      ((p) =>
        ((u) => (
          sr => 
                se.length === 0
            ? (n: number) => (s: string) =>
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
                      m[n].indexOf(sp[0]),
                    )
                )(
                  p(s),
                )
                : l
            : (
              (sc) => (n: number) => (s: string) =>
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
                              m[n].indexOf(sp[0]),
                            )
                            : w
                      )(
                        sc(sp[1]),
                      )
                  )(
                    p(s),
                  )
                  : l
            
                  )(

                    
              sSpecialString({})(l)(
                se.map((x) => [x[0], x[3], x[2], x[1]] as RouteTypes),
              ),
            )
        )(
          sResolver(g)
        )
            )
            (
            position(o)(m)(g),
          ))(
          stringParser(o)(m),
        ))(
        l - 1,
      ))(
      last - 1,
    );


