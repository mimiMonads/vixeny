import map from "../../../builder/composer/map.ts"
import parameter from "../../../builder/composer/parameters.ts"
import { assertEquals } from "https://deno.land/std@0.160.0/testing/asserts.ts";

Deno.test(
    "composer",
    _ => 
        assertEquals(
            parameter(0)(map()(("/test/:id/hello/"))),
            ' s.slice(1, a0 - 1) === "test" && s.slice(a1).indexOf("hello") === 0  ? 0 : '
        )
     
)

Deno.test(
    "composer",
    _ => 
        assertEquals(
            parameter(0)(map()(("/test/:id/hello"))),
            ' s.slice(1, a0 - 1) === "test" && s.slice(a1).indexOf("hello") === 0  ? 0 : '
        )
     
)

Deno.test(
    "composer",
    _ => 
        assertEquals(
            parameter(0)(map()(("/test/:id/:hello/"))),
            ' s.indexOf("test/") === 1 ? 0 : '
        )
     
)