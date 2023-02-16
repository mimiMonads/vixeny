import short from "./short.ts";
import validChar from "../util/validChar.ts";

export default async (seed?: string) =>
  (
    (arp) =>
      (
        (v) => (s: string) =>
          s.length === 17
            ? (
              (p) =>
                v[arp[0](p)] === s[9]
                  ? v[arp[1](p)] === s[10]
                    ? v[arp[2](p)] === s[11]
                      ? v[arp[3](p)] === s[12]
                        ? v[arp[4](p)] === s[13]
                          ? v[arp[5](p)] === s[14]
                            ? v[arp[6](p)] === s[15]
                              ? v[arp[7](p)] === s[16] ? 1 : -1
                              : -1
                            : -1
                          : -1
                        : -1
                      : -1
                    : -1
                  : -1
            )(
              [
                s.charCodeAt(0),
                s.charCodeAt(1),
                s.charCodeAt(2),
                s.charCodeAt(3),
                s.charCodeAt(4),
                s.charCodeAt(5),
                s.charCodeAt(6),
                s.charCodeAt(7),
              ],
            )
            : -1
      )(
        [...validChar, ...[";"]],
      )
  )(
    await short(seed),
  );
