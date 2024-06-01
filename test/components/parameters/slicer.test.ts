import slicer from "../../../src/components/parameters/slicer.ts";
import map from "../../../src/components/parameters/map.ts";
import assert from "node:assert";
import test from "node:test";
import type { Petition } from "../../../src/morphism.ts";

// "/test/:id"
test(
  "param",
  (_) =>
    assert.deepStrictEqual(
      new Function(
        ` return ${
          slicer(
            map({ hasName: "http://localhost:8080/" })({
              path: "/test/:id",
              f: (_) => "hello",
            } as Petition),
          )
        }`,
      )()("http://localhost:8080/test/hello"),
      "hello",
    ),
);

test(
  "param",
  (_) =>
    assert.deepStrictEqual(
      new Function(
        ` return ${
          slicer(
            map({ hasName: "http://localhost:8080/" })({
              path: "/test/:id/",
              f: (_) => "hello",
            } as Petition),
          )
        }`,
      )()("http://localhost:8080/test/hello/?a=1"),
      "hello",
    ),
);

test(
  "param",
  (_) =>
    (
      (f) =>
        assert.deepStrictEqual(
          [
            f("http://localhost:8080/test/hello/"),
            f("http://localhost:8080/test/hello/"),
          ],
          ["hello", "hello"],
        )
    )(
      new Function(
        ` return ${
          slicer(map()({ path: "/test/:id/", f: (_) => "hello" } as Petition))
        }`,
      )(),
    ),
);
test(
  "param",
  (_) =>
    (
      (f) =>
        assert.deepStrictEqual(
          [
            f("http://localhost:8080/test/hello/?a=1"),
            f("http://localhost:8080/test/hello/?a=1"),
          ],
          ["hello", "hello"],
        )
    )(
      new Function(
        ` return ${
          slicer(map()({ path: "/test/:id/", f: (_) => "hello" } as Petition))
        }`,
      )(),
    ),
);

// "/test/:id/hi"

test(
  "param",
  (_) =>
    assert.deepStrictEqual(
      new Function(
        ` return ${
          slicer(
            map({ hasName: "http://localhost:8080/" })({
              path: "/test/:id/hi",
              f: (_) => "hello",
            } as Petition),
          )
        }`,
      )()("http://localhost:8080/test/hello/hi"),
      "hello",
    ),
);
test(
  "param",
  (_) =>
    assert.deepStrictEqual(
      new Function(
        ` return ${
          slicer(
            map({ hasName: "http://localhost:8080/" })({
              path: "/test/:id/hi",
              f: (_) => "hello",
            } as Petition),
          )
        }`,
      )()("http://localhost:8080/test/hello/hi?a=1"),
      "hello",
    ),
);

test(
  "param",
  (_) =>
    (
      (f) =>
        assert.deepStrictEqual(
          [
            f("http://localhost:8080/test/hello/hi"),
            f("http://localhost:8080/test/hello/hi"),
          ],
          ["hello", "hello"],
        )
    )(
      new Function(` return ${
        slicer(
          map()({
            path: "/test/:id/hi",
            f: (_) => "hello",
          } as Petition),
        )
      }`)(),
    ),
);
test(
  "param",
  (_) =>
    (
      (f) =>
        assert.deepStrictEqual(
          [
            f("http://localhost:8080/test/hello/hi?a=1"),
            f("http://localhost:8080/test/hello/hi?a=1"),
          ],
          ["hello", "hello"],
        )
    )(
      new Function(` return ${
        slicer(
          map()({
            path: "/test/:id/hi",
            f: (_) => "hello",
          } as Petition),
        )
      }`)(),
    ),
);

// "/test/:id/hi/"

test(
  "param",
  (_) =>
    assert.deepStrictEqual(
      new Function(
        ` return ${
          slicer(
            map({ hasName: "http://localhost:8080/" })({
              path: "/test/:id/hi/",
              f: (_) => "hello",
            } as Petition),
          )
        }`,
      )()("http://localhost:8080/test/hello/hi/"),
      "hello",
    ),
);
test(
  "param",
  (_) =>
    assert.deepStrictEqual(
      new Function(
        ` return ${
          slicer(
            map({ hasName: "http://localhost:8080/" })({
              path: "/test/:id/hi/",
              f: (_) => "hello",
            } as Petition),
          )
        }`,
      )()("http://localhost:8080/test/hello/hi/?a=1"),
      "hello",
    ),
);

test(
  "param",
  (_) =>
    (
      (f) =>
        assert.deepStrictEqual(
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
            map()({
              path: "/test/:id/hi/",
              f: (_) => "hello",
            } as Petition),
          )
        }`,
      )(),
    ),
);
test(
  "param",
  (_) =>
    (
      (f) =>
        assert.deepStrictEqual(
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
            map()({
              path: "/test/:id/hi/",
              f: (_) => "hello",
            } as Petition),
          )
        }`,
      )(),
    ),
);

// "/:test/:id/hi/"

test(
  "param",
  (_) =>
    assert.deepStrictEqual(
      new Function(
        ` return ${
          slicer(
            map({ hasName: "http://localhost:8080/" })({
              path: "/:test/:id/hi/",
              f: (_) => "hello",
            } as Petition),
          )
        }`,
      )()("http://localhost:8080/hello/world/hi/"),
      "hello/world",
    ),
);
test(
  "param",
  (_) =>
    assert.deepStrictEqual(
      new Function(
        ` return ${
          slicer(
            map({ hasName: "http://localhost:8080/" })({
              path: "/:test/:id/hi/",
              f: (_) => "hello",
            } as Petition),
          )
        }`,
      )()("http://localhost:8080/hello/world/hi/?a=1"),
      "hello/world",
    ),
);
test(
  "param",
  (_) =>
    (
      (f) =>
        assert.deepStrictEqual(
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
            map()({
              path: "/:test/:id/hi/",
              f: (_) => "hello",
            } as Petition),
          )
        }`,
      )(),
    ),
);
test(
  "param",
  (_) =>
    (
      (f) =>
        assert.deepStrictEqual(
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
            map()({
              path: "/:test/:id/hi/",
              f: (_) => "hello",
            } as Petition),
          )
        }`,
      )(),
    ),
);
