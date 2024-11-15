import { components, petitions, plugins, runtime, wrap } from "../main.ts";
import { bench, run } from "mitata";

const newResponse = (_: any) => new Response("hello world");

const serve = await wrap()()
  .get({
    path: "/base",
    f: () => "hello world",
  })
  .get({
    path: "/base-query",
    f: (ctx) => ctx.query.id,
  })
  .get({
    path: "/three-queries",
    f: (ctx) => `${ctx.query.id1}-${ctx.query.id2}-${ctx.query.id3}`,
  })
  .compose();

const base = new Request("http://localhost/base");
const queryAtEnd = new Request("http://localhost/base-query?id=1");
const threeQueries = new Request(
  "http://localhost/three-queries?id1=1&id2=2&id3=3",
);

bench("base", () => {
  newResponse(base);
});

bench("queryAtEnd", () => serve(queryAtEnd));

bench("threeQueries", () => serve(threeQueries));

run();
