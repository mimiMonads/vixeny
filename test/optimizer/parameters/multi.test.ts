import multi from "../../../optimizer/parameters/multi.ts"
import options from "../../../optimizer/parameters/map.ts"
import { assertEquals } from "https://deno.land/std@0.160.0/testing/asserts.ts";


console.log(multi(options({hasName:"http://localhost:8080/"})({path:"/:test/:id/:hello",f: _ => "hello"})))

Deno.test(
    "param",
    _ => assertEquals(
        new Function (` return ${multi(options({hasName:"http://localhost:8080/"})({path:"/test/:id/:hello",f: _ => "hello"}))}`)()("http://localhost:8080/test/hello/world"),
           {
                 hello: "world",
                id: "hello",
           }
    )
)
Deno.test(
    "param",
    _ => assertEquals(
        new Function (` return ${multi(options({hasName:"http://localhost:8080/"})({path:"/:test/:id/:hello",f: _ => "hello"}))}`)()("http://localhost:8080/test/hello/world"),
           {
                 hello: "world",
                 id: "hello",
                 test: "test",
           }
    )
)
Deno.test(
    "param",
    _ => assertEquals(
        new Function (` return ${multi(options({hasName:"http://localhost:8080/"})({path:"/:test/:id/hello",f: _ => "hello"}))}`)()("http://localhost:8080/test/hello/world"),
        {
            id: "hello",
            test: "test",
        }
    )
)