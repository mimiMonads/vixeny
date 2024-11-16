import { components, petitions, plugins, runtime, wrap } from "../main.ts";
import { bench, run } from "mitata";

const base = petitions.response()({
  path: "/",
  r: () => new Response("hello world"),
});
const custom = petitions.custom()({
  path: "/base",
  f: () => new Response("hello world"),
});

const newResponse = (_: any) => new Response("hello world");

const serve = await wrap()()
  .get({
    path: "/add",
    f: () => "hello world",
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

const add = new Request("http://localhost/add");
const addAsync = new Request("http://localhost/addAsync");
const addLazzy = new Request("http://localhost/addLazzy");
const baseRequest = new Request("http://localhost/");
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
  // TODO: Check for evaling the body in compose
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
