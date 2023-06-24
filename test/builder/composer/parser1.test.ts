import parser from "../../../builder/composer/parser1.ts";
import { assertEquals } from "https://deno.land/std@0.160.0/testing/asserts.ts";

Deno.test(
  "composer",
  (_) =>
    (
      (f) =>
        assertEquals(
          [f("/"), f("/notFound"), f("/outOfTheScope/")],
          [0, 50, 50],
        )
    )(
      parser({})([["/"]])([0])([1])(0)(50),
    ),
);


Deno.test(
  "composer",
  (_) =>
    (
      (f) =>
        assertEquals(
          [f("/hello"), f("/hello/hello"), f("/other/bla/bla"), f("/notFound"), f("/outOfTheScope/")],
          [0, 0, 1, -1, -1],
        )
    )(
      parser({})([["/hello", "/other"]])([0])([1])(0)(-1),
    ),
);

Deno.test(
  "composer",
  (_) =>
    (
      (f) =>
        assertEquals(
          [f("/"), f("/notFound"), f("/outOfTheScope/")],
          [1, 50, 50],
        )
    )(
      parser({})([["/"]])([0])([1])(1)(50),
    ),
);
Deno.test(
  "composer",
  (_) =>
    (
      (f) =>
        assertEquals(
          [
            f("/"),
            f("/hello"),
            f("/test"),
            f("/notFound"),
            f("/outOfTheScope/"),
          ],
          [0, 1, 2, 50, 50],
        )
    )(
      parser({})([["/", "/hello", "/test"]])([0])([1])(0)(50),
    ),
);

Deno.test(
  "composer",
  (_) =>
    (
      (f) =>
        assertEquals(
          [
            f("/"),
            f("/hello"),
            f("/test"),
            f("/hello/"),
            f("/test/hello"),
            f("/notFound"),
            f("/outOfTheScope/lol/"),
          ],
          [0, 1, 2, 3, 4, 50, 50],
        )
    )(
      parser({})([["/", "/hello", "/test"], ["/hello/", "/test/hello"]])([
        0,
        3,
      ])([1, 2])(0)(50),
    ),
);

Deno.test(
  "composer",
  (_) =>
    (
      (f) =>
        assertEquals(
          [
            f("/"),
            f("/hello"),
            f("/test"),
            f("/hello/"),
            f("/test/hello"),
            f("/hello/1/test"),
            f("/test/2/hello"),
            f("/hello/1/test/"),
            f("/test/2/hello/"),
            f("/notFound"),
            f("/outOfTheScope/1/2/3/4/5/"),
          ],
          [0, 1, 2, 3, 4, 5, 6, 7, 8, 50, 50],
        )
    )(
      parser({})([["/", "/hello", "/test"], ["/hello/", "/test/hello"], [
        "/hello/:id/test",
        "/test/:id/hello",
      ], ["/hello/:id/test/", "/test/:id/hello/"]])([0, 3, 5, 7])([1, 2, 3, 4])(0)(
        50,
      ),
    ),
);

Deno.test(
  "composer",
  (_) =>
    (
      (f) =>
        assertEquals(
          [
            f("/"),
            f("/hello"),
            f("/test"),
            f("/hello/"),
            f("/test/hello"),
            f("/hello/1/test/"),
            f("/test/2/hello/"),
            f("/notFound"),
            f("/outOfTheScope/1/2/3/4/5/"),
          ],
          [0, 1, 2, 3, 4, 5, 6, 50, 50],
        )
    )(
      parser({})([["/", "/hello", "/test"], ["/hello/", "/test/hello"], [
        "/hello/:id/test/",
        "/test/:id/hello/",
      ]])([0, 3, 5])([1, 2, 4])(0)(50),
    ),
);

Deno.test(
  "composer",
  (_) =>
    (
      (f) =>
        assertEquals(
          [
            f("/"),
            f("/hello"),
            f("/test"),
            f("/hello/"),
            f("/test/hello"),
            f("/hello/1/test/"),
            f("/test/2/hello/"),
            f("/notFound"),
            f("/outOfTheScope/1/2/3/4/5/"),
          ],
          [1, 2, 3, 4, 5, 6, 7, 50, 50],
        )
    )(
      parser({})([["/", "/hello", "/test"], ["/hello/", "/test/hello"], [
        "/hello/:id/test/",
        "/test/:id/hello/",
      ]])([0, 3, 5])([1, 2, 4])(1)(50),
    ),
);
