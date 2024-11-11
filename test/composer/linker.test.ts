import linker from "../../src/composer/linker.ts";
import { assertEquals } from "@std/assert";
import { test } from "@cross/test";
import { petitions } from "../../main.ts";

/**
 * Important!:
 * `mockFunction` does absoulitly nothing
 * the linker has not inference over what `isUsing`
 *
 * Also the linker doesn't directly manage async safety
 */
const mockFunction = () => new Response();
const requestForTest = new Request("http://localhost/1/2/3?hello=world");

test("returns identity of the request", async () => {
  assertEquals(
    (await linker({})({
      type: "add",
      path: "./test",
      f: mockFunction,
    })([]))(requestForTest),
    requestForTest,
  );

  // It's based on `isUsing` so even if we are using `param`
  // it returns identity
  assertEquals(
    (await linker({})({
      type: "add",
      path: "./test",
      f: mockFunction,
    })([]))(requestForTest),
    requestForTest,
  );
});

test("Checking basic functions", async () => {
  assertEquals(
    (await linker({})({
      type: "add",
      path: "/1/2/:id",
      f: mockFunction,
    })(["param"]))(requestForTest),
    {
      param: {
        id: "3",
      },
    },
  );

  assertEquals(
    ((await linker({})({
      type: "add",
      path: "/1/2/:id",
      query: {
        only: ["hello"],
      },
      f: mockFunction,
    })(["query"])))(requestForTest),
    {
      query: {
        hello: "world",
      },
    },
  );

  assertEquals(
    (await linker({})({
      type: "add",
      path: "/1/2/:id",
      query: {
        only: ["hello"],
      },
      f: mockFunction,
    })(["query", "param"]))(requestForTest),
    {
      param: {
        id: "3",
      },
      query: {
        hello: "world",
      },
    },
  );
});

test("Checking resolve", async () => {
  const hello = petitions.resolve()({
    f: () => "world",
  });

  const nestedHello = petitions.resolve()({
    resolve: {
      nested: {
        f: () => "world",
      },
    },
    f: ({ resolve }) => resolve.nested,
  });

  const asyncHello = petitions.resolve()({
    f: async () => await new Promise((res) => res("world")),
  });

  const nestedAsyncHello = petitions.resolve()({
    resolve: {
      nested: {
        f: async () => await new Promise((res) => res("world")),
      },
    },
    f: ({ resolve }) => resolve.nested,
  });

  assertEquals(
    (await linker({})({
      type: "add",
      path: "/1/2/:id",
      resolve: {
        hello,
      },
      f: mockFunction,
    })(["resolve"]))(requestForTest),
    {
      resolve: {
        hello: "world",
      },
    },
  );

  assertEquals(
    (await linker({})({
      type: "add",
      path: "/1/2/:id",
      resolve: {
        hello: nestedHello,
      },
      f: mockFunction,
    })(["resolve"]))(requestForTest),
    {
      resolve: {
        hello: "world",
      },
    },
  );

  //we need to await here to resolve because we are not using the composer
  assertEquals(
    await (await linker({})({
      type: "add",
      path: "/1/2/:id",
      resolve: {
        hello: asyncHello,
      },
      f: mockFunction,
    })(["resolve"]))(requestForTest),
    {
      resolve: {
        hello: "world",
      },
    },
  );

  //we need to await here to resolve because we are not using the composer
  assertEquals(
    await (await linker({})({
      type: "add",
      path: "/1/2/:id",
      resolve: {
        hello: nestedAsyncHello,
      },
      f: mockFunction,
    })(["resolve"]))(requestForTest),
    {
      resolve: {
        hello: "world",
      },
    },
  );
});

/*
    Branches have to be resolve from the object `branch`
*/
test("Checking branch", async () => {
  const hello = petitions.branch()({
    f: () => "world",
  });

  const nestedHello = petitions.branch()({
    resolve: {
      nested: {
        f: () => "world",
      },
    },
    f: ({ resolve }) => resolve.nested,
  });

  const asyncHello = petitions.branch()({
    f: async () => await new Promise((res) => res("world")),
  });

  assertEquals(
    (await linker({})({
      type: "add",
      path: "/1/2/:id",
      branch: {
        hello,
      },
      f: mockFunction,
    })(["branch"]))(requestForTest).branch.hello(),
    "world",
  );

  assertEquals(
    (await linker({})({
      type: "add",
      path: "/1/2/:id",
      branch: {
        hello: nestedHello,
      },
      f: mockFunction,
    })(["branch"]))(requestForTest).branch.hello(),
    "world",
  );

  await  (await linker({})({
    type: "add",
    path: "/1/2/:id",
    branch: {
      hello: asyncHello,
    },
    f: mockFunction,
  })(["branch"]))(requestForTest).branch
    // Forcing to resolve the branch on its context
    .then(
      async (x: { hello: () => any }) => {
        assertEquals(
          await x.hello(),
          "world",
        );
      },
    );
});

test("Checking branch", async () => {
  // Wraps correctly
  assertEquals(
    (await linker({})({
      type: "add",
      path: "/1/2/:id",
      f: mockFunction,
      applyTo: {
        type: "onError",
      },
    })([]))(requestForTest)(),
    requestForTest,
  );

  // Wraps correctly
  assertEquals(
    (await linker({})({
      type: "add",
      path: "/1/2/:id",
      f: mockFunction,
      applyTo: {
        type: "onError",
      },
    })(["error"]))(requestForTest)("world").error,
    "world",
  );
});
