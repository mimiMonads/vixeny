import verifySha256 from "../../../jwt/verifySha256.mjs";
import { SupportedKeys } from "../framework/optimizer/types.ts";

export default (secret: SupportedKeys) => (name: string) =>
  (
    (sha256) => (c: string | null) =>
      (
        (p) =>
          p !== -1?
          sha256(
            c.slice(
              p + name.length + 1,
              (c.indexOf(",", p) + 1 || c.length + 1) - 1,
            ),
          )
          : null
      )(
         typeof c === 'string' ? c.indexOf(name + "=") : -1,
      )
  )(
    verifySha256()(secret),
  );
