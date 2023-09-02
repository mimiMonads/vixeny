import { assertEquals } from "https://deno.land/std@0.160.0/testing/asserts.ts";

import mime from "../../../optimizer/staticFiles/mime.ts";

Deno.test(
    "hello",
    () => 
        assertEquals(
            mime({type: "fileServer", path:"./", name:"/hello/"}).length,
            74
        )
)

Deno.test(
    "hello",
    () => 
        assertEquals(
            mime({type: "fileServer", path:"./", name:"/hello/", mime: false}).length,
            0
        )
)

Deno.test(
    "hello",
    () => 
        assertEquals(
            mime({type: "fileServer", path:"./", name:"/hello/", extra: [ [".ts", "hello/hello"]]}).at(74),
            [".ts", "hello/hello"]
        )
)