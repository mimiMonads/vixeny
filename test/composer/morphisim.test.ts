import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import resolve from "../../src/composer/resolve/main.ts";
import branch from "../../src/composer/branch/branchMain.ts";
import { petitions } from "../../src/morphism.ts";

// Resolve

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
  f: async (f) => await f.req.json(),
});

const asyncResolve = petitions.resolve()({
  resolve: {
    async: asyncNestedResolve,
  },
  f: (ctx) => ctx.resolve.async,
});

// Branch

const nestedBranch = petitions.branch()({
  arguments: "string",
  f: (ctx) => ctx.arguments,
});

const asyncNestedBranch = petitions.branch()({
  f: async (ctx) => await ctx.req.json(),
});

// Test
Deno.test("sync resolve", async () => {
  const map = await resolve()("test")({
    nestedResolve: nestedResolve,
    sync: syncResolve,
  })(new Request("http://test/"));

  assertEquals(map.sync, map.nestedResolve);
});

Deno.test("async resolve", async () => {
  const map = await resolve()("test")({
    nestedResolve: asyncResolve,
  })(
    new Request("http://test/", {
      body: '{"hello":1}',
      method: "POST",
    }),
  );

  assertEquals(map.nestedResolve.hello, 1);
});

// Branch

Deno.test("sync branch", async () => {
  const map = await branch()("test")({
    sync: nestedBranch,
  })(new Request("http://test/"));

  assertEquals(map.sync("sync"), "sync");
});

Deno.test("async branch", async () => {
  const map = await branch()("test")({
    async: asyncNestedBranch,
  })(
    new Request("http://test/", {
      body: '{"hello":1}',
      method: "POST",
    }),
  );

  assertEquals(await map.async(), { hello: 1 });
});
