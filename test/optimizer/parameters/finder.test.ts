import finder from "../../../optimizer/parameters/finder.ts"
import { assertEquals } from "https://deno.land/std@0.160.0/testing/asserts.ts";
import options from "../../../optimizer/parameters/options.ts"


Deno.test(
    "only one parameter at the end and query",
    _ => assertEquals(
        (new Function(` return ${finder(options()({f:_ => "hello", path:"/test/:id/:hi"}))}`))()("456/hi"),
        ["456","hi"]
    )
)

Deno.test(
    "only one parameter at the end and query",
    _ => assertEquals(
        (new Function(` return ${finder(options()({f:_ => "hello", path:"/:test/:id/:hi"}))}`))()("test/456/hi"),
        ["test","456","hi"]
    )
)

Deno.test(
    "only one parameter at the end and query",
    _ => assertEquals(
        (new Function(` return ${finder(options()({f:_ => "hello", path:"/:test/:id/hi"}))}`))()("test/456"),
        ["test","456"]
    )
)

