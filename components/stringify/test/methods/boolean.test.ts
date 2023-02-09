import { assertEquals } from "https://deno.land/std@0.160.0/testing/asserts.ts";
import boolean from "../../methods/boolean.ts";



Deno.test(
    "hello",
    _ => 
        assertEquals(
            boolean({ type: "boolean", name: "hello", required: true, const: true }),
            `'"hello":' + hello`
        )
)

Deno.test(
    "hello",
    _ => 
        assertEquals(
            boolean({ type: "boolean", name: "hello", required: true}),
            `'"hello":'+( typeof o.hello === "boolean"?o.hello:'null')`
        )
)

Deno.test(
    "hello",
    _ => 
        assertEquals(
            boolean({ type: "boolean", name: "hello", required: true, default: true}),
            `'"hello":'+( typeof o.hello === "boolean"?o.hello:'true')`
        )
)

Deno.test(
    "hello",
    _ => 
        assertEquals(
            boolean({ type: "boolean", name: "hello", required: true, default: true}),
            boolean({ type: "boolean", name: "hello", required: false, default: true})
        )
)

Deno.test(
    "hello",
    _ => 
        assertEquals(
            boolean({ type: "boolean", name: "hello", required: true, default: true}),
            boolean({ type: "boolean", name: "hello", required: false, default: true})
        )
)