import { assertEquals } from "https://deno.land/std@0.160.0/testing/asserts.ts";
import selector from "../../../components/stringify/composer/selector.ts";

Deno.test(
  "hello",
  (_) =>
    assertEquals(
      selector([{
        type: "string",
        name: "hello2",
        required: false,
        const: "world",
      }]),
      `'"hello2":"world"'`,
    ),
);
