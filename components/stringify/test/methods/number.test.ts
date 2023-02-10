import { assertEquals } from "https://deno.land/std@0.160.0/testing/asserts.ts";
import number from "../../methods/number.ts";

Deno.test(
<<<<<<< HEAD
    "hello",
    _ => 
        assertEquals(
            number({ type: "number", name: "hello", required: true , const:1}),
            `'"hello":' + 1`
        )
)
=======
  "hello",
  (_) =>
    assertEquals(
      number({ type: "number", name: "hello", required: true, const: 1 }),
      `'"hello":' + hello`,
    ),
);
>>>>>>> 599ea90cc9137605e2710d4b8f0b78b68a7da256

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
