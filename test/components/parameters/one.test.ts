import one from "../../../src/components/parameters/one.ts";
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
          one(
            map({ hasName: "http://localhost:8080/" })({
              path: "/test/:id",
              f: (_) => "hello",
            } as Petition),
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
            map({ hasName: "http://localhost:8080/" })({
              path: "/test/:id",
              f: (_) => "hello",
            } as Petition),
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
        ` return ${
          one(map()({ path: "/test/:id", f: (_) => "hello" } as Petition))
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
            f("http://localhost:8080/test/hello?a=1").id,
            f("http://localhost:8080/test/hello?a=1").id,
          ],
          ["hello", "hello"],
        )
    )(
      new Function(
        ` return ${
          one(map()({ path: "/test/:id", f: (_) => "hello" } as Petition))
        }`,
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
            } as Petition),
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
            map({ hasName: "http://localhost:8080/" })({
              path: "/test/:id/",
              f: (_) => "hello",
            } as Petition),
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
        ` return ${
          one(map()({ path: "/test/:id/", f: (_) => "hello" } as Petition))
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
            f("http://localhost:8080/test/hello/?a=1").id,
            f("http://localhost:8080/test/hello/?a=1").id,
          ],
          ["hello", "hello"],
        )
    )(
      new Function(
        ` return ${
          one(map()({ path: "/test/:id/", f: (_) => "hello" } as Petition))
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
          one(
            map({ hasName: "http://localhost:8080/" })({
              path: "/test/:id/hi",
              f: (_) => "hello",
            } as Petition),
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
            map({ hasName: "http://localhost:8080/" })({
              path: "/test/:id/hi",
              f: (_) => "hello",
            } as Petition),
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
          one(map()({ path: "/test/:id/hi", f: (_) => "hello" } as Petition))
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
          one(map()({ path: "/test/:id/hi", f: (_) => "hello" } as Petition))
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
            map({ hasName: "http://localhost:8080/" })({
              path: "/test/:id/hi/",
              f: (_) => "hello",
            } as Petition),
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
            map({ hasName: "http://localhost:8080/" })({
              path: "/test/:id/hi/",
              f: (_) => "hello",
            } as Petition),
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
          one(map()({ path: "/test/:id/hi/", f: (_) => "hello" } as Petition))
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
          one(map()({ path: "/test/:id/hi/", f: (_) => "hello" } as Petition))
        }`,
      )(),
    ),
);
