import { assertEquals } from "@std/assert";
import { test } from "@cross/test";
import main from "../../src/staticFiles/staticFileMain.ts";
import { type fileServerPetition } from "../../src/morphism.ts";
import { petitions, plugins } from "../../main.ts";

test(
  "static file checking logo",
  () =>
    assertEquals(
      main()()({
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
  "static file checking extension",
  () =>
    assertEquals(
      main()()({
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
    assertEquals(
      main()()({ type: "fileServer", path: "./misc/", name: "/", mime: false })
        .some((x) => x.path === "/logo.png"),
      true,
    ),
);

test(
  "static file has nested path",
  () =>
    assertEquals(
      main()()({
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
    assertEquals(
      main()()({
        type: "fileServer",
        path: "./misc/",
        name: "/hello/nested",
        mime: false,
        template: [plugins.staticFilePlugin({
          checker: (s) => s.path.includes(".png"),
          type: "add",
          p: (options) =>
            petitions.add()({
              path: options.relativeName.slice(0, -4),
              f: () => new Response("hello"),
            }),
        })],
      }).some((p) => p.path === "/hello/nested/logo"),
      true,
    ),
);
