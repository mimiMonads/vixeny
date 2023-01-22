import { funRouterOptions } from "../types.ts";

export default (o?: funRouterOptions) => (an: number[][]) =>
  (
    (n) =>
      new Function(`return (s =>${
        Array.from(
          {
            length: n + 1,
          },
          (
            _,
            i,
          ) => [
            `(a${i}=>(a${i}<1?${
                typeof o?.hasName === "string"
                ? i + 1
                : i
            }:${i === n ? i + 1 : ""}`,
            `))(s.indexOf("/"${i !== 0 ? `,a${i - 1}` : ""}) + 1)`,
          ],
        ).reverse().reduce((acc, v) => v[0] + acc + v[1], "")
      }
)`)()
  )(
    an.reduce((acc, x) =>
      (
        (w) => w > acc ? w : acc
      )(x.reduce((acc1, y) => y > acc ? y : acc1, 0)), 0),
  );
