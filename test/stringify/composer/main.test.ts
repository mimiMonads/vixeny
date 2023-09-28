import assert from "node:assert";
import test from "node:test";
import composer from "../../../components/stringify/stringify.ts";

test(
  "hello",
  (_) =>
    assert.deepStrictEqual(
      JSON.parse(
        composer({
          type: "object",
          properties: {
            hello: { type: "string" },
          },
          required: ["hello"],
        })({ hello: 'wo"rld' }),
      ),
      { hello: 'wo"rld' },
    ),
);

test(
  "hello",
  (_) =>
    assert.deepStrictEqual(
      JSON.parse(
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
      ),
      { hello: { hello: "hi" } },
    ),
);

test(
  "hello",
  (_) =>
    assert.deepStrictEqual(
      JSON.parse(
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
      ),
      { hello: { hello: { hello: "string" } } },
    ),
);

test(
  "hello",
  (_) =>
    assert.deepStrictEqual(
      JSON.parse(
        composer({
          type: "object",
          properties: {
            hello: { type: "number", default: 2 },
          },
          required: ["hello"],
        })({ hello: 1 }),
      ),
      { hello: 1 },
    ),
);

test(
  "hello",
  (_) =>
    assert.deepStrictEqual(
      JSON.parse(
        composer({
          type: "object",
          properties: {
            hello: { type: "number", default: 2 },
          },
          required: ["hello"],
        })({}),
      ),
      { hello: 2 },
    ),
);
