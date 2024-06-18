import { assertEquals } from "@std/assert";
import validator from "../../../src/composer/checkPetition/checkTools.ts";
import { petitions } from "../../../main.ts";
import type { Petition } from "../../../src/morphism.ts";
import { test } from "@cross/test";
function testingSomething(ctx: string) {
  return ctx;
}
function testingSomething2() {
  return "hello";
}

test("Should return 'ctx' for single parameter arrow function", () => {
  assertEquals(validator.getArgsname((ctx) => ctx.params), "ctx");
});

test("Should return 'ctx' for named function with parameters", () => {
  assertEquals(validator.getArgsname(testingSomething), "ctx");
});

test("Should return an array of params for destructured parameters", () => {
  assertEquals(validator.getArgsname(({ params }) => params), ["params"]);
});

test("Should return an array of params for destructured parameters", () => {
  assertEquals(
    validator.getArgsname(
      (petitions.resolve()({
        f: async (c) => await c.req.json() as Object,
      }) as Petition).f,
    ),
    "c",
  );
});

test("Should return an array of multiple params for complex destructured function", () => {
  assertEquals(
    validator.getArgsname(function ({ params, hello, hi }) {
      return hi + params + hello;
    }),
    ["params", "hello", "hi"],
  );
});

test("Should return null for no parameter arrow function", () => {
  assertEquals(validator.getArgsname(() => "string"), null);
});

test("Should return null for no parameter standard function", () => {
  assertEquals(
    validator.getArgsname(function () {
      return "string";
    }),
    null,
  );
});

test("Should return null for no parameter named standard function", () => {
  assertEquals(validator.getArgsname(testingSomething2), null);
});
