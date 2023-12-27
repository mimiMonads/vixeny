import map from "../../../src/framework/builder/composer/map.ts";
import parameter from "../../../src/framework/builder/composer/parameters.ts";
import assert from "node:assert";
import test from "node:test";

test(
  "composer",
  (_) =>
    assert.deepStrictEqual(
      parameter(0)(map()("/test/:id/hello/")),
      ' s.slice(1, a0 - 1) === "test" && s.slice(a1).indexOf("hello") === 0  ? 0 : ',
    ),
);

test(
  "composer",
  (_) =>
    assert.deepStrictEqual(
      parameter(0)(map()("/test/:id/hello")),
      ' s.slice(1, a0 - 1) === "test" && s.slice(a1).indexOf("hello") === 0  ? 0 : ',
    ),
);

test(
  "composer",
  (_) =>
    assert.deepStrictEqual(
      parameter(0)(map()("/test/:id/:hello/")),
      ' s.indexOf("test/") === 1 ? 0 : ',
    ),
);
