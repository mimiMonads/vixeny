import signer from "./src/sign/sha256.mjs"
import nodeCrypto from "node:crypto"
import BufferProto from "node:buffer"



export default () => (
     rt => 
     signer(
        rt === "Bun" ? Buffer : BufferProto.Buffer
     )(
        rt  === "Bun" ? d => new Bun.CryptoHasher("sha256").update(d) : d => nodeCrypto.createHash("sha256").update(d)
     )
)(
    typeof Bun !== "undefined"
        ? "Bun"
        : typeof Bun !== "undefined"
            ? "Deno"
            : "Node"
)()


