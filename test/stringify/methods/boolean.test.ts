import { assertEquals } from "https://deno.land/std@0.160.0/testing/asserts.ts";
import boolean from "../../../components/stringify/methods/boolean.ts";

Deno.test(
  "hello",
  (_) =>
    assertEquals(
      boolean({
        type: "boolean",
        name: "hello",
        required: true,
        const: true,
        path: ".hello",
      }),
      `'"hello":' + true`,
    ),
);

Deno.test(
  "hello",
  (_) =>
    assertEquals(
      boolean({
        type: "boolean",
        name: "hello",
        required: true,
        path: ".hello",
      }),
      `'"hello":'+( typeof o.hello === "boolean"?o.hello:'null')`,
    ),
);

Deno.test(
  "hello",
  (_) =>
    assertEquals(
      boolean({
        type: "boolean",
        name: "hello",
        required: true,
        default: true,
        path: ".hello",
      }),
      `'"hello":'+( typeof o.hello === "boolean"?o.hello:'true')`,
    ),
);

Deno.test(
  "hello",
  (_) =>
    assertEquals(
      boolean({
        type: "boolean",
        name: "hello",
        required: true,
        default: true,
        path: ".hello",
      }),
      boolean({
        type: "boolean",
        name: "hello",
        required: false,
        default: true,
        path: ".hello",
      }),
    ),
);

Deno.test(
  "hello",
  (_) =>
    assertEquals(
      boolean({
        type: "boolean",
        name: "hello",
        required: true,
        default: true,
        path: ".hello",
      }),
      boolean({
        type: "boolean",
        name: "hello",
        required: false,
        default: true,
        path: ".hello",
      }),
    ),
);
