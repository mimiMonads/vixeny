import { assertEquals } from "https://deno.land/std@0.160.0/testing/asserts.ts";
import finder from "../../composer/finder.ts";

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
          day: { type: "string" },
        },
        required: ["hello"],
      }),
      null,
    ),
);
