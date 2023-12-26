import convert from "../../../src/stringify/safe.mjs"; // Adjust this import to the name of your file

import test from "../../../../util/test.mjs";

((test) => (describe) => (
  test("hello - Test composer with simple string property", () =>
    describe(JSON.parse(convert({
      type: "object",
      properties: {
        hello: { type: "string" },
      },
      required: ["hello"],
    })({ hello: 'wo"rld' })))
    .toEqual({ hello: 'wo"rld' })),

  test("hello - Test composer with nested object property", () =>
    describe(JSON.parse(convert({
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
    })({ hello: { hello: "hi" } })))
    .toEqual({ hello: { hello: "hi" } })),

  test("hello - Test composer with deeply nested object property", () =>
    describe(JSON.parse(convert({
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
    })({ hello: { hello: { hello: "string" } } })))
    .toEqual({ hello: { hello: { hello: "string" } } })),

  test("hello - Test composer with number property and explicit value", () =>
    describe(JSON.parse(convert({
      type: "object",
      properties: {
        hello: { type: "number", default: 2 },
      },
      required: ["hello"],
    })({ hello: 1 })))
    .toEqual({ hello: 1 })),

  test("hello - Test composer with number property and default value", () =>
    describe(JSON.parse(convert({
      type: "object",
      properties: {
        hello: { type: "number", default: 2 },
      },
      required: ["hello"],
    })({})))
    .toEqual({ hello: 2 }))
))(test.test)(test.describe)
