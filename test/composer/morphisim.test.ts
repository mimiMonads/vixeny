import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import resolve from "../../src/composer/resolve/main.ts"
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
  f: async f=> await f.req.json(),
});

const asyncResolve = petitions.resolve()({
  resolve: {
    async: asyncNestedResolve,
  },
  f: (ctx) => ctx.resolve.async,
});

Deno.test("sync morpishim", async () => {

  const map = await resolve()("test")({
    nestedResolve : nestedResolve,
    sync: syncResolve
  })(new Request('http://test/'))



  assertEquals(map.sync,map.nestedResolve)
})

Deno.test("async morpishim", async () => {

  const map = await resolve()("test")({
    nestedResolve:asyncResolve
  })(new Request('http://test/', {
    body: '{"hello":1}',
    method: "POST"
  }))


  assertEquals(map.nestedResolve.hello, 1)
})