import { FunRouterOptions } from "../../types.ts";
import validator from "./validator.ts";

export default (o?: FunRouterOptions) =>
  (routes: string[][]) =>
    (position: number[]) =>
      (an: number[]) =>
        (start: number) =>
          (notFound: number) =>

            notFound === -1 || notFound === null
              ?
              (


                (nar: [string, number][]) =>
                  (new Function(`return s=>${nar.reduceRight(
                    (acc, v) =>
                      `s.indexOf("${(v[0] as string)}")===0?${(v[1] as number) + start}:` + acc,
                      String(notFound),
                  )
                    }`))() as (s: string) => number
              )

                (
                  routes
                    .flatMap(x => x)
                    .map((x, i) => [x, i] as [string, number])
                    .sort((a, b) => b[0].length - a[0].length),
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
