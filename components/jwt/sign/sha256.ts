import { CryptoHasher } from "bun";

export default
  (sha256: (hash: TypedArray) => CryptoHasher) => (header=Buffer.from(JSON.stringify({
    alg: "HS256",
    typ: "JWT"
}) ).toString('base64url')  + ".") => (key: Buffer) =>
    (
      (hmac) => (message: Record<string, any>) =>
        (
            json =>
            header + json + "." +
            sha256(
              Buffer.concat([
                new Uint8Array(64).map((_x, i) => hmac[i] ^ 0x5c),
                sha256(
                  Buffer.concat([
                    new Uint8Array(64).map((_x, i) => hmac[i] ^ 0x36),
                    Buffer.from(header + json),
                  ])
                ).digest(),
              ])
            )
              .digest().toString("base64url")
        )(
            Buffer.from(JSON.stringify(message)).toString('base64url')
        )
    )(
      key.length > 64
        ? sha256(key).digest()
        : key.length < 64
        ? Buffer.concat([key, Buffer.alloc(64 - key.length)])
        : key
    );