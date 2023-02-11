import { assertEquals } from "https://deno.land/std@0.160.0/testing/asserts.ts";
import composer from "../../../components/stringify/main.ts";

Deno.test(
  "hello",
  (_) =>
    assertEquals(
      JSON.parse(
        composer({
          type: "object",
          properties: {
            hello: { type: "string" },
          },
          required: ["hello"],
        })({ hello: 'wo"rld' }),
      ),
      { hello: 'wo"rld' },
    ),
);

Deno.test(
  "hello",
  (_) =>
    assertEquals(
      JSON.parse(
        composer({
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
        })({ hello: { hello: "hi" } }),
      ),
      { hello: { hello: "hi" } },
    ),
);

Deno.test(
  "hello",
  (_) =>
    assertEquals(
      JSON.parse(
        composer({
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
        })({ hello: { hello: { hello: "string" } } }),
      ),
      { hello: { hello: { hello: "string" } } },
    ),
);

Deno.test(
  "hello",
  (_) =>
    assertEquals(
      JSON.parse(
        composer({
          type: "object",
          properties: {
            hello: { type: "number", default: 2 },
          },
          required: ["hello"],
        })({ hello: 1 }),
      ),
      { hello: 1 },
    ),
);

Deno.test(
  "hello",
  (_) =>
    assertEquals(
      JSON.parse(
        composer({
          type: "object",
          properties: {
            hello: { type: "number", default: 2 },
          },
          required: ["hello"],
        })({}),
      ),
      { hello: 2 },
    ),
);
