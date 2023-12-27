import convert from "../../../src/stringify/methods/json_boolean.mjs"; // Adjust this import to the name of your file

import test from "../../../../util/test.mjs";

((test) => (describe) => (
  test("hello - Handles boolean with constant value", () =>
    describe(convert({
      type: "boolean",
      name: "hello",
      required: true,
      const: true,
      path: ".hello",
    }))
      .toEqual(`'"hello":' + true`)),
    test("hello - Handles required boolean with name and path", () =>
      describe(convert({
        type: "boolean",
        name: "hello",
        required: true,
        path: ".hello",
      }))
        .toEqual(`'"hello":'+( typeof o.hello === "boolean"?o.hello:'null')`)),
    test("hello - Handles required boolean with default value", () =>
      describe(convert({
        type: "boolean",
        name: "hello",
        required: true,
        default: true,
        path: ".hello",
      }))
        .toEqual(`'"hello":'+( typeof o.hello === "boolean"?o.hello:'true')`)),
    test("hello - Compares required and optional boolean with default value", () =>
      describe(convert({
        type: "boolean",
        name: "hello",
        required: true,
        default: true,
        path: ".hello",
      }))
        .toEqual(convert({
          type: "boolean",
          name: "hello",
          required: false,
          default: true,
          path: ".hello",
        })))
))(test.test)(test.describe);
