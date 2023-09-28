import one from "../../../components/parameters/one.ts";
import options from "../../../components/parameters/map.ts";
import assert from "node:assert";
import test from "node:test";

// "/test/:id"
test(
  "param",
  (_) =>
    assert.deepStrictEqual(
      new Function(
        ` return ${
          one(
            options({ hasName: "http://localhost:8080/" })({
              path: "/test/:id",
              f: (_) => "hello",
            }),
          )
        }`,
      )()("http://localhost:8080/test/hello").id,
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
            options({ hasName: "http://localhost:8080/" })({
              path: "/test/:id",
              f: (_) => "hello",
            }),
          )
        }`,
      )()("http://localhost:8080/test/hello?a=1").id,
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
            f("http://localhost:8080/test/hello").id,
            f("http://localhost:8080/test/hello").id,
          ],
          ["hello", "hello"],
        )
    )(
      new Function(
        ` return ${one(options()({ path: "/test/:id", f: (_) => "hello" }))}`,
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
            f("http://localhost:8080/test/hello?a=1").id,
            f("http://localhost:8080/test/hello?a=1").id,
          ],
          ["hello", "hello"],
        )
    )(
      new Function(
        ` return ${one(options()({ path: "/test/:id", f: (_) => "hello" }))}`,
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
            options({ hasName: "http://localhost:8080/" })({
              path: "/test/:id/",
              f: (_) => "hello",
            }),
          )
        }`,
      )()("http://localhost:8080/test/hello/").id,
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
            options({ hasName: "http://localhost:8080/" })({
              path: "/test/:id/",
              f: (_) => "hello",
            }),
          )
        }`,
      )()("http://localhost:8080/test/hello/?a=1").id,
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
            f("http://localhost:8080/test/hello/").id,
            f("http://localhost:8080/test/hello/").id,
          ],
          ["hello", "hello"],
        )
    )(
      new Function(
        ` return ${one(options()({ path: "/test/:id/", f: (_) => "hello" }))}`,
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
            f("http://localhost:8080/test/hello/?a=1").id,
            f("http://localhost:8080/test/hello/?a=1").id,
          ],
          ["hello", "hello"],
        )
    )(
      new Function(
        ` return ${one(options()({ path: "/test/:id/", f: (_) => "hello" }))}`,
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
            options({ hasName: "http://localhost:8080/" })({
              path: "/test/:id/hi",
              f: (_) => "hello",
            }),
          )
        }`,
      )()("http://localhost:8080/test/hello/hi").id,
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
            options({ hasName: "http://localhost:8080/" })({
              path: "/test/:id/hi",
              f: (_) => "hello",
            }),
          )
        }`,
      )()("http://localhost:8080/test/hello/hi?a=1").id,
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
            f("http://localhost:8080/test/hello/hi").id,
            f("http://localhost:8080/test/hello/hi").id,
          ],
          ["hello", "hello"],
        )
    )(
      new Function(
        ` return ${
          one(options()({ path: "/test/:id/hi", f: (_) => "hello" }))
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
            f("http://localhost:8080/test/hello/hi?a=1").id,
            f("http://localhost:8080/test/hello/hi?a=1").id,
          ],
          ["hello", "hello"],
        )
    )(
      new Function(
        ` return ${
          one(options()({ path: "/test/:id/hi", f: (_) => "hello" }))
        }`,
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
            options({ hasName: "http://localhost:8080/" })({
              path: "/test/:id/hi/",
              f: (_) => "hello",
            }),
          )
        }`,
      )()("http://localhost:8080/test/hello/hi/").id,
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
            options({ hasName: "http://localhost:8080/" })({
              path: "/test/:id/hi/",
              f: (_) => "hello",
            }),
          )
        }`,
      )()("http://localhost:8080/test/hello/hi/?a=1").id,
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
            f("http://localhost:8080/test/hello/hi/").id,
            f("http://localhost:8080/test/hello/hi/").id,
          ],
          ["hello", "hello"],
        )
    )(
      new Function(
        ` return ${
          one(options()({ path: "/test/:id/hi/", f: (_) => "hello" }))
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
            f("http://localhost:8080/test/hello/hi/?a=1").id,
            f("http://localhost:8080/test/hello/hi/?a=1").id,
          ],
          ["hello", "hello"],
        )
    )(
      new Function(
        ` return ${
          one(options()({ path: "/test/:id/hi/", f: (_) => "hello" }))
        }`,
      )(),
    ),
);
