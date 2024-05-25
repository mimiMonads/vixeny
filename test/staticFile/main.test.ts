import assert from "node:assert";
import test from "node:test";
import main from "../../src/staticFiles/staticFileMain.ts";
import { petitions } from "../../src/morphism.ts";

test(
  "static file cheking logo",
  () =>
    assert.deepStrictEqual(
      main()({
        type: "fileServer",
        path: "./misc/",
        name: "/hello",
        mime: false,
      })
        .some((x) => x.path === "/hello/logo.png"),
      true,
    ),
);

test(
  "static file cheking extension",
  () =>
    assert.deepStrictEqual(
      main()({
        type: "fileServer",
        path: "./misc/",
        name: "/hello",
        mime: false,
        removeExtensionOf: [".png"],
      })
        .some((x) => x.path === "/hello/logo"),
      true,
    ),
);

test(
  "static file has path",
  () =>
    assert.deepStrictEqual(
      main()({ type: "fileServer", path: "./misc/", name: "/", mime: false })
        .some((x) => x.path === "/logo.png"),
      true,
    ),
);

test(
  "static file has nested path",
  () =>
    assert.deepStrictEqual(
      main()({
        type: "fileServer",
        path: "./misc/",
        name: "/hello/nested",
        mime: false,
      }).some((x) => x.path === "/hello/nested/logo.png"),
      true,
    ),
);

test(
  "static file plugin",
  () =>
    assert.deepStrictEqual(
      main()({
        type: "fileServer",
        path: "./misc/",
        name: "/hello/nested",
        mime: false,
        template: [{
          checker: (s) => s.includes(".png"),
          type: "response",
          r: (options) =>
            petitions.response()({
              path: options.relativeName.slice(0, -4),
              r: () => new Response(""),
            }),
        }],
      })
        .some((x) => x.path === "/hello/nested/logo"),
      true,
    ),
);
