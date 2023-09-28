import assert from "node:assert";
import test from "node:test";
import paths from "../../util/paths.ts";
import optimize from "../../../optimizer/optimize.ts";
import split from "../../../builder/atlas/splitter.ts";

test(
  "arraySwap",
  (_) =>
    assert.deepStrictEqual(
      split({ hasName: "http://localhost:8080/" })(
        optimize({ hasName: "http://localhost:8080/" })(paths),
      )[0].map((x) => [x[0], x[1], x[2]]),
      [
        [1, "/", "GET"],
        [1, "/one", "GET"],
        [1, "/two", "GET"],
        [1, "/three", "GET"],
        [1, "/four", "GET"],
        [1, "/five", "GET"],
        [1, "/six", "GET"],
        [1, "/test", "GET"],
        [2, "/test/", "GET"],
        [4, "/test/:id/:name/", "GET"],
        [1, "/", "POST"],
        [1, "/", "HEAD"],
        [1, "/", "DELETE"],
      ],
    ),
);

test(
  "arraySwap",
  (_) =>
    assert.deepStrictEqual(
      split()(optimize()(paths))[0].map((x) => [x[0], x[1], x[2]]),
      [
        [1, "/", "GET"],
        [1, "/one", "GET"],
        [1, "/two", "GET"],
        [1, "/three", "GET"],
        [1, "/four", "GET"],
        [1, "/five", "GET"],
        [1, "/six", "GET"],
        [1, "/test", "GET"],
        [2, "/test/", "GET"],
        [4, "/test/:id/:name/", "GET"],
        [1, "/", "POST"],
        [1, "/", "HEAD"],
        [1, "/", "DELETE"],
      ],
    ),
);

test(
  "cheksplit",
  () => {
    assert.deepStrictEqual(
      split()(
        optimize()([{ path: "/", f: () => "hello" }, {
          path: "/hello/*",
          f: () => "wild",
        }, { path: "/hello/hello/*", f: () => "wild" }]),
      )[1][2],
      [
        [
          ["/hello/"],
          ["/hello/hello/"],
        ],
      ],
    );
  },
);

test(
  "cheksplit",
  () => {
    assert.deepStrictEqual(
      split()(
        optimize()([
          {
            path: "/",
            f: () => "hello",
          },
          { path: "/hello/*", f: () => "wild" },
          { path: "/hello/hello/*", f: () => "wild" },
          { type: "fileServer", path: "./test/", name: "/static/" },
        ]),
      )[1][2],
      [
        [
          ["/hello/", "/static/"],
          ["/hello/hello/"],
        ],
      ],
    );
  },
);
test(
  "cheksplit",
  () => {
    assert.deepStrictEqual(
      split()(optimize()([{ path: "/", f: () => "hello" }]))[1][2],
      [],
    );
  },
);
