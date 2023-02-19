import solver from "./solver.ts";
import validChar from "../util/validChar.ts";
import { SignVerifyOptions } from "./types.ts";

export default async (seed: SignVerifyOptions) =>
  (new Function(
    `return arp => v => (s) =>
          s.length === ${
      typeof seed.size === "number" ? (seed.size * 2) + 1 : 17
    }
            ? (
              p =>
              ${
      Array.from(
        { length: typeof seed.size === "number" ? seed.size : 8 },
        (
          _,
          i,
        ) => [
          `(v[arp[${i}](p)] === s[${
            typeof seed.size === "number" ? seed.size : "8"
          } + ${1 + i}])?`,
          ":-1",
        ],
      ).reduceRight(
        (acc, [l, r]) => l + acc + r,
        "1",
      )
    }
            )(
              [
                ${
      Array.from(
        { length: typeof seed.size === "number" ? seed.size : 8 },
        (_, i) => `s.charCodeAt(${i})`,
      ).join(",")
    }
              ],
            )
            : -1
      
      `,
  ))()(
    await solver(seed),
  )(
    [...validChar],
  ) as (s: string) => -1 | 1;
