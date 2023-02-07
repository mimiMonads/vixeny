import { assertEquals } from "https://deno.land/std@0.160.0/testing/asserts.ts";
import parser from "../../composer/parser.ts";
import selector from "../../composer/selector.ts";

Deno.test(
  "parser",
  (_) =>
    assertEquals(
      parser(selector([{ type: "string", name: "hello", required: true }]))({
        hello: "hi",
      }),
      JSON.stringify({ hello: "hi" }),
    ),
);
Deno.test(
  "parser",
  (_) =>
    assertEquals(
      parser(selector([{ type: "string", name: "hello2", required: false }]))({
        hello2: "hi",
      }),
      JSON.stringify({ hello2: "hi" }),
    ),
);
Deno.test(
  "parser",
  (_) =>
    assertEquals(
      parser(
        selector([{ type: "string", name: "hello", required: true }, {
          type: "string",
          name: "hello2",
          required: true,
        }]),
      )({ hello: 'hi"', hello2: "hi2" }),
      JSON.stringify({ hello: 'hi"', hello2: "hi2" }),
    ),
);
Deno.test(
  "parser",
  (_) =>
    assertEquals(
      parser(selector([{ type: "string", name: "hello2", required: false }]))(
        {},
      ),
      JSON.stringify({ "hello2": null }),
    ),
);

Deno.test(
  "parser",
  (_) =>
    assertEquals(
      parser(selector([{ type: "boolean", name: "hello", required: true }]))({
        hello: true,
      }),
      JSON.stringify({ hello: true }),
    ),
);

Deno.test(
  "parser",
  (_) =>
    assertEquals(
      parser(selector([{ type: "boolean", name: "hello", required: true }]))({
        hello: false,
      }),
      JSON.stringify({ hello: false }),
    ),
);

Deno.test(
  "parser",
  (_) =>
    assertEquals(
      parser(selector([{ type: "number", name: "hello", required: true }]))({
        hello: 1,
      }),
      JSON.stringify({ hello: 1 }),
    ),
);
Deno.test(
  "parser",
  (_) =>
    assertEquals(
      parser(selector([{ type: "number", name: "hello", required: true }]))({}),
      JSON.stringify({ "hello": null }),
    ),
);
