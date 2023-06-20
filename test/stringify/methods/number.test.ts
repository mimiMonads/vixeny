import { assertEquals } from "https://deno.land/std@0.160.0/testing/asserts.ts";
import number from "../../../components/stringify/methods/json_number.ts";

Deno.test(
  "hello",
  (_) =>
    assertEquals(
      number({
        type: "number",
        name: "hello",
        required: true,
        const: 1,
        path: ".hello",
      }),
      `'"hello":' + 1`,
    ),
);

Deno.test(
  "hello",
  (_) =>
    assertEquals(
      number({ type: "number", name: "hello", required: true, path: ".hello" }),
      `'"hello":'+( typeof o.hello === "number"?o.hello:'null')`,
    ),
);

Deno.test(
  "hello",
  (_) =>
    assertEquals(
      number({
        type: "number",
        name: "hello",
        required: false,
        default: 5,
        path: ".hello",
      }),
      `'"hello":'+( typeof o.hello === "number"?o.hello:'5')`,
    ),
);

Deno.test(
  "hello",
  (_) =>
    assertEquals(
      number({
        type: "number",
        name: "hello",
        required: true,
        default: 5,
        path: ".hello",
      }),
      number({
        type: "number",
        name: "hello",
        required: false,
        default: 5,
        path: ".hello",
      }),
    ),
);
