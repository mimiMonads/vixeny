import validator from "../../../builder/composer/validator.ts";
import { assertEquals } from "https://deno.land/std@0.160.0/testing/asserts.ts";

Deno.test(
  "composer",
  (_) =>
    assertEquals(
      validator({})(1)(-1)(["/", "/hello", "/test"]),
      's === "/" ? 1  :  s.indexOf("hello") === 1 ? 2 :  s.indexOf("test") === 1 ? 3 : -1',
    ),
);

Deno.test(
  "composer",
  (_) =>
    assertEquals(
      validator({})(1)(-1)(["/hello/", "/test/"]),
      's.indexOf("hello/") === 1 ? 1 :  s.indexOf("test/") === 1 ? 2 : -1',
    ),
);

Deno.test(
  "composer",
  (_) =>
    assertEquals(
      validator({})(1)(-1)(["/hello/:id/hello", "/test/:id/:bar"]),
      's.slice(1, a0 - 1) === "hello" && s.slice(a1).indexOf("hello") === 0  ? 1 :  s.indexOf("test/") === 1 ? 2 : -1',
    ),
);
