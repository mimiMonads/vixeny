import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import validator from "../../../src/composer/checkPetition/checkTools.ts";
import { petitions } from "../../../main.ts";
import type { Petition } from "../../../src/morphism.ts";

function testingSomething(ctx: string) {
  return ctx;
}
function testingSomething2() {
  return "hello";
}

Deno.test("Should return 'ctx' for single parameter arrow function", () => {
  assertEquals(validator.getArgsname((ctx) => ctx.params), "ctx");
});

Deno.test("Should return 'ctx' for named function with parameters", () => {
  assertEquals(validator.getArgsname(testingSomething), "ctx");
});

Deno.test("Should return an array of params for destructured parameters", () => {
  assertEquals(validator.getArgsname(({ params }) => params), ["params"]);
});

Deno.test("Should return an array of params for destructured parameters", () => {
  assertEquals(
    validator.getArgsname(
      (petitions.resolve()({
        f: async (c) => await c.req.json() as Object,
      }) as Petition).f,
    ),
    "c",
  );
});

Deno.test("Should return an array of multiple params for complex destructured function", () => {
  assertEquals(
    validator.getArgsname(function ({ params, hello, hi }) {
      return hi + params + hello;
    }),
    ["params", "hello", "hi"],
  );
});

Deno.test("Should return null for no parameter arrow function", () => {
  assertEquals(validator.getArgsname(() => "string"), null);
});

Deno.test("Should return null for no parameter standard function", () => {
  assertEquals(
    validator.getArgsname(function () {
      return "string";
    }),
    null,
  );
});

Deno.test("Should return null for no parameter named standard function", () => {
  assertEquals(validator.getArgsname(testingSomething2), null);
});
