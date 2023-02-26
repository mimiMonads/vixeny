import solver from "./solver.ts";
import validChar from "../util/validChar.ts";
import { SignVerifyOptions } from "./types.ts";

export default async (seed: SignVerifyOptions) =>
  (new Function(
    `return arp => 
  v => 
  s =>
   (
    p => 
        (s.length === ${typeof seed.size === "number" ? seed.size : 8}
            ? s
            : p.map((x) => String.fromCharCode(x)).join("")) + "." +
           ${
      Array.from(
        { length: typeof seed.size === "number" ? seed.size : 8 },
        (_, i) => `v[arp[${i}](p)]`,
      ).join("+")
    }
    )(
        [
        ${
      Array.from(
        { length: typeof seed.size === "number" ? seed.size : 8 },
        (_, i) => `s[${i}] ? s.charCodeAt(${i}) :61`,
      ).join(",")
    }
        ]
    ) `,
  )())(await solver(seed))([...validChar]);
