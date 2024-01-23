import verifySha256 from "../../../jwt/verifySha256.mjs";
import { SupportedKeys } from "../framework/optimizer/types.ts";

export default (secret: SupportedKeys) => (name: string) =>
  (
    (sha256) => (c: string) =>
      (
        (p) =>
          sha256(
            c.slice(
              p + name.length + 1,
              (c.indexOf(",", p) + 1 || c.length + 1) - 1,
            ),
          )
      )(
        c.indexOf(name + "="),
      )
  )(
    verifySha256()(secret),
  );
