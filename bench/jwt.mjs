import sign from "../components/jwt/signSha256.mjs";
import verifySha256 from "../components/jwt/verifySha256.mjs";
import { bench , run } from "mitata";
import * as jose from 'jose'


const payload = {
    sub: "1234567890",
    name: "John Doe",
    iat: 1516239022
}

const secret = new TextEncoder().encode(
  'cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2',
)
const header = {
    alg: "HS256",
    typ: "JWT"
};

const s = sign()(secret)
const v = verifySha256()(secret)
const signature = sign()(secret)(payload)

bench('Jose / sign', async () => {  await new jose.SignJWT(payload)
    .setProtectedHeader(header)
     .sign(secret)})

bench('V / sign',  () => {s(payload)})
bench('V / verify',  () => {v(signature)})


await run()
