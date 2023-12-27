import assert from "node:assert";
import test from "node:test";

import getDir from "../../../src/framework/optimizer/staticFiles/getDir.ts";

test(
  "static",
  () =>
    assert.deepStrictEqual(
      getDir("./misc/").every((x) => x[0] === "." && x[1] === "/"),
      true,
    ),
);
