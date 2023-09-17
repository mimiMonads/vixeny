import { CryptoHasher } from "bun";

export default     (hash: (hash: StringOrBuffer) => CryptoHasher) =>
(key: Buffer | TypedArray) =>
  (
    (hmac) => (message: string) =>
      message.substring(message.lastIndexOf(".") + 1) ===
      hash(
        Buffer.concat([
          new Uint8Array(64).map((_x, i) => hmac[i] ^ 0x5c),
          hash(
            Buffer.concat([
              new Uint8Array(64).map((_x, i) => hmac[i] ^ 0x36),
              Buffer.from(message.substring(0, message.lastIndexOf("."))),
            ])
          ).digest(),
        ]) as unknown as TypedArray
      )
        .digest()
        .toString("base64url")
        ? JSON.parse(
            Buffer.from(
              message.substring(
                message.indexOf(".") + 1,
                message.lastIndexOf(".")
              ),
              "base64url"
            ).toString() 
          ) as string
        : null
  )(
    key.length > 64
      ? hash(key).digest()
      : key.length < 64
      ? Buffer.concat([key, Buffer.alloc(64 - key.length)])
      : key
  );
