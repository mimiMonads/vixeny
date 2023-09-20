import assert from "node:assert";
import test from "node:test"
import checker from "../../optimizer/checker.ts";

test(
  "Params",
  (_) =>
    assert.deepStrictEqual(
      checker([])(["param"])([])("r=> r. param "),
      ["param"],
    ),
);
