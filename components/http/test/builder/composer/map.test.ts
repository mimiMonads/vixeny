import map from "../../../builder/composer/map.ts";
import assert from "node:assert";
import test from "node:test";

test(
  "only one parameter at the end",
  (_) =>
    assert.deepStrictEqual(
      map({})("/test/:id"),
      {
        elements: [
          ":id",
        ],
        endsInSlash: false,
        firstParam: 5,
        lastParam: 0,
        path: "/test/:id",
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
      map({})("/test/:id/:acc/:x/"),
      {
        elements: [
          ":id",
          ":acc",
          ":x",
        ],
        endsInSlash: true,
        firstParam: 5,
        lastParam: 0,
        path: "/test/:id/:acc/:x/",
        hasName: undefined,
        list: [
          "test",
          ":id",
          ":acc",
          ":x",
        ],
        map: [
          false,
          true,
          true,
          true,
        ],
        startsWith: ":",
      },
    ),
);
