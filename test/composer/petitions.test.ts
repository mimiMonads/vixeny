import { assertEquals } from "@std/assert";
import { test } from "@cross/test";
import compose from "../../src/composer/compose.ts";
import { petitions } from "../../src/morphism.ts";
import { plugins } from "../../main.ts";

const GLOBAL_REQUEST = new Request("http://test/");

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
  f: async (c) => await c.req.json() as Object,
});

const asyncResolve = petitions.resolve()({
  resolve: {
    async: asyncNestedResolve,
  },
  f: (ctx) => ctx.resolve.async,
});

const getArray = petitions.branch()({
  f: () => "args",
});

const getString = petitions.branch()({
  args: "string",
  f: ({ args }) => args,
});

const hello = plugins.type({
  name: Symbol.for("hello"),
  isFunction: true,
  type: undefined,
  f: () => () => "hello",
});

const hello2 = plugins.type({
  name: Symbol.for("awaited"),
  isFunction: false,
  isAsync: true,
  type: undefined,
  f: async () => {
    const awaited = await new Promise((res) => res("hi")).then((x) =>
      x
    ) as string;

    return (_) => awaited;
  },
});

const hello3 = plugins.type({
  name: Symbol.for("awaited2"),
  isFunction: true,
  isAsync: false,
  type: undefined,
  f: async () => {
    const awaited = await new Promise((res) => res("hi2")).then((x) =>
      x
    ) as string;

    return () => awaited;
  },
});

const hello4 = plugins.type({
  name: Symbol.for("awaited4"),
  isFunction: true,
  isAsync: true,
  type: undefined,
  f: async () => {
    return async () =>
      await new Promise((res) => res("hi2")).then((x) => x) as string;
  },
});

const sealedPetiton = petitions.sealableAdd(
  {
    cyclePlugin: {
      hello2,
      hello3,
      hello4,
    },
  },
)({
  cyclePlugin: {
    hello,
  },
})({
  // We are not using hello4 here, just checking the type keeps the Promise<string>
  f: ({ hello, hello2, hello3, hello4 }) => hello() + hello2 + hello3(),
});

test("UWU case", async () => {
  const base = await (await compose()(sealedPetiton))(
    new Request("http://hello.com/"),
  );

  assertEquals(await base.text(), "hellohihi2");
  assertEquals(base.status, 200);
});

test("base case", async () => {
  const base = await (await compose()({
    type: "base",
    path: "/",
    f: (_) => "base",
  }))(new Request("http://hello.com/"));

  const baseWithHeadings = await (await compose()({
    type: "base",
    path: "/",
    headings: {
      status: 201,
      statusText: "statusTextBase",
      headers: ".html",
    },
    f: (_) => "baseWithHeadings",
  }))(new Request("http://hello.com/"));

  assertEquals(await base.text(), "base");
  assertEquals(base.status, 200);

  assertEquals(await baseWithHeadings.text(), "baseWithHeadings");
  assertEquals(baseWithHeadings.status, 201);
  assertEquals(baseWithHeadings.statusText, "statusTextBase");
  assertEquals(baseWithHeadings.headers.get("content-type"), "text/html");
});

test("base case with resolve", async () => {
  const baseResponse = petitions.common()({
    path: "/",
    resolve: {
      sync: syncResolve,
    },
    f: (ctx) => ctx.resolve.sync,
  });

  const base = await (await compose()(
    baseResponse,
  ))(new Request("http://hello.com/"));

  assertEquals(await base.text(), "syncResolve");
  assertEquals(base.status, 200);
});

test("base case with async resolve", async () => {
  const baseResponse = petitions.common()({
    path: "/",
    resolve: {
      async: asyncResolve,
    },
    f: (ctx) => JSON.stringify(ctx.resolve.async),
  });

  const base = await (await compose()(
    baseResponse,
  ))(
    new Request("http://test/", {
      body: '{"hello":1}',
      method: "POST",
    }),
  );

  assertEquals(await base.json(), { "hello": 1 });
  assertEquals(base.status, 200);
});

test("standard case", async () => {
  const base = await (await compose()({
    type: "request",
    path: "/",
    f: (_) => new Response("request"),
  }))(new Request("http://hello.com/"));

  assertEquals(await base.text(), "request");
  assertEquals(base.status, 200);
});

test("standard case with resolve", async () => {
  const baseResponse = petitions.custom()({
    path: "/",
    resolve: {
      sync: syncResolve,
    },
    f: (ctx) => new Response(ctx.resolve.sync),
  });

  const base = await (await compose()(
    baseResponse,
  ))(new Request("http://hello.com/"));

  assertEquals(await base.text(), "syncResolve");
  assertEquals(base.status, 200);
});

test("standard case with resolve", async () => {
  const baseResponse = petitions.custom()({
    path: "/",
    resolve: {
      syncResolve,
    },
    branch: {
      getArray,
      getString,
    },
    f: ({ branch, resolve }) =>
      new Response(
        `${resolve.syncResolve} ${branch.getArray(null)} ${
          branch.getString("hello")
        }`,
      ),
  });

  const base = await (await compose()(
    baseResponse,
  ))(new Request("http://hello.com/"));

  assertEquals(await base.text(), "syncResolve args hello");
  assertEquals(base.status, 200);
});

test("standard case with async resolve", async () => {
  const baseResponse = petitions.custom()({
    path: "/",
    resolve: {
      asyncResolve,
    },
    f: (ctx) => new Response(JSON.stringify(ctx.resolve.asyncResolve)),
  });

  const base = await (await compose()(
    baseResponse,
  ))(
    new Request("http://test/", {
      body: '{"hello":1}',
      method: "POST",
    }),
  );

  assertEquals(await base.json(), { "hello": 1 });
  assertEquals(base.status, 200);
});

test("Add ", async () => {

  assertEquals(
    await(await((await compose()(
      petitions.add()({
        path: "/",
        f: () => "add",
      }),
    )))(GLOBAL_REQUEST)).text(),
    "add",
    "Checks if add is working",
  );

  assertEquals(
    await(await((await compose()(
      petitions.add()({
        lazy: true,
        path: "/",
        f: () => "add",
      }),
    )))(GLOBAL_REQUEST)).text(),
    "add",
    "Checks if add is working with lazy",
  );

  assertEquals(
    await(await((await compose()(
      petitions.add()({
        headings: {
          headers: '.html'
        },
        path: "/",
        f: () => "add",
      }),
    )))(GLOBAL_REQUEST)),
    null,
    "Checks if add is working with headers",
  );

  assertEquals(
    await(await((await compose()(
      petitions.add()({
        lazy: true,
        path: "/",
        f: () => "add",
      }),
    )))(GLOBAL_REQUEST)).text(),
    "add",
    "Checks if add is working with lazy",
  );

  assertEquals(
    await(await((await compose()(
      petitions.add()({
        path: "/",
        f: async () => await "add",
      }),
    )))(GLOBAL_REQUEST)).text(),
    "add",
    "Checks if add is working async",
  );

  assertEquals(
    await(await((await compose()(
      petitions.add()({
        path: "/",
        f: () => new Response("add"),
      }),
    )))(GLOBAL_REQUEST)).text(),
    "add",
    "Checks if add is working with Response",
  );

  assertEquals(
    await(await((await compose()(
      petitions.add()({
        path: "/",
        f: async () => await new Response("add"),
      }),
    )))(GLOBAL_REQUEST)).text(),
    "add",
    "Checks if add is working with Response",
  );


});

test("Sealed add", async () => {
  const getWithHeaders = petitions.sealableAdd({})({})({
    // headings: {
    //   headers: {
    //     hello: 'hello'
    //   }
    // },
    f: ({ headers }) => headers.hello ?? "lol",
  });

  const composed = await (await compose()(getWithHeaders))(
    GLOBAL_REQUEST,
  );

  // assertEquals(await composed, null);
});
