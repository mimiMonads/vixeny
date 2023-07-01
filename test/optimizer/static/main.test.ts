import { assertEquals } from "https://deno.land/std@0.160.0/testing/asserts.ts";
import main from "../../../optimizer/staticFiles/main.ts";

Deno.test(
    "test",
    () => 
        assertEquals(
            main({type: "static", path: "./test/", name: "/hello", mime:false}).some(x => x.path === "/hello/fun.test.ts"),
            true
        )
)

Deno.test(
    "test",
    () => 
        assertEquals(
            main({type: "static", path: "./test/", name: "/", mime:false}).some(x => x.path === "/fun.test.ts"),
            true
        )
)

Deno.test(
    "test",
    () => 
        assertEquals(
            main({type: "static", path: "./test/", name: "/hello/nested", mime:false}).some(x => x.path === "/hello/nested/fun.test.ts"),
            true
        )
)