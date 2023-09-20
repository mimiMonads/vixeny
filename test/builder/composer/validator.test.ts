import validator from "../../../builder/composer/validator.ts";
import assert from "node:assert";
import test from "node:test"

test(
  "composer",
  (_) =>
    assert.deepStrictEqual(
      validator({})(1)(-1)(["/", "/hello", "/test"]),
      's === "/" ? 1  :   s === "/hello" || s.indexOf("hello?") === 1 ? 2 :    s === "/test" || s.indexOf("test?") === 1 ? 3 :  -1',
    ),
);

test(
  "composer",
  (_) =>
    assert.deepStrictEqual(
      validator({})(1)(-1)(["/hello/", "/test/"]),
      's.indexOf("hello/") === 1 ? 1 :  s.indexOf("test/") === 1 ? 2 : -1',
    ),
);

test(
  "composer",
  (_) =>
    assert.deepStrictEqual(
      validator({})(1)(-1)(["/hello/:id/hello", "/test/:id/:bar"]),
      's.slice(1, a0 - 1) === "hello" && s.slice(a1).indexOf("hello") === 0  ? 1 :  s.indexOf("test/") === 1 ? 2 : -1',
    ),
);
