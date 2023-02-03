import specialString from "../../../builder/composer/specialString.ts"
import { assertEquals } from "https://deno.land/std@0.160.0/testing/asserts.ts";



Deno.test(
    "hello", 
    _ => assertEquals(
        specialString({hasName: "http://localhost:8080/"})(12)([
            ["GET","/",_ => new Response(),false]
        ])("http://localhost:8080/"),
        10
    )
)