import options from "../../../components/parameters/map.ts";
import assert from "node:assert";
import test from "node:test"

test(
  "only one parameter at the end",
  (_) =>
    assert.deepStrictEqual(
      options({})({ path: "/test/:id", f: (_) => "hello" }),
      {
        elements: [
          ":id",
        ],
        endsInSlash: false,
        firstParam: 5,
        lastParam: 0,
        hasName: undefined,
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
      options({})({ path: "/test/:id/", f: (_) => "hello" }),
      {
        elements: [
          ":id",
        ],
        endsInSlash: true,
        firstParam: 5,
        lastParam: 1,
        hasName: undefined,
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
      options({})({ path: "/test/:id/hi", f: (_) => "hello" }),
      {
        elements: [
          ":id",
        ],
        endsInSlash: false,
        firstParam: 5,
        lastParam: 3,
        hasName: undefined,
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
      options({})({ path: "/test/:id/hi/", f: (_) => "hello" }),
      {
        elements: [
          ":id",
        ],
        endsInSlash: true,
        firstParam: 5,
        lastParam: 4,
        hasName: undefined,
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
      options({})({ path: "/test/:id/:test", f: (_) => "hello" }),
      {
        elements: [
          ":id",
          ":test",
        ],
        endsInSlash: false,
        firstParam: 5,
        lastParam: 0,
        hasName: undefined,
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
      options({})({ path: "/:test/:id/:hi", f: (_) => "hello" }),
      {
        elements: [
          ":test",
          ":id",
          ":hi",
        ],
        endsInSlash: false,
        firstParam: 0,
        lastParam: 0,
        hasName: undefined,
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
