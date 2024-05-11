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
  f: async (_) => await Promise.resolve("syncResolve"),
});

const asyncResolve = petitions.resolve()({
  resolve: {
    async: asyncNestedResolve,
  },
  f: (ctx) => ctx.resolve.async,
});
