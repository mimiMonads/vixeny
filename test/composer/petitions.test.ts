import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import compose from "../../src/composer/compose.ts";
import { petitions } from "../../src/morphism.ts";

const nestedResolve = petitions.resolve()({
  f: (_) => "syncResolve",
});
const syncResolve = petitions.resolve()({
  resolve: {
    sync: nestedResolve,
  },
  f: (ctx) => ctx.resolve.sync,
});

const asyncNestedResolve = petitions.resolve()({
  f: async (_) => await new Promise((resolve) => {
    setTimeout(() => {
      resolve("foo");
    }, 300);
  }).then( _ => 'hello')
});

const asyncResolve = petitions.resolve()({
  resolve: {
    async: asyncNestedResolve,
  },
  f: (ctx) => ctx.resolve.async,
});

Deno.test("base case", async () => {
  const base = await compose()({
    type: "base",
    path: "/",
    f: (_) => "base",
  })(new Request("http://hello.com/"));

  const baseWithHeadings = await compose()({
    type: "base",
    path: "/",
    headings: {
      status: 201,
      statusText: "statusTextBase",
      headers: ".html",
    },
    f: (_) => "baseWithHeadings",
  })(new Request("http://hello.com/"));

  assertEquals(await base.text(), "base");
  assertEquals(base.status, 200);

  assertEquals(await baseWithHeadings.text(), "baseWithHeadings");
  assertEquals(baseWithHeadings.status, 201);
  assertEquals(baseWithHeadings.statusText, "statusTextBase");
  assertEquals(baseWithHeadings.headers.get("content-type"), "text/html");
});

Deno.test("base case with resolve", async () => {
  const baseResponse = petitions.common()({
    path: "/",
    resolve: {
      sync: syncResolve,
    },
    f: (ctx) => ctx.resolve.sync,
  });

  const base = await compose()(
    baseResponse,
  )(new Request("http://hello.com/"));

  assertEquals(await base.text(), "syncResolve");
  assertEquals(base.status, 200);
});

Deno.test("request case with resolve", async () => {
  const stdResponse = petitions.standart()({
    path: "/",
    resolve: {
      sync: syncResolve,
    },
    f: (ctx) => new Response(ctx.resolve.sync),
  });

  const request = await compose()(stdResponse)(new Request("http://hello.com/"))


  assertEquals(await request.text(), "syncResolve");
   assertEquals(request.status, 200);
});


