import { components, petitions, plugins, runtime, wrap } from "../main.ts";
import { bench, run } from "mitata";

const newResponse = (_: any) => new Response("hello world");

const serve = await wrap()()
  .get({
    path: "/base",
    f: () => "hello world",
  })
  .get({
    path: "/base/:id",
    f: (ctx) => ctx.param.id,
  })
  .get({
    path: "/:id/base",
    f: (ctx) => ctx.param.id,
  })
  .get({
    path: "/base/:id/end",
    f: (ctx) => ctx.param.id,
  })
  .get({
    path: "/base/:id1/:id2/:id3",
    f: (ctx) => `${ctx.param.id1}-${ctx.param.id2}-${ctx.param.id3}`,
  })
  .compose();

const base = new Request("http://localhost/base");
const oneAtTheEndNoSlash = new Request("http://localhost/base/1");
const oneAtTheStart = new Request("http://localhost/1/base");
const oneInMiddle = new Request("http://localhost/base/1/end");
const threeParams = new Request("http://localhost/base/1/2/3");

bench("base", () => {
  // The response doesn't matter at all
  newResponse(base);
});

bench("oneAtTheEndNoSlash", () => serve(oneAtTheEndNoSlash));

bench("oneAtTheStart", () => serve(oneAtTheStart));

bench("oneInMiddle", () => serve(oneInMiddle));

bench("threeParams", () => serve(threeParams));


run();
