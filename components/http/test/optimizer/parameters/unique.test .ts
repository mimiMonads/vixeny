import one from "../../../src/parameters/unique.ts";
import map from "../../../src/parameters/map.ts";
import assert from "node:assert";
import test from "node:test";

// "/test/:id"
console.log(
  one(map()({ path: "/test/:id", f: (_) => "hello" })),
);

test(
  "param",
  (_) =>
    assert.deepStrictEqual(
      new Function(
        ` return ${
          one(
            map({ hasName: "http://localhost:8080/" })({
              path: "/test/:id",
              f: (_) => "hello",
            }),
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
          one(
            map({ hasName: "http://localhost:8080/" })({
              path: "/test/:id",
              f: (_) => "hello",
            }),
          )
        }`,
      )()("http://localhost:8080/test/hello?a=1"),
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
            f("http://localhost:8080/test/hello"),
            f("http://localhost:8080/test/hello"),
          ],
          ["hello", "hello"],
        )
    )(
      new Function(
        ` return ${one(map()({ path: "/test/:id", f: (_) => "hello" }))}`,
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
            f("http://localhost:8080/test/hello?a=1"),
            f("http://localhost:8080/test/hello?a=1"),
          ],
          ["hello", "hello"],
        )
    )(
      new Function(
        ` return ${one(map()({ path: "/test/:id", f: (_) => "hello" }))}`,
      )(),
    ),
);

// "/test/:id/"

test(
  "param",
  (_) =>
    assert.deepStrictEqual(
      new Function(
        ` return ${
          one(
            map({ hasName: "http://localhost:8080/" })({
              path: "/test/:id/",
              f: (_) => "hello",
            }),
          )
        }`,
      )()("http://localhost:8080/test/hello/"),
      "hello",
    ),
);
test(
  "param",
  (_) =>
    assert.deepStrictEqual(
      new Function(
        ` return ${
          one(
            map({ hasName: "http://localhost:8080/" })({
              path: "/test/:id/",
              f: (_) => "hello",
            }),
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
        ` return ${one(map()({ path: "/test/:id/", f: (_) => "hello" }))}`,
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
        ` return ${one(map()({ path: "/test/:id/", f: (_) => "hello" }))}`,
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
          one(
            map({ hasName: "http://localhost:8080/" })({
              path: "/test/:id/hi",
              f: (_) => "hello",
            }),
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
          one(
            map({ hasName: "http://localhost:8080/" })({
              path: "/test/:id/hi",
              f: (_) => "hello",
            }),
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
      new Function(
        ` return ${one(map()({ path: "/test/:id/hi", f: (_) => "hello" }))}`,
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
            f("http://localhost:8080/test/hello/hi?a=1"),
            f("http://localhost:8080/test/hello/hi?a=1"),
          ],
          ["hello", "hello"],
        )
    )(
      new Function(
        ` return ${one(map()({ path: "/test/:id/hi", f: (_) => "hello" }))}`,
      )(),
    ),
);

// "/test/:id/hi/"

test(
  "param",
  (_) =>
    assert.deepStrictEqual(
      new Function(
        ` return ${
          one(
            map({ hasName: "http://localhost:8080/" })({
              path: "/test/:id/hi/",
              f: (_) => "hello",
            }),
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
          one(
            map({ hasName: "http://localhost:8080/" })({
              path: "/test/:id/hi/",
              f: (_) => "hello",
            }),
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
        ` return ${one(map()({ path: "/test/:id/hi/", f: (_) => "hello" }))}`,
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
        ` return ${one(map()({ path: "/test/:id/hi/", f: (_) => "hello" }))}`,
      )(),
    ),
);
