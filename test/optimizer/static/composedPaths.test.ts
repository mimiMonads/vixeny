import { assertEquals } from "https://deno.land/std@0.160.0/testing/asserts.ts";

import composer from "../../../optimizer/staticFiles/composedPaths.ts";

Deno.test(
    "hello",
    () =>
        assertEquals(
            "/fun.test.ts",
            composer("./test/")("./")(["./test/fun.test.ts",])([])[0].path
        )
)
Deno.test(
    "hello",
    () =>
        assertEquals(
            "/fun.test.ts",
            composer("./test/")("./")(["./test/fun.test.ts",])([[".ts","null"]])[0].path
        )
)