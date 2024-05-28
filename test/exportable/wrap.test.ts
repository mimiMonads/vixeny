import { wrap } from "../../main.ts";
import { plugins } from "../../main.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

const pluginHello = {
  name: Symbol.for("hello"),
  isFunction: false,
  type: "string",
  f: () => () => () => "pluging",
};

const opt = {
  cyclePlugin: {
    hello: pluginHello,
  },
};

plugins.globalOptions(opt);

const wrapped = wrap(opt)()
  .stdPetition({
    path: "/stdHello",
    f: (ctx) => "stdHello",
  })
  .stdPetition({
    path: "/stdPlugin",
    f: (ctx) => ctx.hello(),
  })
  

const serve = wrapped.testRequests();

Deno.test("wrap checking std", async () => {
  assertEquals(
    await serve(
      new Request("http://example.com/stdHello"),
    ).then(
      (x) => x.text(),
    ),
    "stdHello",
  );
  assertEquals(
      await serve(
          new Request("http://example.com/stdPlugin")
      ).then(
          x=> x.text()
      )
      ,
      'pluging'
  )
});
