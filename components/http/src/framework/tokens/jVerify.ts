import verifier from "./verifier.ts";
import { SignVerifyOptions } from "./types.ts";
type JSONVerifier = SignVerifyOptions;

export default (o: JSONVerifier) =>
  typeof o.expires == "number"
    ? ((v) => (s: string) =>
      v(s) ? JSON.parse(atob(s.substring(13, s.indexOf(".")))) : null)(
        verifier(o),
      )
    : ((v) => (s: string) =>
      v(s) ? JSON.parse(atob(s.substring(0, s.indexOf(".")))) : null)(
        verifier(o),
      );
