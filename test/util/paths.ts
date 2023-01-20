import { ObjectRawResponse } from "../../optimizer/types.ts";
export default [
  { type: "response", path: "/", r: (_) => new Response("GET:main") },
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
] as ObjectRawResponse[];
