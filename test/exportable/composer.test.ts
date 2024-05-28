import { composer, petitions } from "../../main.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

const dummyRequest = new Request("http://heyINeedTOGoToSleep.com/");

Deno.test("exportable composer any", async () => {
  assertEquals(
    composer.anyRequest()({
      f: () => "hello",
    })(dummyRequest),
    "hello",
  );
  assertEquals(
    composer.anyRequest({
      cyclePlugin: {
        hello: {
          name: Symbol.for("hello"),
          isFunction: true,
          type: undefined,
          f: () => () => () => "hello",
        },
      },
    })({
      f: (ctx) => ctx.hello(),
    })(dummyRequest),
    "hello",
  );
  assertEquals(
    await composer.anyRequest()({
      f: async () => await Promise.resolve("hello"),
    })(dummyRequest),
    "hello",
  );
});
