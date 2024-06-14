import mainCheck from "../../../src/composer/checkPetition/mainCheck.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { type Petition, petitions } from "../../../src/morphism.ts";

const pluginHello = {
  name: Symbol.for("hello"),
  isFunction: true,
  type: "string",
  f: () => () => () => "pluging",
};

const pluginMethod = {
  name: Symbol.for("method"),
  type: "string",
  f: () => () => () => "pluging",
};

const opt = {
  cyclePlugin: {
    hello: pluginHello,
    method: pluginMethod,
  },
};

// Test
Deno.test("check behaivour", async () => {
  assertEquals(
    mainCheck()(
      petitions.common()({
        path: "/test",
        f: () => "query",
      }),
    ),
    [],
  );
  assertEquals(
    mainCheck()(
      petitions.common()({
        path: "/test",
        f: (ctx) => ctx.query.hello ?? "hello",
      }),
    ),
    ["query"],
  );
});

Deno.test("check only behaivour", async () => {
  assertEquals(
    mainCheck()(
      petitions.common()({
        path: "/test",
        options: {
          only: ["query"],
        },
        f: () => "someString",
      }),
    ),
    ["query"],
  );

  assertEquals(
    mainCheck()(
      petitions.common()({
        path: "/test",
        options: {
          only: ["query"],
        },
        f: (ctx) => ctx.param.hello,
      }),
    ),
    ["query"],
  );

  assertEquals(
    mainCheck()(
      petitions.common()({
        path: "/test",
        options: {
          only: ["query"],
        },
        f: (ctx) => ctx.query.hello ?? "hello",
      }),
    ),
    ["query"],
  );

  assertEquals(
    mainCheck()(
      petitions.common()({
        path: "/test",
        options: {
          remove: ["query"],
          only: ["query"],
        },
        f: (ctx) => ctx.query.hello ?? "hello",
      }),
    ),
    ["query"],
  );

  assertEquals(
    mainCheck()(
      petitions.common()({
        path: "/test",
        options: {
          add: ["query"],
          only: ["query"],
        },
        f: (ctx) => ctx.query.hello ?? "hello",
      }),
    ),
    ["query"],
  );

  assertEquals(
    mainCheck()(
      petitions.common()({
        path: "/test",
        options: {
          remove: ["query"],
          add: ["query"],
          only: ["query"],
        },
        f: (ctx) => ctx.query.hello ?? "hello",
      }),
    ),
    ["query"],
  );
});

Deno.test("check remove behaivour", async () => {
  assertEquals(
    mainCheck()(
      petitions.common()({
        path: "/test",
        options: {
          remove: ["query"],
        },
        f: (ctx) => ctx.query.param ?? "hello",
      }),
    ),
    [],
  );
  assertEquals(
    mainCheck()(
      petitions.common()({
        path: "/test",
        options: {
          remove: ["query", "param"],
        },
        f: (ctx) => ctx.query.param ?? "hello",
      }),
    ),
    [],
  );

  //duplicate
  assertEquals(
    mainCheck()(
      petitions.common()({
        path: "/test",
        options: {
          remove: ["query", "param", "query"],
        },
        f: (ctx) => ctx.query.param ?? "hello",
      }),
    ),
    [],
  );
  //value not needed
  assertEquals(
    mainCheck()(
      petitions.common()({
        path: "/test",
        options: {
          remove: ["query", "param", "query", "req"],
        },
        f: (ctx) => ctx.query.param ?? "hello",
      }),
    ),
    [],
  );
});

Deno.test("check remove behaivour", async () => {
  assertEquals(
    mainCheck()(
      petitions.common()({
        path: "/test",
        options: {
          add: ["req"],
        },
        f: () => "hello",
      }),
    ),
    [],
  );
  //duplicates
  assertEquals(
    mainCheck()(
      petitions.common()({
        path: "/test",
        options: {
          add: ["req", "req"],
        },
        f: () => "hello",
      }),
    ),
    [],
  );
  //overrides remove and it's unique
  assertEquals(
    mainCheck()(
      petitions.common()({
        path: "/test",
        options: {
          remove: ["req"],
          add: ["req", "req"],
        },
        f: () => "hello",
      }),
    ),
    [],
  );
});

Deno.test("check plugins", async () => {
  assertEquals(
    mainCheck(opt)(
      petitions.common(opt)({
        path: "/test",
        f: (ctx) => ctx.hello(),
      }),
    ),
    ["hello"],
  );
  assertEquals(
    mainCheck(opt)(
      petitions.common(opt)({
        path: "/test",
        f: (ctx) => ctx.hello(),
        options: {
          add: ["hello"],
        },
      }),
    ),
    ["hello"],
  );
});
