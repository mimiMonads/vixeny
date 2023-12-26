import assert from "node:assert";
import test from "node:test";
import main from "../../../optimizer/staticFiles/main.ts";

test(
  "test",
  () =>
    assert.deepStrictEqual(
      main({ type: "fileServer", path: "./test/", name: "/hello", mime: false })
        .some((x) => x.path === "/hello/fun.test.ts"),
      true,
    ),
);

test(
  "test",
  () =>
    assert.deepStrictEqual(
      main({ type: "fileServer", path: "./test/", name: "/", mime: false })
        .some((x) => x.path === "/fun.test.ts"),
      true,
    ),
);

test(
  "test",
  () =>
    assert.deepStrictEqual(
      main({
        type: "fileServer",
        path: "./test/",
        name: "/hello/nested",
        mime: false,
      }).some((x) => x.path === "/hello/nested/fun.test.ts"),
      true,
    ),
);
