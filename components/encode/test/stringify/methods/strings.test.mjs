import convert from "../../../src/stringify/methods/json_string.mjs";

import test from "../../../../util/test.mjs";

((test) => (describe) => (
  test("string - Handles required string with name and path", () =>
    describe(
      convert({
        type: "string",
        name: "hello",
        required: true,
        path: ".hello",
      }),
    )
      .toEqual(`'"hello":' + str(o.hello)`)),
    test("string - Handles optional string with name and path", () =>
      describe(convert({
        type: "string",
        name: "hello",
        required: false,
        path: ".hello",
      }))
        .toEqual(
          `'"hello":' + (typeof o.hello === "string"?str(o.hello):'null')`,
        )),
    test("string - Handles required string with constant value", () =>
      describe(
        convert({ type: "string", name: "hello", required: true, const: "hi" }),
      )
        .toEqual(`'"hello":"hi"'`)),
    test("string - Compares required and optional string with default value", () =>
      describe(
        convert({
          type: "string",
          name: "hello",
          required: true,
          default: "hi",
        }),
      )
        .toEqual(
          convert({
            type: "string",
            name: "hello",
            required: false,
            default: "hi",
          }),
        ))
))(test.test)(test.describe);
