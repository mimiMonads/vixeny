import { composer, plugins } from "../../main.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { petitions } from "../../main.ts";

const dummyRequest = new Request("http://heyINeedTOGoToSleep.com/");
const opt = plugins.globalOptions({
  cyclePlugin: {
    hello: {
      name: Symbol.for("hello"),
      isFunction: true,
      type: undefined,
      f: () => () => () => "hello",
    },
  },
});

const commonPetition = petitions.common()({
  path: "/common",
  f: () => "common",
});

const responsePetition = petitions.response()({
  path: "/response",
  r: () => new Response("response"),
});

const requestPetition = petitions.standart()({
  path: "/response",
  f: () => new Response("standart"),
});

Deno.test("exportable composer any", async () => {
  assertEquals(
    composer.anyRequest()({
      f: () => "hello",
    })(dummyRequest),
    "hello",
  );
  assertEquals(
    composer.anyRequest(opt)({
      f: (ctx) => ctx.hello(),
    })(dummyRequest),
    "hello",
  );
  assertEquals(
    await composer.anyRequest()({
      f: async () => await Promise.resolve("hello"),
    })(dummyRequest),
    "hello",
  );
});

Deno.test("exportable composer ObjectNull", async () => {
  assertEquals(
    composer.objectNullRequest()({
      f: () => ({ hi: 1 }),
    })(dummyRequest),
    { hi: 1 },
  );
  assertEquals(
    composer.objectNullRequest(opt)({
      f: (ctx) => ({ hello: ctx.hello() }),
    })(dummyRequest),
    { hello: "hello" },
  );
  assertEquals(
    await composer.objectNullRequest()({
      f: async () => ({
        hello: await Promise.resolve("hello") + "!",
      }),
    })(dummyRequest),
    { hello: "hello!" },
  );
  assertEquals(
    composer.objectNullRequest()({
      f: () => null,
    })(dummyRequest),
    null,
  );
});

Deno.test("exportable composer petition", async () => {
  assertEquals(
    await Promise.resolve(composer.petition()(commonPetition)(dummyRequest))
      .then((x) => x.text()),
    "common",
  );
  assertEquals(
    await Promise.resolve(composer.petition()(requestPetition)(dummyRequest))
      .then((x) => x.text()),
    "standart",
  );
  assertEquals(
    await Promise.resolve(composer.petition()(responsePetition)(dummyRequest))
      .then((x) => x.text()),
    "response",
  );
});
