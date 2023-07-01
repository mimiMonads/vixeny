import { assertEquals } from "https://deno.land/std@0.160.0/testing/asserts.ts";

import checker from "../../../optimizer/staticFiles/getMime.ts";



Deno.test(
    "test",
    () => 
        assertEquals(
            checker([[".txt", "hello"]])(".hello"),
            "text/html"
        )
)

Deno.test(
    "test",
    () => 
        assertEquals(
            checker([[".hello", "hello"]])(".hello"),
            "hello"
        )
)