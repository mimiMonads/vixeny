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
  })
  .stdPetition({
    path: "/hello/:hello",
    f: ({ param }) => param.hello,
  })
  .compose();

const serve = wrap()()
  .petitionWithoutCTX({
    path: "/hello/*",
    r: wrapAt4,
  }).testRequests();

const base = "http://hello.com/hello";
const req = new Request(base + "/hello");
const param = new Request(base + "/hello/hello");

test("Router checking `at`", async () => {
  assert.strictEqual(
    await serve(req).then((x) => x.text()),
    "from inside",
  );

  assert.strictEqual(
    await serve(param).then((x) => x.text()),
    "hello",
  );
});
