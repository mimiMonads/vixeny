import { assertEquals } from "https://deno.land/std@0.160.0/testing/asserts.ts";
import parser from "../../composer/parser.ts"
import selector from "../../composer/selector.ts"

Deno.test(
    "parser",
    _ =>   
        assertEquals(
            parser(selector([{type: "string", name:"hello",required:true}]))({hello:"hi"}),
            JSON.stringify({hello:"hi"})
        )
)
Deno.test(
    "parser",
    _ =>   
        assertEquals(
            parser(selector([{type: "string", name:"hello2",required:false}]))({hello2:"hi"}),
            JSON.stringify({hello2:"hi"})
        )
)
Deno.test(
    "parser",
    _ =>   
        assertEquals(
            JSON.parse(parser(selector([{type: "string", name:"hello",required:true},{type: "string", name:"hello2",required:true}]))({hello:'hi"',hello2:"hi2"})),
            { hello: 'hi"',  hello2: "hi2" }
        )
)
Deno.test(
    "parser",
    _ =>   
        assertEquals(
            parser(selector([{type: "string", name:"hello2",required:false}]))({}),
            JSON.stringify({"hello2":null})
        )
)