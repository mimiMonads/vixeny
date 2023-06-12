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

