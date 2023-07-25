import solver from "./src/solver.ts";
import validChar from "../util/validChar.ts";
import { SignVerifyOptions } from "./types.ts";
import signerWithSize from "./src/signerWithSize.ts";

export default (seed: SignVerifyOptions) => (
  ar => (
    p =>
      typeof seed.size == "number"
        ? signerWithSize(seed.size)(ar)(p)
        :
        (s: string) => s + "." + [...s].map(x => x.charCodeAt(0)).map((x, i, a) =>
          i < 7
            ? p[ar[i % 8]([a.at(i - 7) as number, a.at(i - 6) as number, a.at(i - 5) as number, a.at(i - 4) as number, a.at(i - 3) as number, a.at(i - 2) as number, a.at(i - 1) as number, x])]
            : p[
            ar[i % 8]([
              a[(i - 7)],
              a[(i - 6)],
              a[(i - 5)],
              a[(i - 4)],
              a[(i - 3)],
              a[(i - 2)],
              a[(i - 1)],
              x,
            ])]
        ).reduce((acc, x) => acc + x)
  )(
    [...validChar]
  )
)(
  solver(seed)
)
