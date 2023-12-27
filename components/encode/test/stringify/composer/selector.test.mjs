import convert from "../../../src/stringify/composer/selector.mjs"; // Adjust this import to the name of your file
import test from "../../../../util/test.mjs";

((test) => (describe) => (
  test("hello - Test selector with string type and constant value", () =>
    describe(convert([{
      type: "string",
      name: "hello2",
      required: false,
      const: "world",
    }]))
      .toEqual(`'"hello2":"world"'`))
))(test.test)(test.describe);
