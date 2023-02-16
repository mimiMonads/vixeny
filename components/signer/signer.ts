import short from "./short.ts";
import validChar from "../util/validChar.ts";

export default async (seed?: string) =>
  (
    (arp) =>
      (
        (v) => (s: string) =>
          (
            (p) =>
              (s.length === 8
                ? s
                : p.map((x) => String.fromCharCode(x)).join("")) +
              "." +
              v[arp[0](p)] + v[arp[1](p)] + v[arp[2](p)] +
              v[arp[3](p)] + v[arp[4](p)] + v[arp[5](p)] +
              v[arp[6](p)] + v[arp[7](p)]
          )(
            [
              s[0] ? s.charCodeAt(0) : 59,
              s[1] ? s.charCodeAt(1) : 59,
              s[2] ? s.charCodeAt(2) : 59,
              s[3] ? s.charCodeAt(3) : 59,
              s[4] ? s.charCodeAt(4) : 59,
              s[5] ? s.charCodeAt(5) : 59,
              s[6] ? s.charCodeAt(6) : 59,
              s[7] ? s.charCodeAt(7) : 59,
            ],
          )
      )(
        [...validChar],
      )
  )(
    await short(seed),
  );
