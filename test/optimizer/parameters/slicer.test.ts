import slicer from "../../../optimizer/parameters/slicer.ts";
import options from "../../../optimizer/parameters/map.ts";
import { assertEquals } from "https://deno.land/std@0.160.0/testing/asserts.ts";

// "/test/:id"
Deno.test(
  "param",
  (_) =>
    assertEquals(
      new Function(
        ` return ${
          slicer(
            options({ hasName: "http://localhost:8080/" })({
              path: "/test/:id",
              f: (_) => "hello",
            }),
          )
        }`,
      )()("http://localhost:8080/test/hello"),
      "hello",
    ),
);

Deno.test(
  "param",
  (_) =>
    assertEquals(
      new Function(
        ` return ${
          slicer(
            options({ hasName: "http://localhost:8080/" })({
              path: "/test/:id/",
              f: (_) => "hello",
            }),
          )
        }`,
      )()("http://localhost:8080/test/hello/?a=1"),
      "hello",
    ),
);

Deno.test(
  "param",
  (_) =>
    (
      (f) =>
        assertEquals(
          [
            f("http://localhost:8080/test/hello/"),
            f("http://localhost:8080/test/hello/"),
          ],
          ["hello", "hello"],
        )
    )(
      new Function(
        ` return ${
          slicer(options()({ path: "/test/:id/", f: (_) => "hello" }))
        }`,
      )(),
    ),
);
Deno.test(
  "param",
  (_) =>
    (
      (f) =>
        assertEquals(
          [
            f("http://localhost:8080/test/hello/?a=1"),
            f("http://localhost:8080/test/hello/?a=1"),
          ],
          ["hello", "hello"],
        )
    )(
      new Function(
        ` return ${
          slicer(options()({ path: "/test/:id/", f: (_) => "hello" }))
        }`,
      )(),
    ),
);

// "/test/:id/hi"

Deno.test(
  "param",
  (_) =>
    assertEquals(
      new Function(
        ` return ${
          slicer(
            options({ hasName: "http://localhost:8080/" })({
              path: "/test/:id/hi",
              f: (_) => "hello",
            }),
          )
        }`,
      )()("http://localhost:8080/test/hello/hi"),
      "hello",
    ),
);
Deno.test(
  "param",
  (_) =>
    assertEquals(
      new Function(
        ` return ${
          slicer(
            options({ hasName: "http://localhost:8080/" })({
              path: "/test/:id/hi",
              f: (_) => "hello",
            }),
          )
        }`,
      )()("http://localhost:8080/test/hello/hi?a=1"),
      "hello",
    ),
);

Deno.test(
  "param",
  (_) =>
    (
      (f) =>
        assertEquals(
          [
            f("http://localhost:8080/test/hello/hi"),
            f("http://localhost:8080/test/hello/hi"),
          ],
          ["hello", "hello"],
        )
    )(
      new Function(` return ${
        slicer(
          options()({
            path: "/test/:id/hi",
            f: (_) => "hello",
          }),
        )
      }`)(),
    ),
);
Deno.test(
  "param",
  (_) =>
    (
      (f) =>
        assertEquals(
          [
            f("http://localhost:8080/test/hello/hi?a=1"),
            f("http://localhost:8080/test/hello/hi?a=1"),
          ],
          ["hello", "hello"],
        )
    )(
      new Function(` return ${
        slicer(
          options()({
            path: "/test/:id/hi",
            f: (_) => "hello",
          }),
        )
      }`)(),
    ),
);

// "/test/:id/hi/"

Deno.test(
  "param",
  (_) =>
    assertEquals(
      new Function(
        ` return ${
          slicer(
            options({ hasName: "http://localhost:8080/" })({
              path: "/test/:id/hi/",
              f: (_) => "hello",
            }),
          )
        }`,
      )()("http://localhost:8080/test/hello/hi/"),
      "hello",
    ),
);
Deno.test(
  "param",
  (_) =>
    assertEquals(
      new Function(
        ` return ${
          slicer(
            options({ hasName: "http://localhost:8080/" })({
              path: "/test/:id/hi/",
              f: (_) => "hello",
            }),
          )
        }`,
      )()("http://localhost:8080/test/hello/hi/?a=1"),
      "hello",
    ),
);

Deno.test(
  "param",
  (_) =>
    (
      (f) =>
        assertEquals(
          [
            f("http://localhost:8080/test/hello/hi/"),
            f("http://localhost:8080/test/hello/hi/"),
          ],
          ["hello", "hello"],
        )
    )(
      new Function(
        ` return ${
          slicer(
            options()({
              path: "/test/:id/hi/",
              f: (_) => "hello",
            }),
          )
        }`,
      )(),
    ),
);
Deno.test(
  "param",
  (_) =>
    (
      (f) =>
        assertEquals(
          [
            f("http://localhost:8080/test/hello/hi/?a=1"),
            f("http://localhost:8080/test/hello/hi/?a=1"),
          ],
          ["hello", "hello"],
        )
    )(
      new Function(
        ` return ${
          slicer(
            options()({
              path: "/test/:id/hi/",
              f: (_) => "hello",
            }),
          )
        }`,
      )(),
    ),
);

// "/:test/:id/hi/"

Deno.test(
  "param",
  (_) =>
    assertEquals(
      new Function(
        ` return ${
          slicer(
            options({ hasName: "http://localhost:8080/" })({
              path: "/:test/:id/hi/",
              f: (_) => "hello",
            }),
          )
        }`,
      )()("http://localhost:8080/hello/world/hi/"),
      "hello/world",
    ),
);
Deno.test(
  "param",
  (_) =>
    assertEquals(
      new Function(
        ` return ${
          slicer(
            options({ hasName: "http://localhost:8080/" })({
              path: "/:test/:id/hi/",
              f: (_) => "hello",
            }),
          )
        }`,
      )()("http://localhost:8080/hello/world/hi/?a=1"),
      "hello/world",
    ),
);
Deno.test(
  "param",
  (_) =>
    (
      (f) =>
        assertEquals(
          [
            f("http://localhost:8080/hello/world/hi/"),
            f("http://localhost:8080/hello/world/hi/"),
          ],
          ["hello/world", "hello/world"],
        )
    )(
      new Function(
        ` return ${
          slicer(
            options()({
              path: "/:test/:id/hi/",
              f: (_) => "hello",
            }),
          )
        }`,
      )(),
    ),
);
Deno.test(
  "param",
  (_) =>
    (
      (f) =>
        assertEquals(
          [
            f("http://localhost:8080/hello/world/hi/"),
            f("http://localhost:8080/hello/world/hi/?a=1"),
          ],
          ["hello/world", "hello/world"],
        )
    )(
      new Function(
        ` return ${
          slicer(
            options()({
              path: "/:test/:id/hi/",
              f: (_) => "hello",
            }),
          )
        }`,
      )(),
    ),
);
