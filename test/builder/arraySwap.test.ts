import { assertEquals } from "https://deno.land/std@0.160.0/testing/asserts.ts";
import arraySwap from "../../builder/arraySwap.ts";
import paths from "../util/paths.ts";
import optimize from "../../optimizer/optimize.ts";
import { funRouterOptions } from "../../types.ts";

Deno.test(
  "arraySwap",
  (_) =>
    assertEquals(
      arraySwap()(optimize()(paths))[0].map((x) => [x[0], x[1], x[2]]),
      [
        [1, "", "GET"],
        [1, "test", "GET"],
        [2, "test/", "GET"],
        [4, "test/", "GET"],
        [1, "", "POST"],
        [1, "", "HEAD"],
        [1, "", "DELETE"],
      ],
    ),
);

Deno.test(
  "arraySwap",
  (_) =>
    assertEquals(
      arraySwap({
        paramsStartsWith: "!",
      })(optimize()(paths))[0].map((x) => [x[0], x[1], x[2]]),
      [
        [1, "", "GET"],
        [1, "test", "GET"],
        [2, "test/", "GET"],
        [4, "test/:id/:name/", "GET"],
        [1, "", "POST"],
        [1, "", "HEAD"],
        [1, "", "DELETE"],
      ],
    ),
);
Deno.test(
  "arraySwap",
  ((o: funRouterOptions) => (_) =>
    assertEquals(
      arraySwap(o)(optimize(o)(paths))[0].map((x) => [x[0], x[1], x[2]]),
      [
        [0, "", "GET"],
        [1, "test", "GET"],
        [2, "test/", "GET"],
        [4, "test/", "GET"],
        [0, "", "POST"],
        [0, "", "HEAD"],
        [0, "", "DELETE"],
      ],
    ))(
      {
        globalNotFound: true,
      },
    ),
);
Deno.test(
  "arraySwap",
  (_) =>
    assertEquals(
      arraySwap({
        paramsStartsWith: "!",
        globalNotFound: true,
      })(optimize()(paths))[0].map((x) => [x[0], x[1], x[2]]),
      [
        [0, "", "GET"],
        [1, "test", "GET"],
        [2, "test/", "GET"],
        [4, "test/:id/:name/", "GET"],
        [0, "", "POST"],
        [0, "", "HEAD"],
        [0, "", "DELETE"],
      ],
    ),
);
