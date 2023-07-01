import { assertEquals } from "https://deno.land/std@0.160.0/testing/asserts.ts";

import checker from "../../../optimizer/staticFiles/getDir.ts";


Deno.test(
    "static",
    () => 
        assertEquals(
            checker("./test/").every( x => x[0] === "." && x[1] === "/"),
            true
        )
)