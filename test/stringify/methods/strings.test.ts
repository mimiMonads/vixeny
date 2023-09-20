import assert from "node:assert";
import test from "node:test"
import string from "../../../components/stringify/methods/json_string.ts";

test(
  "string",
  (_) =>
    assert.deepStrictEqual(
      string({ type: "string", name: "hello", required: true, path: ".hello" }),
      `'"hello":' + str(o.hello)`,
    ),
);

test(
  "string",
  (_) =>
    assert.deepStrictEqual(
      string({
        type: "string",
        name: "hello",
        required: false,
        path: ".hello",
      }),
      `'"hello":' + (typeof o.hello === "string"?str(o.hello):'null')`,
    ),
);

test(
  "string",
  (_) =>
    assert.deepStrictEqual(
      string({ type: "string", name: "hello", required: true, const: "hi" }),
      `'"hello":"hi"'`,
    ),
);

test(
  "string",
  (_) =>
    assert.deepStrictEqual(
      string({ type: "string", name: "hello", required: true, default: "hi" }),
      string({ type: "string", name: "hello", required: false, default: "hi" }),
    ),
);
