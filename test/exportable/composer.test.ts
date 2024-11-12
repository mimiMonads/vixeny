import { composer, plugins } from "../../main.ts";
import { assertEquals } from "@std/assert";
import { petitions } from "../../main.ts";
import { test } from "@cross/test";
const dummyRequest = new Request("http://heyINeedTOGoToSleep.com/");

const hello = plugins.type({
  name: Symbol.for("hello"),
  isFunction: true,
  type: undefined,
  f: () => () => "hello",
});
const opt = plugins.globalOptions({
  cyclePlugin: {
    hello,
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

const requestPetition = petitions.custom()({
  path: "/response",
  f: (ctx) => new Response("standard"),
});

test("exportable composer any", async () => {
  assertEquals(
    (await composer.anyRequest()({
      f: () => "hello",
    }))(dummyRequest),
    "hello",
  );
  assertEquals(
    (await composer.anyRequest(opt)({
      f: (ctx) => ctx.hello(),
    }))(dummyRequest),
    "hello",
  );
  assertEquals(
    await (await composer.anyRequest()({
      f: async () => await Promise.resolve("hello"),
    }))(dummyRequest),
    "hello",
  );
});

test("exportable composer ObjectNull", async () => {
  assertEquals(
    (await composer.objectNullRequest()({
      f: () => ({ hi: 1 }),
    }))(dummyRequest),
    { hi: 1 },
  );
  assertEquals(
    (await composer.objectNullRequest(opt)({
      f: (ctx) => ({ hello: ctx.hello() }),
    }))(dummyRequest),
    { hello: "hello" },
  );
  assertEquals(
    await (await composer.objectNullRequest()({
      f: async () => ({
        hello: await Promise.resolve("hello") + "!",
      }),
    }))(dummyRequest),
    { hello: "hello!" },
  );
  assertEquals(
    (await composer.objectNullRequest()({
      f: () => null,
    }))(dummyRequest),
    null,
  );
});

test("exportable composer petition", async () => {
  assertEquals(
    await Promise.resolve(
      (await composer.petition(commonPetition))(dummyRequest),
    )
      .then((x) => x.text()),
    "common",
  );
  assertEquals(
    await Promise.resolve(
      (await composer.petition(requestPetition))(dummyRequest),
    )
      .then((x) => x.text()),
    "standard",
  );
  assertEquals(
    await Promise.resolve(
      (await composer.petition(responsePetition))(dummyRequest),
    )
      .then((x) => x.text()),
    "response",
  );
});
