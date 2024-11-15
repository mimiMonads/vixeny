import { components, petitions, plugins, runtime, wrap } from "../main.ts";
import { bench, run } from "mitata";

const hello = plugins.type({
  name: Symbol.for("hello"),
  isFunction: true,
  type: undefined,
  f: () => () => "hello world",
});

const helloIsFunctionFalse = plugins.type({
  name: Symbol.for("hello2"),
  isFunction: false,
  type: undefined,
  f: () => () => "hello",
});

const base = petitions.response()({
  path: "/base",
  r: () => new Response("hello world"),
});
const custom = petitions.custom()({
  path: "/base",
  f: () => new Response("hello world"),
});

const newResponse = (_: any) => new Response("hello world");

const serve = await wrap({
  cyclePlugin: {
    hello,
    helloIsFunctionFalse,
  },
})()
  .get({
    path: "/add",
    f: () => "hello world",
  })
  .get({
    path: "/addPlugin",
    f: (ctx) => ctx.hello(),
  })
  .get({
    path: "/addHelloIsFunctionFalse",
    f: (ctx) => ctx.helloIsFunctionFalse,
  })
  .get({
    path: "/addAsync",
    f: async () => Promise.resolve("hello world"),
  })
  .get({
    path: "/addLazzy",
    lazy: true,
    f: () => "hello world",
  })
  .get({
    path: "/addOnError",
    f: () => "hello world",
    onError: () => new Response("fail"),
  })
  .addAnyPetition(base)
  .addAnyPetition(custom)
  .compose();

helloIsFunctionFalse;
const add = new Request("http://localhost/add");
const addPlugin = new Request("http://localhost/addPlugin");
const addHelloIsFunctionFalse = new Request(
  "http://localhost/addHelloIsFunctionFalse",
);
const addAsync = new Request("http://localhost/addAsync");
const addLazzy = new Request("http://localhost/addLazzy");
const baseRequest = new Request("http://localhost/base");
const customRequest = new Request("http://localhost/custom");
const addOnErrormRequest = new Request("http://localhost/addOnError");

bench(
  "cost of response",
  () => {
    // The response doesn't matter at all
    newResponse(add);
  },
);
bench(
  "base",
  () => serve(baseRequest),
);

// Investigate why is so slow?
bench(
  "custom",
  () => serve(customRequest),
);

bench(
  "add",
  () => serve(add),
);

bench(
  "addPlugin",
  () => serve(addPlugin),
);

bench(
  "addPlugin resolved in cycle",
  () => serve(addHelloIsFunctionFalse),
);

bench(
  "addOnErrormRequest",
  () => serve(addOnErrormRequest),
);

bench(
  "addLazzy",
  () => serve(addLazzy),
);

bench(
  "addAsync",
  () => serve(addAsync),
);

run();
