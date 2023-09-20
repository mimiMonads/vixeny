import assert from "node:assert";
import test from "node:test"
import selector from "../../../components/stringify/composer/selector.ts";

test(
  "hello",
  (_) =>
    assert.deepStrictEqual(
      selector([{
        type: "string",
        name: "hello2",
        required: false,
        const: "world",
      }]),
      `'"hello2":"world"'`,
    ),
);
