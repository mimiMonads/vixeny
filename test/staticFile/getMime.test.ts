import assert from "node:assert";
import test from "node:test";

import staticFileTools from "../../src/staticFiles/staticFileTools.ts";

test(
  "statci file gets mine",
  () => {
    assert.deepStrictEqual(
      staticFileTools.getMime([[".hello", "hello"]])(".hello"),
      "hello",
    );
    assert.deepStrictEqual(
      staticFileTools.getMime([[".txt", "hello"]])(".hello"),
      "text/html",
    );
  },
);
