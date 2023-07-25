import hash from "./hash.ts";
import { SignVerifyOptions } from "../types.ts";

export default (o: SignVerifyOptions) =>
  (key: string) =>
    (
      (s) =>
        (
          (p) =>
            (
              (el) =>


                "(((" + Array.from(
                  {
                    length: 8 * (typeof o.sequence === "number" ? o.sequence : 4),
                  },
                  (_, i) =>
                    `( ${p[i]} ^ a[ar[${el[i]
                    }]])`,
                ).join("+") + ") >>> 0) % 65)"

            )(
              Array.from(
                { length: 16 },
                () =>
                  Array.from(
                    { length: 8 },
                    (_, i) => "" + i,
                  ),
              ).flat(),
            )
        )(
          Array.from(
            { length: 64 },
            (_, i) => "0x" + s.slice(i === 0 ? 0 : i * 8, i * 8 + 8),
          ),
        )
    )(
      (
        (s1) =>
          (Array.from(
            {
              length: 16,
            },
            (_, i) => hash(o)(s1 + " " + i),
          )).join("")
      )(
        hash(o)(key),
      ),
    );


