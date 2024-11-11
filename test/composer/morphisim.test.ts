import { assertEquals } from "@std/assert";
import resolve from "../../src/composer/resolve/main.ts";
import branch from "../../src/composer/branch/branchMain.ts";
import { petitions } from "../../src/morphism.ts";
import { test } from "@cross/test";
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
  args: "string",
  f: (ctx) => ctx.args,
});

const asyncNestedBranch = petitions.branch()({
  f: async (ctx) => await ctx.req.json(),
});

// Test
test("sync resolve", async () => {
  const map = await (await resolve()("test")({
    nestedResolve: nestedResolve,
    sync: syncResolve,
  }))(new Request("http://test/"));

  assertEquals(map.sync, map.nestedResolve);
});

test("async resolve", async () => {
  const map = await (await resolve()("test")({
    nestedResolve: asyncResolve,
  }))(
    new Request("http://test/", {
      body: '{"hello":1}',
      method: "POST",
    }),
  );

  assertEquals(map.nestedResolve.hello, 1);
});

// Branch

test("sync branch", async () => {
  const map = await (await branch()("test")({
    sync: nestedBranch,
  }))(new Request("http://test/"));

  assertEquals(map.sync("sync"), "sync");
});

test("async branch", async () => {
  const map = await (await branch()("test")({
    async: asyncNestedBranch,
  }))(
    new Request("http://test/", {
      body: '{"hello":1}',
      method: "POST",
    }),
  );

  assertEquals(await map.async(), { hello: 1 });
});
