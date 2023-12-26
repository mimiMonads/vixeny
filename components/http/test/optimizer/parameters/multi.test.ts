import multi from "../../../components/parameters/multi.ts";
import options from "../../../components/parameters/map.ts";
import assert from "node:assert";
import test from "node:test";

test(
  "param",
  (_) =>
    assert.deepStrictEqual(
      new Function(
        ` return ${
          multi(
            options({ hasName: "http://localhost:8080/" })({
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
            options({ hasName: "http://localhost:8080/" })({
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
            options({ hasName: "http://localhost:8080/" })({
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
