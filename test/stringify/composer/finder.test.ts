import { assertEquals } from "https://deno.land/std@0.160.0/testing/asserts.ts";
import finder from "../../../components/stringify/composer/finder.ts";

Deno.test(
  "hello",
  (_) =>
    assertEquals(
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
