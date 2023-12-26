import convert from "../../../src/stringify/composer/finder.mjs"; 
import test from "../../../../util/test.mjs";

((test) => (describe) => (
  test("hello - Test finder with nested object property", () =>
    describe(convert({
      type: "object",
      properties: {
        hello: {
          type: "object",
          properties: {
            hello: { type: "string" },
          },
        },
      },
      required: ["hello"],
    }))
    .toEqual(`"{" +'"hello":{' + '"hello":' + (typeof o.hello.hello === "string"?str(o.hello.hello):'null') + "}" + "}"`))
))(test.test)(test.describe)