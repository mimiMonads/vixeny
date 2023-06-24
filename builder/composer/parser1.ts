import { funRouterOptions } from "../../types.ts";
import validator from "./validator.ts";

export default (o?: funRouterOptions) =>
  (routes: string[][]) =>
    (position: number[]) =>
      (an: number[]) =>
        (start: number) =>
          (notFound: number) =>

            notFound === -1
              ?
              (


                (nar: string[]) =>
                  (new Function(`return s=>${nar.reduceRight(
                    (acc, v, i) =>
                      `s.indexOf("${v}")===0?${i + start}:` + acc,
                    "-1",
                  )
                    }`))() as (s: string) => number
              )

                (
                  routes.flatMap(x => x)
                    .sort((a, b) => b.length - a.length),
                )
              : ((n) =>
                new Function(`return (s =>${Array.from(
                  {
                    length: n + 1,
                  },
                  (
                    _,
                    i,
                  ) => [
                      `(a${i}=>(a${i}<1?${an.includes(i + 1)
                        ? validator(o)(position[an.indexOf(i + 1)] + start)(notFound)(
                          routes[an.indexOf(i + 1)],
                        )
                        : notFound
                      }:${i === n ? notFound : ""}`,
                      `))(s.indexOf("/"${i !== 0 ? `,a${i - 1}` : ", 1"}) + 1)`,
                    ],
                ).reverse().reduce((acc, v) => v[0] + acc + v[1], "")
                  })`)() as (s: string) => number)(
                    an.reduce((acc, y) => y > acc ? y : acc, 0),
                  )
