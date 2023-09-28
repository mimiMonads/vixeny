import assert from "node:assert";
import test from "node:test";
import boolean from "../../../components/stringify/methods/json_boolean.ts";

test(
  "hello",
  (_) =>
    assert.deepStrictEqual(
      boolean({
        type: "boolean",
        name: "hello",
        required: true,
        const: true,
        path: ".hello",
      }),
      `'"hello":' + true`,
    ),
);

test(
  "hello",
  (_) =>
    assert.deepStrictEqual(
      boolean({
        type: "boolean",
        name: "hello",
        required: true,
        path: ".hello",
      }),
      `'"hello":'+( typeof o.hello === "boolean"?o.hello:'null')`,
    ),
);

test(
  "hello",
  (_) =>
    assert.deepStrictEqual(
      boolean({
        type: "boolean",
        name: "hello",
        required: true,
        default: true,
        path: ".hello",
      }),
      `'"hello":'+( typeof o.hello === "boolean"?o.hello:'true')`,
    ),
);

test(
  "hello",
  (_) =>
    assert.deepStrictEqual(
      boolean({
        type: "boolean",
        name: "hello",
        required: true,
        default: true,
        path: ".hello",
      }),
      boolean({
        type: "boolean",
        name: "hello",
        required: false,
        default: true,
        path: ".hello",
      }),
    ),
);

test(
  "hello",
  (_) =>
    assert.deepStrictEqual(
      boolean({
        type: "boolean",
        name: "hello",
        required: true,
        default: true,
        path: ".hello",
      }),
      boolean({
        type: "boolean",
        name: "hello",
        required: false,
        default: true,
        path: ".hello",
      }),
    ),
);
