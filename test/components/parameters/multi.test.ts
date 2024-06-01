import multi from "../../../src/components/parameters/multi.ts";
import map from "../../../src/components/parameters/map.ts";
import assert from "node:assert";
import test from "node:test";
import type { Petition } from "../../../src/morphism.ts";

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
            } as Petition),
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
            } as Petition),
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
            } as Petition),
          )
        }`,
      )()("http://localhost:8080/test/hello/world"),
      {
        id: "hello",
        test: "test",
      },
    ),
);
