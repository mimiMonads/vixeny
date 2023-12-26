import convert from "../../../src/stringify/safe.mjs"; // Adjust this import to the name of your file
import test from "../../../../util/test.mjs";

((test) => (describe) => (
  test("hello - Test composer with simple string property", () =>
    describe(convert({
      type: "object",
      properties: {
        hello: { type: "string" },
      },
      required: ["hello"],
    })({ hello: 'wo"rld' }))
    .toEqual(JSON.stringify({ hello: 'wo"rld' }))),

  test("hello - Test composer with nested object property", () =>
    describe(convert({
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
    })({ hello: { hello: "hi" } }))
    .toEqual(JSON.stringify({ hello: { hello: "hi" } }))),

  test("hello - Test composer with deeply nested object property", () =>
    describe(convert({
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
    })({ hello: { hello: { hello: "string" } } }))
    .toEqual(JSON.stringify({ hello: { hello: { hello: "string" } } }))),

  test("hello - Test composer with number property and explicit value", () =>
    describe(convert({
      type: "object",
      properties: {
        hello: { type: "number", default: 2 },
      },
      required: ["hello"],
    })({ hello: 1 }))
    .toEqual(JSON.stringify({ hello: 1 }))),

  test("hello - Test composer with number property and default value", () =>
    describe(convert({
      type: "object",
      properties: {
        hello: { type: "number", default: 2 },
      },
      required: ["hello"],
    })({}))
    .toEqual(JSON.stringify({ hello: 2 }))),

  test("hello - Test composer with multiple properties including array", () =>
    describe(convert({
      type: "object",
      properties: {
        hello: { type: "number", default: 2 },
        string: { type: "string", default: "hello" },
        array: { type: "array" },
      },
      required: ["hello", "string", "array"],
    })({ array: ["hello", 2, ["hello", 2]] }))
    .toEqual(JSON.stringify({
      hello: 2,
      string: "hello",
      array: ["hello", 2, ["hello", 2]],
    })))
))(test.test)(test.describe)
