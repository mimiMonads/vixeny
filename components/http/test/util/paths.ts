import { Petition } from "../../src/framework/optimizer/types.ts";

export default [
  { type: "response", path: "/", r: (_) => new Response("GET:main") },
  { type: "response", path: "/one", r: (_) => new Response("1") },
  { type: "response", path: "/two", r: (_) => new Response("2") },
  { type: "response", path: "/three", r: (_) => new Response("3") },
  { type: "response", path: "/four", r: (_) => new Response("4") },
  { type: "response", path: "/five", r: (_) => new Response("5") },
  { type: "response", path: "/six", r: (_) => new Response("6") },
  { type: "response", path: "/test", r: (_) => new Response("GET:test") },
  { type: "response", path: "/test/", r: (_) => new Response("GET:test/") },
  {
    type: "response",
    path: "/test/:id/:name/",
    r: (_) => new Response("GET:test/:id/:name/"),
  },
  {
    type: "response",
    method: "POST",
    path: "/",
    r: (_) => new Response("POST:main"),
  },
  {
    type: "response",
    method: "HEAD",
    path: "/",
    r: (_) => new Response("HEAD:main"),
  },
  {
    type: "response",
    method: "DELETE",
    path: "/",
    r: (_) => new Response("DELETE:main"),
  },
] as Petition[];
