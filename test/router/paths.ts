import { type Petition, petitions } from "../../src/morphism.ts";
export default [
  { type: "response", path: "/", r: () => new Response("GET:main") },
  { type: "response", path: "/one", r: () => new Response("1") },
  { type: "response", path: "/two", r: () => new Response("2") },
  { type: "response", path: "/three", r: () => new Response("3") },
  { type: "response", path: "/four", r: () => new Response("4") },
  { type: "response", path: "/five", r: () => new Response("5") },
  { type: "response", path: "/six", r: () => new Response("6") },
  { type: "response", path: "/test", r: () => new Response("GET:test") },
  { type: "response", path: "/test/", r: () => new Response("GET:test/") },
  {
    type: "response",
    path: "/test/:id/:name/",
    r: () => new Response("GET:test/:id/:name/"),
  },
  {
    type: "response",
    method: "POST",
    path: "/",
    r: () => new Response("POST:main"),
  },
  {
    type: "response",
    method: "HEAD",
    path: "/",
    r: () => new Response("HEAD:main"),
  },
  {
    type: "response",
    method: "DELETE",
    path: "/",
    r: () => new Response("DELETE:main"),
  },
].map(
  (x) => petitions.response()(x),
) as unknown as Petition[];
