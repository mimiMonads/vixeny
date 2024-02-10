import assert from "node:assert";
import test from "node:test";
import main from "../../../src/framework/optimizer/staticFiles/main.ts";

test(
  "test",
  () =>
    assert.deepStrictEqual(
      main({ type: "fileServer", path: "./misc/", name: "/hello", mime: false })
        .some((x) => x.path === "/hello/logo.png"),
      true,
    ),
);

test(
  "test",
  () =>
    assert.deepStrictEqual(
      main({ type: "fileServer", path: "./misc/", name: "/", mime: false })
        .some((x) => x.path === "/logo.png"),
      true,
    ),
);

test(
  "test",
  () =>
    assert.deepStrictEqual(
      main({
        type: "fileServer",
        path: "./misc/",
        name: "/hello/nested",
        mime: false,
      }).some((x) => x.path === "/hello/nested/logo.png"),
      true,
    ),
);

test(
  "test",
  () =>
    assert.deepStrictEqual(
      main({
        type: "fileServer",
        path: "./misc/",
        name: "/hello/nested",
        mime: false,
        plugins: {
          checker: (s) => s.includes(".png"),
          r: (s) => ({
            type: "response",
            path: s.slice(0, -4),
            r: () => new Response(""),
          }),
        },
      })
        .some((x) => x.path === "/hello/nested/logo"),
      true,
    ),
);
