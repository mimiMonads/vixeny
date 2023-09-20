import assert from "node:assert";
import test from "node:test"
import finder from "../../../components/stringify/composer/finder.ts";

test(
  "hello",
  (_) =>
    assert.deepStrictEqual(
      finder({
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
      }),
      `"{" +'"hello":{' + '"hello":' + (typeof o.hello.hello === "string"?str(o.hello.hello):'null') + "}" + "}"`,
    ),
);
