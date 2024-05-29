import { composer, plugins } from "../../main.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { petitions } from "../../main.ts";


const dummyRequest = new Request("http://heyINeedTOGoToSleep.com/");
const opt = plugins.globalOptions({
    cyclePlugin: {
      hello: {
        name: Symbol.for("hello"),
        isFunction: true,
        type: undefined,
        f: () => () => () => "hello",
      },
    },
  })


  

Deno.test("exportable composer any", async () => {
  assertEquals(
    composer.anyRequest()({
      f: () => "hello",
    })(dummyRequest),
    "hello",
  );
  assertEquals(
    composer.anyRequest(opt)({
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
