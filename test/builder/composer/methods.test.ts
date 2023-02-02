import { assertEquals } from "https://deno.land/std@0.160.0/testing/asserts.ts";
import methods from "../../../builder/composer/methods.ts"
import split from "../../../builder/atlas/split.ts"
import paths from "../../util/paths.ts";
import optimize from "../../../optimizer/optimize.ts";
import atlas from "../../../builder/atlas.ts";



Deno.test(
    "composer",
    _ => 
        ( f=> 
            assertEquals(
                [
                    f[0]("http://localhost:8080/"),
                    f[0]("http://localhost:8080/test"),
                    f[0]("http://localhost:8080/test/")
                ],
                [0,1,2]
            )
            )(
            methods({hasName: "http://localhost:8080/"})(
                [

                    [
                      "GET",
                    ],
                    [
                      [
                        1,
                        2,
                        4,
                      ],
                    ],
                    [
                      [
                        [ "/","/test"],
                        ["/test/"],
                        ["test/:id/:hi/"],
                      ],
                    ],
                    [],
                    []
                ],
                 
            )
        )
)

Deno.test(
    "composer",
    _ => 
        ( f=> 
            assertEquals(
                [
                    f[0]("http://localhost:8080/"),
                    f[0]("http://localhost:8080/test"),
                    f[0]("http://localhost:8080/test/")
                ],
                [0,1,2]
            )
            )(
            methods({hasName: "http://localhost:8080/"})(
                [

                    [
                      "GET",
                    ],
                    [
                      [
                        1,
                        2,
                        4,
                      ],
                    ],
                    [
                      [
                        [ "/","/test"],
                        ["/test/"],
                        ["test/:id/:hi/"],
                      ],
                    ],
                    [],
                    []
                ],
                 
            )
        )
)