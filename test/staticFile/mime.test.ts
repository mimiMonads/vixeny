import assert from "node:assert";
import test from "node:test";

import staticFileTools from "../../src/staticFiles/staticFileTools.ts";

test(
  "cheking mime",
  () => {
    assert.deepStrictEqual(
      staticFileTools.mimeForm({
        type: "fileServer",
        path: "./",
        name: "/hello/",
      }).length,
      74,
    );
    assert.deepStrictEqual(
      staticFileTools.mimeForm({
        type: "fileServer",
        path: "./",
        name: "/hello/",
        mime: false,
      })
        .length,
      0,
    );
    assert.deepStrictEqual(
      staticFileTools.mimeForm({
        type: "fileServer",
        path: "./",
        name: "/hello/",
        extra: [[".ts", "hello/hello"]],
      }).at(74),
      [".ts", "hello/hello"],
    );
  },
);
