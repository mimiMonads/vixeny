import { assertEquals } from "https://deno.land/std@0.160.0/testing/asserts.ts";
import solver from "../../builder/solver1.ts";
import atlas from "../../builder/atlas/main1.ts";
import paths from "../util/paths.ts";
import split from "../../builder/atlas/splitter.ts";
import optimize from "../../optimizer/optimize.ts";

Deno.test(
  "resolver",
  (_) =>
    (
      (a) =>
        assertEquals(
          [
            a(new Request("http://localhost:8080/notFound/")),
            a(new Request("http://localhost:8080/test")),
            a(new Request("http://localhost:8080/")),
            a(new Request("http://localhost:8080/test/2")),
          ],
          [
            8,
            1,
            0,
            2,
          ],
        )
    )(
      solver({ hasName: "http://localhost:8080/" })(
        atlas({ hasName: "http://localhost:8080/" })(
          split({ hasName: "http://localhost:8080/" })(
            optimize({ hasName: "http://localhost:8080/" })([...paths, { path: "/hello/*", f: () => "hello" }]),
          ),
        ),
      ),
    ),
);

Deno.test(
  "resolver",
  (_) =>
    (
      (a) =>
        assertEquals(
          [
            a(new Request("http://localhost:8080/notFound/")),
            a(new Request("http://localhost:8080/test")),
            a(new Request("http://localhost:8080/")),
            a(new Request("http://localhost:8080/test/2")),
          ],
          [
            7,
            1,
            0,
            2,
          ],
        )
    )(
      solver()(atlas()(split()(optimize()(paths)))),
    ),
);
