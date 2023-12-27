import assert from "node:assert";
import test from "node:test";
import response from "../../src/framework/optimizer/response.ts";

test(
  "Response response",
  async (_) =>
    assert.deepStrictEqual(
      await (response()({
        path: "/hello/:id",
        f: (f) => JSON.stringify(f.param),
      })(new Request("http://localhost:8080/hello/hello"))).text(),
      '{"id":"hello"}',
    ),
);
test(
  "Response response",
  async (_) =>
    assert.deepStrictEqual(
      await (response()({
        path: "/hello/:id",
        type: "request",
        f: (f) => new Response(JSON.stringify(f.param)),
      })(new Request("http://localhost:8080/hello/hello"))).text(),
      '{"id":"hello"}',
    ),
);
