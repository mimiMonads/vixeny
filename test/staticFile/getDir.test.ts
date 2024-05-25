import assert from "node:assert";
import test from "node:test";

import staticFileTools from "../../src/staticFiles/staticFileTools.ts";

test(
  "static",
  () =>
    assert.deepStrictEqual(
      staticFileTools.getDir("./misc/").every((x) =>
        x[0] === "." && x[1] === "/"
      ),
      true,
    ),
);
