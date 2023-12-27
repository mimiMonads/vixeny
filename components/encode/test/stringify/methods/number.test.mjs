import convert from "../../../src/stringify/methods/json_number.mjs"; // Adjust this import to the name of your file

import test from "../../../../util/test.mjs";

((test) => (describe) => (
  test("hello - Handles number with constant value", () =>
    describe(convert({
      type: "number",
      name: "hello",
      required: true,
      const: 1,
      path: ".hello",
    }))
      .toEqual(`'"hello":' + 1`)),
    test("hello - Handles required number with name and path", () =>
      describe(
        convert({
          type: "number",
          name: "hello",
          required: true,
          path: ".hello",
        }),
      )
        .toEqual(`'"hello":'+( typeof o.hello === "number"?o.hello:'null')`)),
    test("hello - Handles optional number with default value", () =>
      describe(convert({
        type: "number",
        name: "hello",
        required: false,
        default: 5,
        path: ".hello",
      }))
        .toEqual(`'"hello":'+( typeof o.hello === "number"?o.hello:'5')`)),
    test("hello - Compares required and optional number with default value", () =>
      describe(convert({
        type: "number",
        name: "hello",
        required: true,
        default: 5,
        path: ".hello",
      }))
        .toEqual(convert({
          type: "number",
          name: "hello",
          required: false,
          default: 5,
          path: ".hello",
        })))
))(test.test)(test.describe);
