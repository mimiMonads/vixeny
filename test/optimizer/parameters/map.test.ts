import options from "../../../optimizer/parameters/map.ts"
import { assertEquals } from "https://deno.land/std@0.160.0/testing/asserts.ts";


Deno.test(
    "only one parameter at the end",
    _ => assertEquals(
        options({})({path:"/test/:id", f: _ => "hello"}),
        {
            elements: [
            ":id",
        ],
            endsInSlash: false,
            firstParam: 5,
            lastParam: 0,
            hasName: undefined,
            list: [
            "test",
            ":id",
        ],
            map: [
            false,
            true,
            ],
            startsWith: ":",
        }
    )
)

Deno.test(
    "only one parameter at the end",
    _ => assertEquals(
        options({})({path:"/test/:id/", f: _ => "hello"}),
        {
            elements: [
            ":id",
        ],
            endsInSlash: true,
            firstParam: 5,
            lastParam: 1,
            hasName: undefined,
            list: [
            "test",
            ":id",
        ],
            map: [
            false,
            true,
            ],
            startsWith: ":",
        }
    )
)

Deno.test(
    "only one parameter at the end",
    _ => assertEquals(
        options({})({path:"/test/:id/hi", f: _ => "hello"}),
        {
            elements: [
            ":id",
        ],
            endsInSlash: false,
            firstParam: 5,
            lastParam: 3,
            hasName: undefined,
            list: [
            "test",
            ":id",
            "hi"
        ],
            map: [
            false,
            true,
            false
            ],
            startsWith: ":",
        }
    )
)

Deno.test(
    "only one parameter at the end",
    _ => assertEquals(
        options({})({path:"/test/:id/hi/", f: _ => "hello"}),
        {
            elements: [
            ":id",
        ],
            endsInSlash: true,
            firstParam: 5,
            lastParam: 4,
            hasName: undefined,
            list: [
            "test",
            ":id",
            "hi"
        ],
            map: [
            false,
            true,
            false
            ],
            startsWith: ":",
        }
    )
)

Deno.test(
    "only one parameter at the end",
    _ => assertEquals(
        options({})({path:"/test/:id/:test", f: _ => "hello"}),
        {
            elements: [
            ":id",
            ":test",
        ],
            endsInSlash: false,
            firstParam: 5,
            lastParam: 0,
            hasName: undefined,
            list: [
            "test",
            ":id",
            ":test",
        ],
            map: [
            false,
            true,
            true,
            ],
            startsWith: ":",
        }
    )
)

Deno.test(
    "only one parameter at the end",
    _ => assertEquals(
        options({})({path:"/:test/:id/:hi", f: _ => "hello"}),
        {
            elements: [
            ":test",
            ":id",
            ":hi",
        ],
            endsInSlash: false,
            firstParam: 0,
            lastParam: 0,
            hasName: undefined,
            list: [
            ":test",
            ":id",
            ":hi",
        ],
            map: [
            true,
            true,
            true,
            ],
            startsWith: ":",
        }
    )
)