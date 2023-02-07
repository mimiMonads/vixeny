import { assertEquals } from "https://deno.land/std@0.160.0/testing/asserts.ts";
import paths from "./util/paths.ts";
import fun from "../fun.ts";

Deno.test(
  "main",
  (_) =>
    (
      async (f) =>
        assertEquals(
          [
            await f(new Request("http://localhost:8080/")).text(),
            await f(new Request("http://localhost:8080/test")).text(),
            await f(new Request("http://localhost:8080/test/")).text(),
            await f(new Request("http://localhost:8080/", { method: "POST" }))
              .text(),
            await f(new Request("http://localhost:8080/", { method: "HEAD" }))
              .text(),
            await f(new Request("http://localhost:8080/", { method: "DELETE" }))
              .text(),
            await fun()(paths)(new Request("http://localhost:8080/test/1/2/"))
              .text(),
            f(new Request("http://localhost:8080/notFound")).status,
            f(
              new Request("http://localhost:8080/notFound", {
                method: "BAD_METHOD",
              }),
            ).status,
          ],
          [
            "GET:main",
            "GET:test",
            "GET:test/",
            "POST:main",
            "HEAD:main",
            "DELETE:main",
            "GET:test/:id/:name/",
            404,
            405,
          ],
        )
    )(
      fun()(paths),
    ),
);

Deno.test(
  "main",
  (_) =>
    (
      async (f) =>
        assertEquals(
          [
            await f(new Request("http://localhost:8080/")).text(),
            await f(new Request("http://localhost:8080/test")).text(),
            await f(new Request("http://localhost:8080/test/")).text(),
            await f(new Request("http://localhost:8080/", { method: "POST" }))
              .text(),
            await f(new Request("http://localhost:8080/", { method: "HEAD" }))
              .text(),
            await f(new Request("http://localhost:8080/", { method: "DELETE" }))
              .text(),
            await f(new Request("http://localhost:8080/test/1/2/")).text(),
            f(new Request("http://localhost:8080/notFound")).status,
            f(
              new Request("http://localhost:8080/notFound", {
                method: "BAD_METHOD",
              }),
            ).status,
          ],
          [
            "GET:main",
            "GET:test",
            "GET:test/",
            "POST:main",
            "HEAD:main",
            "DELETE:main",
            "GET:test/:id/:name/",
            404,
            405,
          ],
        )
    )(
      fun({
        hasName: "http://localhost:8080/",
      })(paths),
    ),
);
