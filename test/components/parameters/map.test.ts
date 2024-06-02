import map from "../../../src/components/parameters/map.ts";
import assert from "node:assert";
import test from "node:test";
import type { Petition } from "../../../src/morphism.ts";

test(
  "only one parameter at the end",
  (_) =>
    assert.deepStrictEqual(
      map({})({ path: "/test/:id", f: (_) => "hello" } as Petition),
      {
        elements: [
          ":id",
        ],
        endsInSlash: false,
        firstParam: 5,
        lastParam: 0,
        bind: undefined,
        list: [
          "test",
          ":id",
        ],
        map: [
          false,
          true,
        ],
        startsWith: ":",
      },
    ),
);

test(
  "only one parameter at the end",
  (_) =>
    assert.deepStrictEqual(
      map({})({ path: "/test/:id/", f: (_) => "hello" } as Petition),
      {
        elements: [
          ":id",
        ],
        endsInSlash: true,
        firstParam: 5,
        lastParam: 1,
        bind: undefined,
        list: [
          "test",
          ":id",
        ],
        map: [
          false,
          true,
        ],
        startsWith: ":",
      },
    ),
);

test(
  "only one parameter at the end",
  (_) =>
    assert.deepStrictEqual(
      map({})({ path: "/test/:id/hi", f: (_) => "hello" } as Petition),
      {
        elements: [
          ":id",
        ],
        endsInSlash: false,
        firstParam: 5,
        lastParam: 3,
        bind: undefined,
        list: [
          "test",
          ":id",
          "hi",
        ],
        map: [
          false,
          true,
          false,
        ],
        startsWith: ":",
      },
    ),
);

test(
  "only one parameter at the end",
  (_) =>
    assert.deepStrictEqual(
      map({})({ path: "/test/:id/hi/", f: (_) => "hello" } as Petition),
      {
        elements: [
          ":id",
        ],
        endsInSlash: true,
        firstParam: 5,
        lastParam: 4,
        bind: undefined,
        list: [
          "test",
          ":id",
          "hi",
        ],
        map: [
          false,
          true,
          false,
        ],
        startsWith: ":",
      },
    ),
);

test(
  "only one parameter at the end",
  (_) =>
    assert.deepStrictEqual(
      map({})({ path: "/test/:id/:test", f: (_) => "hello" } as Petition),
      {
        elements: [
          ":id",
          ":test",
        ],
        endsInSlash: false,
        firstParam: 5,
        lastParam: 0,
        bind: undefined,
        list: [
          "test",
          ":id",
          ":test",
        ],
        map: [
          false,
          true,
          true,
        ],
        startsWith: ":",
      },
    ),
);

test(
  "only one parameter at the end",
  (_) =>
    assert.deepStrictEqual(
      map({})({ path: "/:test/:id/:hi", f: (_) => "hello" } as Petition),
      {
        elements: [
          ":test",
          ":id",
          ":hi",
        ],
        endsInSlash: false,
        firstParam: 0,
        lastParam: 0,
        bind: undefined,
        list: [
          ":test",
          ":id",
          ":hi",
        ],
        map: [
          true,
          true,
          true,
        ],
        startsWith: ":",
      },
    ),
);
