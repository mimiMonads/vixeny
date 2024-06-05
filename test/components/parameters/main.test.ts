import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import mainParameters from "../../../src/components/parameters/mainParameters.ts";
import { petitions } from "../../../main.ts";

const base = "http://hello.com"

Deno.test("Unique", () => {
  assertEquals(
    mainParameters()(
      petitions.common()({
        path: "/hello/nested/:hi",
        param: {
          unique: true,
        },
        f: (ctx) => ctx.param,
      }),
    )(base + "/hello/nested/helloWorld1"),
    "helloWorld1",
  );
  assertEquals(
    mainParameters()(
      petitions.common()({
        path: "/hello/nested/:hi",
        param: {
          unique: true,
        },
        f: (ctx) => ctx.param,
      }),
    )(base +  "/hello/nested/helloWorld2?hi=hi"),
    "helloWorld2",
  );
});
