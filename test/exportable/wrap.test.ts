import { wrap } from "../../main.ts";
import { plugins } from "../../main.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import type { Petition } from "../../src/morphism.ts";

const pluginHello = {
  name: Symbol.for("hello"),
  isFunction: false,
  type: "string",
  f: () => () => () => "function",
};

const pluginMethod = {
  name: Symbol.for("method"),
  type: "string",
  f: () => () => () => " inCycle",
};

const opt = {
  cyclePlugin: {
    hello: pluginHello,
    method: pluginMethod,
  },
};

plugins.globalOptions(opt);

const wrapped = wrap(opt)()
  .stdPetition({
    path: "/stdHello",
    f: () => "stdHello",
  })
  .stdPetition({
    path: "/stdPlugin",
    f: (ctx) => ctx.hello() + ctx.method,
  })
  .customPetition({
    path: "/customHello",
    f: () => new Response("customHello"),
  })
  .customPetition({
    path: "/customsPlugin",
    f: (ctx) => new Response(ctx.hello() + ctx.method),
  });

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
      new Request("http://example.com/stdPlugin"),
    ).then(
      (x) => x.text(),
    ),
    "function inCycle",
  );
});

Deno.test("wrap checking costum", async () => {
  assertEquals(
    await serve(
      new Request("http://example.com/customHello"),
    ).then(
      (x) => x.text(),
    ),
    "customHello",
  );
  assertEquals(
    await serve(
      new Request("http://example.com/customsPlugin"),
    ).then(
      (x) => x.text(),
    ),
    "function inCycle",
  );
});

const identity = wrap({})();
const f = () => "test";

const a = wrap({})().stdPetition({
  path: "/a",
  f,
});
const b = wrap({})().stdPetition({
  path: "/b",
  f,
});
const c = a.union(b.unwrap());

const d = wrap({})().stdPetition({
  path: "/d",
  f,
});
const assoc1 = a.union(b.unwrap()).union(d.unwrap());
const assoc2 = a.union(b.union(d.unwrap()).unwrap());

const idTest1 = a.union(identity.unwrap());
const idTest2 = identity.union(a.unwrap());

Deno.test("wrap monoidal properties", async () => {
  assertEquals(
    c.unwrap(),
    [{ path: "/a", f, type: "base" }, {
      path: "/b",
      f,
      type: "base",
    }] as unknown as Petition[],
  );
  assertEquals(assoc1.unwrap(), [{ path: "/a", f, type: "base" }, {
    path: "/b",
    f,
    type: "base",
  }, { path: "/d", f, type: "base" }]) as unknown as Petition[];
  assertEquals(assoc2.unwrap(), [{ path: "/a", f, type: "base" }, {
    path: "/b",
    f,
    type: "base",
  }, { path: "/d", f, type: "base" }]) as unknown as Petition[];
  assertEquals(idTest1.unwrap(), [{
    path: "/a",
    f,
    type: "base",
  }]) as unknown as Petition[];
  assertEquals(idTest2.unwrap(), [{
    path: "/a",
    f,
    type: "base",
  }]) as unknown as Petition[];
});
