import assert from "node:assert";
import test from "node:test";
import { wrap } from "../../main.ts";

const wrapAt4 = wrap({
  indexBase: {
    at: 4,
  },
})()
  .stdPetition({
    path: "/hello",
    f: () => "from inside",
  }).compose();

const serve = wrap()()
  .petitionWithoutCTX({
    path: "/hello/*",
    r: wrapAt4,
  }).testRequests();

const req = new Request("http://hello.com/hello/hello");

test("Router checking `at`", async () => {
  assert.strictEqual(
    await (await serve(req)).text(),
    "from inside",
  );
});
