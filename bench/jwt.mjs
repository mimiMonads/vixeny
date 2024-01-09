import signSha256 from "../components/jwt/signSha256.mjs";
import verifySha256 from "../components/jwt/verifySha256.mjs";
import parseArguments from "../components/runtime/parseArguments.mjs";

const args = parseArguments();

import { bench, group, run } from "mitata";
import * as jose from "jose";

const payload = {
  sub: "1234567890",
  name: "John Doe",
  iat: 1516239022,
};

const secret = new Uint8Array([
  ..."cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2",
]);
const header = {
  alg: "HS256",
  typ: "JWT",
};

const fr = () => ({
  time: performance.now(),
});

const s = signSha256()(secret);
const v = verifySha256()(secret);
const signature = signSha256()(secret)(payload);

group("Sign", () => {
  bench("Jose", async () => {
    await new jose.SignJWT(payload)
      .setProtectedHeader(header)
      .sign(secret);
  });

  bench("Vixeny JWT", () => {
    s(payload);
  });
});

group("Verify", () => {
  bench("Jose", async () => await jose.jwtVerify(signature, secret));
  bench("Vixeny JWT", () => {
    v(signature);
  });
});

group("Anti-catching", () => {
  bench("Jose", async () => {
    await jose.jwtVerify(
      await new jose.SignJWT(fr())
        .setProtectedHeader(header)
        .sign(secret),
      secret,
    );
  });

  bench("Vixeny JWT", () => {
    v(s(fr()));
  });
});

await run({
  json: "json" in args,
});
