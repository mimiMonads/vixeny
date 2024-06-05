import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import mainParameters from "../../../src/components/parameters/mainParameters.ts";
import { petitions, plugins } from "../../../main.ts";

const base = "http://hello.com"

const options = plugins.globalOptions({
  indexBase:{
    bind: base + '/'
  }
})

Deno.test("parameters unique", () => {
  assertEquals(
    mainParameters()(
      petitions.common()({
        path: "/hello/nested/:hi",
        param: {
          unique: true
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
          unique: true
        },
        f: (ctx) => ctx.param,
      }),
    )(base +  "/hello/nested/helloWorld2?hi=hi"),
    "helloWorld2",
  );
  assertEquals(
    mainParameters()(
      petitions.common()({
        path: "/hello/nested/:hi/",
        param: {
          unique: true
        },
        f: (ctx) => ctx.param,
      }),
    )(base + "/hello/nested/helloWorld3/"),
    "helloWorld3",
  );
  assertEquals(
    mainParameters()(
      petitions.common()({
        path: "/hello/nested/:hi/",
        param: {
          unique: true
        },
        f: (ctx) => ctx.param,
      }),
    )(base +  "/hello/nested/helloWorld4/"),
    "helloWorld4",
  );
  assertEquals(
    mainParameters(options)(
      petitions.common()({
        path: "/hello/nested/:hi",
        param: {
          unique: true
        },
        f: (ctx) => ctx.param,
      }),
    )(base + "/hello/nested/helloWorld5"),
    "helloWorld5",
  );
  assertEquals(
    mainParameters(options)(
      petitions.common()({
        path: "/hello/nested/:hi",
        param: {
          unique: true
        },
        f: (ctx) => ctx.param,
      }),
    )(base +  "/hello/nested/helloWorld6?hi=hi"),
    "helloWorld6",
  );

  //checks that it's using a different function, validated that the last to `asserts` are working
  assertEquals(
    mainParameters(options)(
      petitions.common()({
        path: "/hello/nested/:hi",
        param: {
          unique: true
        },
        f: (ctx) => ctx.param,
      }),
    ).toString() === mainParameters()(
      petitions.common()({
        path: "/hello/nested/:hi",
        param: {
          unique: true
        },
        f: (ctx) => ctx.param,
      }),
    ).toString(),
    false
  )


});



Deno.test("parameters single", () => {
  assertEquals(
    mainParameters()(
      petitions.common()({
        path: "/hello/nested/:hi",
        f: (ctx) => ctx.param.hi,
      }),
    )(base + "/hello/nested/helloWorld1"),
    {
      hi: "helloWorld1"
    },
  );
  assertEquals(
    mainParameters()(
      petitions.common()({
        path: "/hello/nested/:hi",
        f: (ctx) => ctx.param.hi,
      }),
    )(base +  "/hello/nested/helloWorld2?hi=hi"),
    {
      hi: "helloWorld2"
    },
  );
  assertEquals(
    mainParameters()(
      petitions.common()({
        path: "/hello/nested/:hi/",
        f: (ctx) => ctx.param.hi,
      }),
    )(base + "/hello/nested/helloWorld3/"),
    {
      hi: "helloWorld3"
    },
  );
  assertEquals(
    mainParameters()(
      petitions.common()({
        path: "/hello/nested/:hi/",
        f: (ctx) => ctx.param.hi,
      }),
    )(base +  "/hello/nested/helloWorld4/"),
    {
      hi: "helloWorld4"
    },
  );
  assertEquals(
    mainParameters(options)(
      petitions.common()({
        path: "/hello/nested/:hi",
        f: (ctx) => ctx.param.hi,
      }),
    )(base + "/hello/nested/helloWorld5"),
    {
      hi: "helloWorld5"
    },
  );
  assertEquals(
    mainParameters(options)(
      petitions.common()({
        path: "/hello/nested/:hi",
        f: (ctx) => ctx.param.hi,
      }),
    )(base +  "/hello/nested/helloWorld6?hi=hi"),
    {
      hi: "helloWorld6"
    },
  );
});
