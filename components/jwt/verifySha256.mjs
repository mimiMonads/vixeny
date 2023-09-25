import verify from "./src/verify/sha256.mjs"
import nodeCrypto from "node:crypto"
import BufferProto from "node:buffer"

// const string = 
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.IntcImhlbGxvXCI6XCJoZWxsb1wifSI.2wL4qrJ52YoTB2Q921k_OoBU9j1HwEsfycbE2DhhUL0"

export default () => (
    rt => 
    verify(
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
)

// console.log( a()(new Uint8Array([..."dddddddd"]))(string))