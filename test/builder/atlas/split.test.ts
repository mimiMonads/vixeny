import { assertEquals } from "https://deno.land/std@0.160.0/testing/asserts.ts";
import arraySwap from "../../../builder/arraySwap.ts";
import paths from "../../util/paths.ts";
import optimize from "../../../optimizer/optimize.ts";
import { funRouterOptions } from "../../../types.ts";
import split from "../../../builder/atlas/split.ts"

Deno.test(
  "arraySwap",
  (_) =>
    assertEquals(
        split({hasName: "http://localhost:8080/"})(optimize({hasName: "http://localhost:8080/"})(paths))[0].map((x) => [x[0], x[1], x[2]]),
      [
        [1, "/", "GET"],
        [1, "/test", "GET"],
        [2, "/test/", "GET"],
        [4, "/test/:id/:name/", "GET"],
        [1, "/", "POST"],
        [1, "/", "HEAD"],
        [1, "/", "DELETE"],
      ],
    ),
);

Deno.test(
  "arraySwap",
  (_) =>
    assertEquals(
        split()(optimize()(paths))[0].map((x) => [x[0], x[1], x[2]]),
      [
        [1, "/", "GET"],
        [1, "/test", "GET"],
        [2, "/test/", "GET"],
        [4, "/test/:id/:name/", "GET"],
        [1, "/", "POST"],
        [1, "/", "HEAD"],
        [1, "/", "DELETE"],
      ],
    ),
);