import signer from "./src/sign/sha256.ts";
import nodeCrypto from "node:crypto";
import BufferProto from "node:buffer";
import args from "../runtime/name.ts";

type HashFunction = (data: Uint8Array) => nodeCrypto.Hash;

export default () =>
  (
    (rt) =>
      signer(
        //@ts-ignore
        rt === "Bun" ? Buffer : BufferProto.Buffer,
      )(
        rt === "Bun"
          //@ts-ignore
          ? (d) => new Bun.CryptoHasher("sha256").update(d)
          : (d) => nodeCrypto.createHash("sha256").update(d),
      )
  )(
    args(),
  )();
