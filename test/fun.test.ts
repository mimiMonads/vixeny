import { assertEquals } from "https://deno.land/std@0.160.0/testing/asserts.ts";
import paths from "./util/paths.ts";
import fun from "../fun.ts";

Deno.test(
  "main",
  async (_) =>
    assertEquals(
      await fun()(paths)(new Request("http://localhost:8080/")).text(),
      "GET:main",
    ),
);

Deno.test(
  "main",
  async (_) =>
    assertEquals(
      await fun()(paths)(new Request("http://localhost:8080/test")).text(),
      "GET:test",
    ),
);
Deno.test(
  "main",
  async (_) =>
    assertEquals(
      await fun()(paths)(new Request("http://localhost:8080/test/")).text(),
      "GET:test/",
    ),
);
Deno.test(
  "main",
  async (_) =>
    assertEquals(
      await fun()(paths)(
        new Request("http://localhost:8080/", { method: "POST" }),
      ).text(),
      "POST:main",
    ),
);
Deno.test(
  "main",
  async (_) =>
    assertEquals(
      await fun()(paths)(
        new Request("http://localhost:8080/", { method: "HEAD" }),
      ).text(),
      "HEAD:main",
    ),
);
Deno.test(
  "main",
  async (_) =>
    assertEquals(
      await fun()(paths)(new Request("http://localhost:8080/test/")).text(),
      "GET:test/",
    ),
);
Deno.test(
  "main",
  async (_) =>
    assertEquals(
      await fun({
      })(paths)(new Request("http://localhost:8080/notFound")).status,
      404,
    ),
);

Deno.test(
  "main",
  async (_) =>
    assertEquals(
      await fun()(paths)(
        new Request("http://localhost:8080/notFound", { method: "BAD_METHOD" }),
      ).status,
      405,
    ),
);
Deno.test(
  "main",
  async (_) =>
    assertEquals(
      await fun()(paths)(new Request("http://localhost:8080/notFound/")).status,
      404,
    ),
);
Deno.test(
  "main",
  async (_) =>
    assertEquals(
      await fun()(paths)(
        new Request("http://localhost:8080/", { method: "DELETE" }),
      ).text(),
      "DELETE:main",
    ),
);
Deno.test(
  "main",
  async (_) =>
    assertEquals(
      await fun({
      })(paths)(new Request("http://localhost:8080/", { method: "DELETE" }))
        .text(),
      "DELETE:main",
    ),
);
Deno.test(
  "main",
  async (_) =>
    assertEquals(
      await fun()(paths)(new Request("http://localhost:8080/test/1/2/")).text(),
      "GET:test/:id/:name/",
    ),
);
Deno.test(
  "main",
  async (_) =>
    assertEquals(
      await fun({
      })(paths)(new Request("http://localhost:8080/test/1/2/")).text(),
      "GET:test/:id/:name/",
    ),
);
Deno.test(
  "main",
  async (_) =>
    assertEquals(
      await fun({
        hasName: "http://localhost:8080/",
      })(paths)(new Request("http://localhost:8080/")).text(),
      "GET:main",
    ),
);

Deno.test(
  "main",
  async (_) =>
    assertEquals(
      await fun({
        hasName: "http://localhost:8080/",
      })(paths)(new Request("http://localhost:8080/test/1/2/")).text(),
      "GET:test/:id/:name/",
    ),
);
