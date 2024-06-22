import type BufferProto from "node:buffer";
import type nodeCrypto from "node:crypto";

type HashFunction = (data: Uint8Array) => nodeCrypto.Hash;

export default (Buffer: typeof BufferProto.Buffer) =>
(sha256: HashFunction) =>
(
  header = Buffer.from(JSON.stringify({
    alg: "HS256",
    typ: "JWT",
  })).toString("base64url") + ".",
) =>
(key: Uint8Array) =>
  (
    (hmac) =>
      ((lf) => (rg: Uint8Array) => (message: Object) =>
        (
          (json) =>
            header + json + "." +
            sha256(
              Buffer.concat([
                lf,
                sha256(
                  Buffer.concat([
                    rg,
                    Buffer.from(header + json),
                  ]),
                ).digest(),
              ]),
            )
              .digest().toString("base64url")
        )(
          Buffer.from(JSON.stringify(message)).toString("base64url"),
        ))(new Uint8Array(64).map((_x, i) => hmac[i] ^ 0x5c))(
          new Uint8Array(64).map((_x, i) => hmac[i] ^ 0x36),
        )
  )(
    key.length > 64
      ? sha256(key).digest()
      : key.length < 64
      ? Buffer.concat([key, Buffer.alloc(64 - key.length)])
      : key,
  );
