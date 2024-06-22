import verify from "./src/verify/sha256.ts";
import args from "../runtime/name.ts";
import nodeCrypto from "node:crypto";
import BufferProto from "node:buffer";

args();

export default () =>
  (
    (rt) =>
      verify(
        //@ts-ignore
        rt === "Bun" ? Buffer : BufferProto.Buffer,
      )(
        rt === "Bun"
          //@ts-ignore
          ? (d) => new Bun.CryptoHasher("sha256").update(d)
          : (d: nodeCrypto.BinaryLike) =>
            nodeCrypto.createHash("sha256").update(d),
      )
  )(
    args(),
  );
