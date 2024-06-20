import { assertEquals } from "@std/assert";
import { test } from "@cross/test";

import signSha256 from "../../../src/components/jwt/signSha256.ts";
import { wrap } from "../../../main.ts";

const secret = new Uint8Array([1, 2, 3, 4, 5, 6]);
const sign = signSha256()(secret);

const request = new Request("http://localhost:3000/", {
  headers: new Headers(
    [[
      "cookie",
      `hello=${sign({ hi: 1 })}`,
    ]],
  ),
});

const invalidRequest = new Request("http://localhost:3000/", {
  headers: new Headers(
    [[
      "cookie",
      `hello=12`,
    ]],
  ),
});

const hiRequest = new Request("http://localhost:3000/", {
  headers: new Headers(
    [[
      "cookie",
      `hi=${sign({ hi: 1 })}`,
    ]],
  ),
});

test("jwt signing with an element", async () => {
  assertEquals(
    await wrap()()
      .stdPetition({
        path: "/",
        crypto: {
          globalKey: secret,
        },
        f: ({ token }) => token.hello ? "valid" : "invalid",
      }).testRequests()(request).then((x) => x.text()),
    "valid",
  );
});

test("jwt signing with an invalid request", async () => {
  assertEquals(
    await wrap()()
      .stdPetition({
        path: "/",
        crypto: {
          globalKey: secret,
        },
        f: ({ token }) => token.hello ? "valid" : "invalid",
      }).testRequests()(invalidRequest).then((x) => x.text()),
    "invalid",
  );
});

test("jwt signing with a valid request but not using the right cookie", async () => {
  assertEquals(
    await wrap()()
      .stdPetition({
        path: "/",
        crypto: {
          globalKey: secret,
        },
        f: ({ token }) => token.hello ? "valid" : "invalid",
      }).testRequests()(hiRequest).then((x) => x.text()),
    "invalid",
  );
});
