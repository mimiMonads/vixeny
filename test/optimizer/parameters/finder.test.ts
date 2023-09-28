import finder from "../../../components/parameters/finder.ts";
import assert from "node:assert";
import test from "node:test";
import options from "../../../components/parameters/map.ts";

test(
  "only one parameter at the end and query",
  (_) =>
    assert.deepStrictEqual(
      (new Function(` return ${
        finder(options()({ f: (_) => "hello", path: "/test/:id/:hi" }))
      }`))()("456/hi"),
      {
        hi: "hi",
        id: "456",
      },
    ),
);

test(
  "only one parameter at the end and query",
  (_) =>
    assert.deepStrictEqual(
      (new Function(` return ${
        finder(options()({ f: (_) => "hello", path: "/:test/:id/:hi" }))
      }`))()("test/456/hi"),
      {
        hi: "hi",
        id: "456",
        test: "test",
      },
    ),
);

test(
  "only one parameter at the end and query",
  (_) =>
    assert.deepStrictEqual(
      (new Function(` return ${
        finder(options()({ f: (_) => "hello", path: "/:test/:id/hi" }))
      }`))()("test/456"),
      {
        id: "456",
        test: "test",
      },
    ),
);
