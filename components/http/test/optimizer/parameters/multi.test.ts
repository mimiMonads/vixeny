import multi from "../../../src/parameters/multi.ts";
import map from "../../../src/parameters/map.ts";
import assert from "node:assert";
import test from "node:test";

test(
  "param",
  (_) =>
    assert.deepStrictEqual(
      new Function(
        ` return ${
          multi(
            map({ hasName: "http://localhost:8080/" })({
              path: "/test/:id/:hello",
              f: (_) => "hello",
            }),
          )
        }`,
      )()("http://localhost:8080/test/hello/world"),
      {
        hello: "world",
        id: "hello",
      },
    ),
);
test(
  "param",
  (_) =>
    assert.deepStrictEqual(
      new Function(
        ` return ${
          multi(
            map({ hasName: "http://localhost:8080/" })({
              path: "/:test/:id/:hello",
              f: (_) => "hello",
            }),
          )
        }`,
      )()("http://localhost:8080/test/hello/world"),
      {
        hello: "world",
        id: "hello",
        test: "test",
      },
    ),
);
test(
  "param",
  (_) =>
    assert.deepStrictEqual(
      new Function(
        ` return ${
          multi(
            map({ hasName: "http://localhost:8080/" })({
              path: "/:test/:id/hello",
              f: (_) => "hello",
            }),
          )
        }`,
      )()("http://localhost:8080/test/hello/world"),
      {
        id: "hello",
        test: "test",
      },
    ),
);
