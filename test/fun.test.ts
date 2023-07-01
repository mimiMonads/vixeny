import { assertEquals } from "https://deno.land/std@0.160.0/testing/asserts.ts";
import paths from "./util/paths.ts";
import fun from "../fun.ts";

Deno.test(
  "main",
  () =>
    (
      async (f) =>
        assertEquals(
          [
            await (f(new Request("http://localhost:8080/")) as Response).text(),
            await (f(new Request("http://localhost:8080/one")) as Response).text(),
            await (f(new Request("http://localhost:8080/two")) as Response).text(),
            await (f(new Request("http://localhost:8080/three")) as Response).text(),
            await (f(new Request("http://localhost:8080/four")) as Response).text(),
            await (f(new Request("http://localhost:8080/five")) as Response).text(),
            await (f(new Request("http://localhost:8080/six")) as Response).text(),
            await (f(new Request("http://localhost:8080/test")) as Response).text(),
            await (f(new Request("http://localhost:8080/test/")) as Response).text(),
            await (f(new Request("http://localhost:8080/", { method: "POST" })) as Response)
              .text(),
            await (f(new Request("http://localhost:8080/", { method: "HEAD" })) as Response)
              .text(),
            await (f(new Request("http://localhost:8080/", { method: "DELETE" })) as Response)
              .text(),
            await (f(new Request("http://localhost:8080/test/1/2/")) as Response)
              .text(),
            (f(new Request("http://localhost:8080/notFound")) as Response).status,
            (f(
              new Request("http://localhost:8080/notFound", {
                method: "BAD_METHOD",
              }),
            ) as Response).status
          ],
          [
            "GET:main",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "GET:test",
            "GET:test/",
            "POST:main",
            "HEAD:main",
            "DELETE:main",
            "GET:test/:id/:name/",
            404,
            405,
          ]
        )

    )(
      fun()(paths)
    )
)


Deno.test(
  "main",
  () =>
    (
      async (f) =>
        assertEquals(
          [
  
            await (f(new Request("http://localhost:8080/count")) as Response).text(),
            await (f(new Request("http://localhost:8080/hello_world")) as Response).text(),
            await (f(new Request("http://localhost:8080/random_number")) as Response).text(),
            await (f(new Request("http://localhost:8080/plus_1", { method: "POST" } )) as Response).text(),
            await (f(new Request("http://localhost:8080/minus_1", { method: "POST" } )) as Response).text(),
          ],
          ["1","2","3","4","5"]
        )

    )(
      fun()([
        {
          path: "/count",
          f: () => "1",
        },
        {
          path: "/hello_world",
          f: () => "2",
        },
        {
          path: "/random_number",
          f: () => "3",
        },
        {
          path: "/plus_1",
          f: () => "4",
          method: "POST",
        },
        {
          path: "/minus_1",
          f: () => "5",
          method: "POST",
        },
      ])
    )
)



Deno.test(
  "main",
  () =>
    (
      async (f) =>
        assertEquals(
          [
            await (f(new Request("http://localhost:8080/")) as Response).text(),
            await (f(new Request("http://localhost:8080/test")) as Response).text(),
            await (f(new Request("http://localhost:8080/test/")) as Response).text(),
            await (f(new Request("http://localhost:8080/", { method: "POST" })) as Response)
              .text(),
            await (f(new Request("http://localhost:8080/", { method: "HEAD" })) as Response)
              .text(),
            await (f(new Request("http://localhost:8080/", { method: "DELETE" })) as Response)
              .text(),
            await (f(new Request("http://localhost:8080/test/1/2/")) as Response)
              .text(),
            (f(new Request("http://localhost:8080/notFound")) as Response).status,
            (f(
              new Request("http://localhost:8080/notFound", {
                method: "BAD_METHOD",
              }),
            ) as Response).status,
            await (f(new Request("http://localhost:8080/hello/***/*/*/*/*")) as Response).text(),
            await (f(new Request("http://localhost:8080/hello/nested/*/*/*/*")) as Response).text()
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
            "wild",
            "card"
          ]
        )

    )(
      fun()([...paths,
      { path: "/hello/*", f: () => "wild" },
      { path: "/hello/nested/*", f: () => "card" }
      ])
    )
)


Deno.test(
  "main",
  () =>
    (
      async (f) =>
        assertEquals(
          [
            await (f(new Request("http://localhost:8080/")) as Response).text(),
            await (f(new Request("http://localhost:8080/test")) as Response).text(),
            await (f(new Request("http://localhost:8080/test/")) as Response).text(),
            await (f(new Request("http://localhost:8080/", { method: "POST" })) as Response)
              .text(),
            await (f(new Request("http://localhost:8080/", { method: "HEAD" })) as Response)
              .text(),
            await (f(new Request("http://localhost:8080/", { method: "DELETE" })) as Response)
              .text(),
            await (f(new Request("http://localhost:8080/test/1/2/")) as Response)
              .text(),
            (f(new Request("http://localhost:8080/notFound")) as Response).status,
            (f(
              new Request("http://localhost:8080/notFound", {
                method: "BAD_METHOD",
              }),
            ) as Response).status,
            await (f(new Request("http://localhost:8080/hello/***/*/*/*/*")) as Response).text(),
            await (f(new Request("http://localhost:8080/hello/nested/*/*/*/*")) as Response).text(),
            (await (f(new Request("http://localhost:8080/static/fun.test.ts")) as Response)).status,
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
            "wild",
            "card",
            200
          ]
        )


    )(
      fun({
        hasName: "http://localhost:8080/"
      })([...paths,
      { path: "/hello/*", f: () => "wild" },
      { path: "/hello/nested/*", f: () => "card" },
      { type: "static", path: "./test/", name: "/static/" },
      ])
    )
)
