import finder from "../../../src/components/parameters/finder.ts";
import assert from "node:assert";
import test from "node:test";
import map from "../../../src/components/parameters/map.ts";
import type { Petition } from "../../../src/morphism.ts";

test(
  "only one parameter at the end and query",
  (_) =>
    assert.deepStrictEqual(
      (new Function(
        ` return ${
          finder(
            map()({ f: (_) => "hello", path: "/test/:id/:hi" } as Petition),
          )
        }`,
      ))()("456/hi"),
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
      (new Function(
        ` return ${
          finder(
            map()({ f: (_) => "hello", path: "/:test/:id/:hi" } as Petition),
          )
        }`,
      ))()("test/456/hi"),
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
      (new Function(
        ` return ${
          finder(
            map()({ f: (_) => "hello", path: "/:test/:id/hi" } as Petition),
          )
        }`,
      ))()("test/456"),
      {
        id: "456",
        test: "test",
      },
    ),
);
