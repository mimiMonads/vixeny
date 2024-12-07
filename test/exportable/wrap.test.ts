import { petitions, wrap } from "../../main.ts";
import { plugins } from "../../main.ts";
import { assertEquals } from "@std/assert";
import type { Petition } from "../../src/morphism.ts";
import { test } from "@cross/test";
const normalPetition = petitions.common()({
  path: "/addAny",
  f: () => "addAny",
});

const pluginHello = plugins.type({
  name: Symbol.for("hello"),
  isFunction: true,
  type: {} as string,
  f: () => () => "function",
});

const pluginMethod = plugins.type({
  name: Symbol.for("method"),
  isFunction: false,
  type: {} as string,
  f: () => (r) => " inCycle",
  isUsing: () => "sup",
});

const opt = plugins.globalOptions({
  cyclePlugin: {
    hello: pluginHello,
    method: pluginMethod,
  },
  wrap: {
    startswith: "/hi",
  },
});

const wrapped = wrap(
  opt,
)()
  .get({
    path: "/stdHello",
    f: () => "stdHello",
  })
  .get({
    path: "/stdPlugin",
    plugins: {
      hello: "string",
      method: "string",
    },
    f: (ctx) => ctx.hello() + ctx.method,
  })
  .get({
    path: "/customHello",
    f: () => new Response("customHello"),
  })
  .route({
    path: "/test",
    // Checking type inference
    method: 'DELETE',
    f: () => new Response("customHello"),
  })
  .get({
    path: "/customsPlugin",
    f: ({ hello, method }) => {
      throw new Response(hello() + method);
      return new Response(hello() + method);
    },
    onError: ({ error }) =>
      error instanceof Response
        ? error
        : new Response("Critical error", { status: 501 }),
  })
  .petitionWithoutCTX({
    path: "/withoutCTX",
    r: () => new Response("withoutCTX"),
  }).addAnyPetition(normalPetition);

const serve = await wrapped.testRequests();

test("wrap checking std", async () => {
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

test("wrap checking custom", async () => {
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

test("wrap checking withoutCTX", async () => {
  assertEquals(
    await serve(
      new Request("http://example.com/withoutCTX"),
    ).then(
      (x) => x.text(),
    ),
    "withoutCTX",
  );
});

test("wrap checking addAny", async () => {
  assertEquals(
    await serve(
      new Request("http://example.com/addAny"),
    ).then(
      (x) => x.text(),
    ),
    "addAny",
  );
});

test("wrap monoidal properties", async () => {
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

//check if your token is valid, return null if it's invalid, otherwise returns the token
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
