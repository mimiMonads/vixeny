import { assertEquals } from "https://deno.land/std@0.160.0/testing/asserts.ts";
import solver from "../../builder/solver1.ts";
import atlas from "../../builder/atlas/main1.ts";
import paths from "../util/paths.ts";
import split from "../../builder/atlas/splitter.ts";
import optimize from "../../optimizer/optimize.ts";

Deno.test(
  "resolver",
  (_) =>
    (
      (a) =>
        assertEquals(
          [
            a(new Request("http://localhost:8080/")),
            a(new Request("http://localhost:8080/one")),
            a(new Request("http://localhost:8080/two")),
            a(new Request("http://localhost:8080/three")),
            a(new Request("http://localhost:8080/four")),
            a(new Request("http://localhost:8080/five")),
            a(new Request("http://localhost:8080/six")),
            a(new Request("http://localhost:8080/test")),
            a(new Request("http://localhost:8080/test/")),
            a(new Request("http://localhost:8080/test/1/2/")),
            a(new Request("http://localhost:8080/", { method: "POST" })),
            a(new Request("http://localhost:8080/", { method: "HEAD" })),
            a(new Request("http://localhost:8080/", { method: "DELETE" })),
            a(new Request("http://localhost:8080/hello/***")),
            a(new Request("http://localhost:8080/static/fun.test.ts")),
            a(new Request("http://localhost:8080/hello/nested/***")),
            a(new Request("http://localhost:8080/NOTFOUND")),
            a(new Request("http://localhost:8080/", { method: "BAD" })),
          ],
          [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
        )
    )(
      solver({ hasName: "http://localhost:8080/" })(
        atlas({ hasName: "http://localhost:8080/" })(
          split({ hasName: "http://localhost:8080/" })(
            optimize({ hasName: "http://localhost:8080/" })([...paths,
            { path: "/hello/*", f: () => "wild" },
            { path: "/hello/nested/*", f: () => "card" },
            { type: "static", path: "./test/", name: "/static/" },
            ]),
          ),
        ),
      ),
    ),
);

Deno.test(
  "resolver",
  (_) =>
    (
      (a) =>
        assertEquals(
          [
            a(new Request("http://localhost:8080/")),
            a(new Request("http://localhost:8080/one")),
            a(new Request("http://localhost:8080/two")),
            a(new Request("http://localhost:8080/three")),
            a(new Request("http://localhost:8080/four")),
            a(new Request("http://localhost:8080/five")),
            a(new Request("http://localhost:8080/six")),
            a(new Request("http://localhost:8080/test")),
            a(new Request("http://localhost:8080/test/")),
            a(new Request("http://localhost:8080/test/1/2/")),
            a(new Request("http://localhost:8080/", { method: "POST" })),
            a(new Request("http://localhost:8080/", { method: "HEAD" })),
            a(new Request("http://localhost:8080/", { method: "DELETE" })),
            a(new Request("http://localhost:8080/NOTFOUND")),
            a(new Request("http://localhost:8080/", { method: "BAD" })),
          ],
          [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
        )
    )(
      solver()(atlas()(split()(optimize()(paths)))),
    ),
);


Deno.test(
  "resolver",
  (_) =>
    (
      (a) =>
        assertEquals(
          [
            a(new Request("http://localhost:8080/")),
            a(new Request("http://localhost:8080/one")),
            a(new Request("http://localhost:8080/two")),
            a(new Request("http://localhost:8080/three")),
            a(new Request("http://localhost:8080/four")),
            a(new Request("http://localhost:8080/five")),
            a(new Request("http://localhost:8080/six")),
            a(new Request("http://localhost:8080/test")),
            a(new Request("http://localhost:8080/test/")),
            a(new Request("http://localhost:8080/test/1/2/")),
            a(new Request("http://localhost:8080/", { method: "POST" })),
            a(new Request("http://localhost:8080/", { method: "HEAD" })),
            a(new Request("http://localhost:8080/", { method: "DELETE" })),
            a(new Request("http://localhost:8080/NOTFOUND")),
            a(new Request("http://localhost:8080/", { method: "BAD" })),
          ],
          [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
        )
    )(
      solver()(atlas()(split()(optimize()(paths)))),
    ),
);

Deno.test(
  "resolver",
  (_) =>
    (
      (f) =>
        assertEquals(
          [
            f(new Request("http://localhost:8080/count")),
            f(new Request("http://localhost:8080/hello_world")),
            f(new Request("http://localhost:8080/random_number")),
            f(new Request("http://localhost:8080/plus_1", { method: "POST" })),
            f(new Request("http://localhost:8080/minus_1", { method: "POST" })),
            f(new Request("http://localhost:8080/NOTFOUND")),
            f(new Request("http://localhost:8080/", { method: "BAD" })),
          ],
          [0, 1, 2, 3, 4, 5, 6]
        )
    )(
      solver()(atlas()(split()(optimize()([
        {
          path: "/count",
          f: () => "1"
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
      ])))),
    ),
);
