import { petitions, wrap } from "../../main.ts";
import { plugins } from "../../main.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import type { Petition } from "../../src/morphism.ts";

const normalPetition = petitions.common()({
  path: "/addAny",
  f: () => "addAny",
});

const pluginHello = plugins.type({
  name: Symbol.for("hello"),
  isFunction: true,
  type: {} as string,
  f: () => () => () => "function",
});

const pluginMethod = plugins.type({
  name: Symbol.for("method"),
  type: {} as string,
  f: () => () => () => " inCycle",
});

const opt = plugins.globalOptions({
  cyclePlugin: {
    hello: pluginHello,
    method: pluginMethod,
  },
});

const wrapped = wrap(opt)()
  .stdPetition({
    path: "/stdHello",
    f: () => "stdHello",
  })
  .stdPetition({
    path: "/stdPlugin",
    plugins:{
      hello: 'string',
      method: 'string'
    },
    f: (ctx) => ctx.hello() + ctx.method,
  })
  .customPetition({
    path: "/customHello",
    f: () => new Response("customHello"),
  })
  .customPetition({
    path: "/customsPlugin",
    f: (ctx) => new Response(ctx.hello() + ctx.method),
  })
  .petitionWithoutCTX({
    path: "/withoutCTX",
    r: () => new Response("withoutCTX"),
  }).addAnyPetition(normalPetition);

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

Deno.test("wrap checking withoutCTX", async () => {
  assertEquals(
    await serve(
      new Request("http://example.com/withoutCTX"),
    ).then(
      (x) => x.text(),
    ),
    "withoutCTX",
  );
});

Deno.test("wrap checking addAny", async () => {
  assertEquals(
    await serve(
      new Request("http://example.com/addAny"),
    ).then(
      (x) => x.text(),
    ),
    "addAny",
  );
});

Deno.test("wrap monoidal properties", async () => {
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

//check if your token is valid, return null if it's invalid, otherwise retruns the token
// const validToken = petitions.resolve()({
//   crypto: {
//     globalKey: 'Secret!',
//     token: { jwtToken: {} },
//   },
//   f: (c) =>
//     c.token.jwtToken &&
//       (c.token.jwtToken as { name: string; iat: number }).iat > Date.now()
//       ? c.token.jwtToken
//       : null,
// });

// const text = {
//   getText: petitions.resolve()({
//     resolve:{
//       isValidUser: validToken
//     },
//     f:async f => f.resolve.isValidUser
//         ? await f.req.text()
//         : "not_a_valid_user"
//   }),
// };

// const server = wrap()()
//   .stdPetition({
//     resolve: {
//       ...text,
//     },
//     path: "/stdHello",
//     f: (ctx) => ctx.resolve.getText,
//   })
//   //makes a server
//.compose();
