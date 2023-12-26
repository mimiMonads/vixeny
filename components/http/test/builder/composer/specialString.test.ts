import specialString from "../../../builder/composer/specialString.ts";
import assert from "node:assert";
import test from "node:test";

test(
  "hello",
  (_) =>
    assert.deepStrictEqual(
      specialString({ hasName: "http://localhost:8080/" })(12)([
        ["GET", "/", (_) => new Response(), false],
      ])("http://localhost:8080/"),
      10,
    ),
);
