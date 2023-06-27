
import { assertEquals } from "https://deno.land/std@0.160.0/testing/asserts.ts";
import staticFiles from "../../optimizer/staticFiles.ts"



Deno.test(
  "statiFiles",
  () =>
    (
      async f =>
        assertEquals(
          (await (f(new Request("https://localhost:8080/static/fun.test.ts")) as Response)).status,
          200
        )
    )(
      staticFiles()(
        { type: "static", path: "./test/", name: "/static/" },
      )
    )
)



