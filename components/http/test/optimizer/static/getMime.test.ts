import assert from "node:assert";
import test from "node:test";

import getMime from "../../../src/framework/optimizer/staticFiles/getMime.ts";

test(
  "test",
  () =>
    assert.deepStrictEqual(
      getMime([[".txt", "hello"]])(".hello"),
      "text/html",
    ),
);

test(
  "test",
  () =>
    assert.deepStrictEqual(
      getMime([[".hello", "hello"]])(".hello"),
      "hello",
    ),
);
