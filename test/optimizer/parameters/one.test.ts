import one from "../../../optimizer/parameters/one.ts"
import options from "../../../optimizer/parameters/options.ts"
import { assertEquals } from "https://deno.land/std@0.160.0/testing/asserts.ts";

// "/test/:id"
Deno.test(
    "param",
    _ => assertEquals(
        new Function (` return ${one(options({hasName:"http://localhost:8080/"})({path:"/test/:id",f: _ => "hello"}))}`)()("http://localhost:8080/test/hello").id,
        "hello"
    )
)
Deno.test(
    "param",
    _ => assertEquals(
        new Function (` return ${one(options({hasName:"http://localhost:8080/"})({path:"/test/:id",f: _ => "hello"}))}`)()("http://localhost:8080/test/hello?a=1").id,
        "hello"
    )
)

Deno.test(
    "param",
    _ => (
        f => assertEquals(
            [f("http://localhost:8080/test/hello").id , f("http://localhost:8080/test/hello").id] ,
            ["hello","hello"]
        )
    )(
        new Function (` return ${one(options()({path:"/test/:id",f: _ => "hello"}))}`)()
    )
);
Deno.test(
    "param",
    _ => (
        f => assertEquals(
            [f("http://localhost:8080/test/hello?a=1").id , f("http://localhost:8080/test/hello?a=1").id] ,
            ["hello","hello"]
        )
    )(
        new Function (` return ${one(options()({path:"/test/:id",f: _ => "hello"}))}`)()
    )
);

// "/test/:id/"

Deno.test(
    "param",
    _ => assertEquals(
        new Function (` return ${one(options({hasName:"http://localhost:8080/"})({path:"/test/:id/",f: _ => "hello"}))}`)()("http://localhost:8080/test/hello/").id,
        "hello"
    )
)
Deno.test(
    "param",
    _ => assertEquals(
        new Function (` return ${one(options({hasName:"http://localhost:8080/"})({path:"/test/:id/",f: _ => "hello"}))}`)()("http://localhost:8080/test/hello/?a=1").id,
        "hello"
    )
)

Deno.test(
    "param",
    _ => (
        f => assertEquals(
            [f("http://localhost:8080/test/hello/").id , f("http://localhost:8080/test/hello/").id] ,
            ["hello","hello"]
        )
    )(
        new Function (` return ${one(options()({path:"/test/:id/",f: _ => "hello"}))}`)()
    )
);
Deno.test(
    "param",
    _ => (
        f => assertEquals(
            [f("http://localhost:8080/test/hello/?a=1").id , f("http://localhost:8080/test/hello/?a=1").id] ,
            ["hello","hello"]
        )
    )(
        new Function (` return ${one(options()({path:"/test/:id/",f: _ => "hello"}))}`)()
    )
);


// "/test/:id/hi"

Deno.test(
    "param",
    _ => assertEquals(
        new Function (` return ${one(options({hasName:"http://localhost:8080/"})({path:"/test/:id/hi",f: _ => "hello"}))}`)()("http://localhost:8080/test/hello/hi").id,
        "hello"
    )
)
Deno.test(
    "param",
    _ => assertEquals(
        new Function (` return ${one(options({hasName:"http://localhost:8080/"})({path:"/test/:id/hi",f: _ => "hello"}))}`)()("http://localhost:8080/test/hello/hi?a=1").id,
        "hello"
    )
)

Deno.test(
    "param",
    _ => (
        f => assertEquals(
            [f("http://localhost:8080/test/hello/hi").id , f("http://localhost:8080/test/hello/hi").id] ,
            ["hello","hello"]
        )
    )(
        new Function (` return ${one(options()({path:"/test/:id/hi",f: _ => "hello"}))}`)()
    )
);
Deno.test(
    "param",
    _ => (
        f => assertEquals(
            [f("http://localhost:8080/test/hello/hi?a=1").id , f("http://localhost:8080/test/hello/hi?a=1").id] ,
            ["hello","hello"]
        )
    )(
        new Function (` return ${one(options()({path:"/test/:id/hi",f: _ => "hello"}))}`)()
    )
);

// "/test/:id/hi/"

Deno.test(
    "param",
    _ => assertEquals(
        new Function (` return ${one(options({hasName:"http://localhost:8080/"})({path:"/test/:id/hi/",f: _ => "hello"}))}`)()("http://localhost:8080/test/hello/hi/").id,
        "hello"
    )
)
Deno.test(
    "param",
    _ => assertEquals(
        new Function (` return ${one(options({hasName:"http://localhost:8080/"})({path:"/test/:id/hi/",f: _ => "hello"}))}`)()("http://localhost:8080/test/hello/hi/?a=1").id,
        "hello"
    )
)

Deno.test(
    "param",
    _ => (
        f => assertEquals(
            [f("http://localhost:8080/test/hello/hi/").id , f("http://localhost:8080/test/hello/hi/").id] ,
            ["hello","hello"]
        )
    )(
        new Function (` return ${one(options()({path:"/test/:id/hi/",f: _ => "hello"}))}`)()
    )
);
Deno.test(
    "param",
    _ => (
        f => assertEquals(
            [f("http://localhost:8080/test/hello/hi/?a=1").id , f("http://localhost:8080/test/hello/hi/?a=1").id] ,
            ["hello","hello"]
        )
    )(
        new Function (` return ${one(options()({path:"/test/:id/hi/",f: _ => "hello"}))}`)()
    )
);