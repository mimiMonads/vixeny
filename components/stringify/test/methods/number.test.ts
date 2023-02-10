import { assertEquals } from "https://deno.land/std@0.160.0/testing/asserts.ts";
import number from "../../methods/number.ts";

Deno.test(
  "hello",
  (_) =>
    assertEquals(
      number({ type: "number", name: "hello", required: true, const: 1 }),
      `'"hello":' + hello`,
    ),
);

Deno.test(
  "hello",
  (_) =>
    assertEquals(
      number({ type: "number", name: "hello", required: true }),
      `'"hello":'+( typeof o.hello === "number"?o.hello:'null')`,
    ),
);

Deno.test(
  "hello",
  (_) =>
    assertEquals(
      number({ type: "number", name: "hello", required: false, default: 5 }),
      `'"hello":'+( typeof o.hello === "number"?o.hello:'5')`,
    ),
);

Deno.test(
  "hello",
  (_) =>
    assertEquals(
      number({ type: "number", name: "hello", required: true, default: 5 }),
      number({ type: "number", name: "hello", required: false, default: 5 }),
    ),
);
