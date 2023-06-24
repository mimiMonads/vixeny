import { funRouterOptions } from "../../types.ts";
import validator from "./validator.ts";

export default (o?: funRouterOptions) =>
  (routes: string[][]) =>
    (position: number[]) =>
      (an: number[]) =>
        (notFound: number) =>
          (
            (n) =>
              new Function(`return (s =>${Array.from(
                {
                  length: n + 1,
                },
                (
                  _,
                  i,
                ) => [
                    `(a${i}=>(a${i}<1?${an.includes(i + 1)
                      ? validator(o)(position[an.indexOf(i + 1)])(notFound)(
                        routes[an.indexOf(i + 1)],
                      )
                      : notFound
                    }:${i === n ? notFound : ""}`,
                    `))(s.indexOf("/"${i !== 0 ? `,a${i - 1}` : ", 1"}) + 1)`,
                  ],
              ).reverse().reduce((acc, v) => v[0] + acc + v[1], "")
                })`)() as (s: string) => number
          )(
            an.reduce((acc, y) => y > acc ? y : acc, 0),
          );
