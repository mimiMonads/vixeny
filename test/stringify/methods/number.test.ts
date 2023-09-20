import assert from "node:assert";
import test from "node:test"
import number from "../../../components/stringify/methods/json_number.ts";

test(
  "hello",
  (_) =>
    assert.deepStrictEqual(
      number({
        type: "number",
        name: "hello",
        required: true,
        const: 1,
        path: ".hello",
      }),
      `'"hello":' + 1`,
    ),
);

test(
  "hello",
  (_) =>
    assert.deepStrictEqual(
      number({ type: "number", name: "hello", required: true, path: ".hello" }),
      `'"hello":'+( typeof o.hello === "number"?o.hello:'null')`,
    ),
);

test(
  "hello",
  (_) =>
    assert.deepStrictEqual(
      number({
        type: "number",
        name: "hello",
        required: false,
        default: 5,
        path: ".hello",
      }),
      `'"hello":'+( typeof o.hello === "number"?o.hello:'5')`,
    ),
);

test(
  "hello",
  (_) =>
    assert.deepStrictEqual(
      number({
        type: "number",
        name: "hello",
        required: true,
        default: 5,
        path: ".hello",
      }),
      number({
        type: "number",
        name: "hello",
        required: false,
        default: 5,
        path: ".hello",
      }),
    ),
);
