import signer from "./src/sign/sha256.mjs";
import nodeCrypto from "node:crypto";
import BufferProto from "node:buffer";
import name from "../runtime/name.mjs";

export default () =>
  (
    (rt) =>
      signer(
        rt === "Bun" ? Buffer : BufferProto.Buffer,
      )(
        rt === "Bun"
          ? (d) => new Bun.CryptoHasher("sha256").update(d)
          : (d) => nodeCrypto.createHash("sha256").update(d),
      )
  )(
    name(),
  )();
