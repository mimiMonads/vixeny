import assert from "node:assert";
import test from "node:test"
import composer from "../../../components/stringify/stringify.ts";

test(
  "hello",
  (_) =>
    assert.deepStrictEqual(

      composer({
        type: "object",
        properties: {
          hello: { type: "string" },
        },
        required: ["hello"],
      })({ hello: 'wo"rld' }),

      JSON.stringify({ hello: 'wo"rld' }),
    ),
);

test(
  "hello",
  (_) =>
    assert.deepStrictEqual(
      composer({
        type: "object",
        properties: {
          hello: {
            type: "object",
            properties: {
              hello: { type: "string" },
            },
            required: ["hello"],
          },
        },
        required: ["hello"],
      })({ hello: { hello: "hi" } }),

      JSON.stringify({ hello: { hello: "hi" } }),
    ),
);

test(
  "hello",
  (_) =>
    assert.deepStrictEqual(
      composer({
        type: "object",
        properties: {
          hello: {
            type: "object",
            properties: {
              hello: {
                type: "object",
                properties: {
                  hello: { type: "string" },
                },
                required: ["hello"],
              },
            },
            required: ["hello"],
          },
        },
        required: ["hello"],
      })({ hello: { hello: { hello: "string" } } }),

      JSON.stringify({ hello: { hello: { hello: "string" } } }),
    ),
);

test(
  "hello",
  (_) =>
    assert.deepStrictEqual(

      composer({
        type: "object",
        properties: {
          hello: { type: "number", default: 2 },
        },
        required: ["hello"],
      })({ hello: 1 }),

      JSON.stringify({ hello: 1 })
    ),
);

test(
  "hello",
  (_) =>
    assert.deepStrictEqual(

      composer({
        type: "object",
        properties: {
          hello: { type: "number", default: 2 },
        },
        required: ["hello"],
      })({}),

      JSON.stringify({ hello: 2 })
    ),
);
test(
  "hello",
  (_) =>
    assert.deepStrictEqual(

      composer({
        type: "object",
        properties: {
          hello: { type: "number", default: 2 },
          string: { type: "string", default: "hello" },
          array: { type: "array" }
        },
        required: ["hello", "string", "array"],
      })({ array: ["hello", 2, ["hello", 2]] } as unknown as Record<string, string>),
      JSON.stringify({ hello: 2, string: "hello", array: ["hello", 2, ["hello", 2]] })
    ),
);
