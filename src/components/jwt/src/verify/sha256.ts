import type BufferProto from "node:buffer";
import type { BinaryLike } from "node:crypto";
import type nodeCrypto from "node:crypto";

type HashFunction = (data: BinaryLike) => nodeCrypto.Hash;
const enconder = new TextEncoder();

export default (Buffer: typeof BufferProto.Buffer) =>
(hash: HashFunction) =>
(key: Uint8Array) =>
  (
    (hmac) =>
      (
        (lf) => (rg: Uint8Array) => (message: string) =>
          message.substring(message.lastIndexOf(".") + 1) ===
              hash(
                concatUint8Arrays(
                  lf,
                  hash(
                    concatUint8Arrays(
                      rg,
                      enconder.encode(
                        message.substring(0, message.lastIndexOf(".")),
                      ),
                    ),
                  ).digest() as unknown as Uint8Array,
                ),
              )
                .digest()
                .toString("base64url")
            ? JSON.parse(
              Buffer.from(
                message.substring(
                  message.indexOf(".") + 1,
                  message.lastIndexOf("."),
                ),
                "base64url",
              ).toString(),
            )
            : null
      )(new Uint8Array(64).map((_x, i) => hmac[i] ^ 0x5c))(
        new Uint8Array(64).map((_x, i) => hmac[i] ^ 0x36),
      )
  )(
    key.length > 64
      ? Uint8Array.of(...hash(key).digest())
      : key.length < 64
      ? Uint8Array.of(...Buffer.concat([key, Uint8Array.of(64 - key.length)]))
      : key,
  );

const concatUint8Arrays = (a: Uint8Array, b: ArrayLike<number>) => {
  let result = new Uint8Array(a.length + b.length);
  result.set(a, 0);
  result.set(b, a.length);
  return result;
};
