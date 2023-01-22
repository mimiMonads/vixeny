import { assertEquals } from "https://deno.land/std@0.160.0/testing/asserts.ts";
import stringParser from "../../builder/stringParser.ts";
import arraySwap from "../../builder/arraySwap.ts";
import atlas from "../../builder/atlas.ts";
import optimize from "../../optimizer/optimize.ts";
import paths from "../util/paths.ts";
import { funRouterOptions } from "../../types.ts";

Deno.test(
  "StringParser",
  (_) =>
    (
      (r) =>
        assertEquals(
          stringParser()(r[1])("http://localhost:8080/"),
          [1, ""],
        )
    )(
      atlas()(arraySwap()(optimize()(paths))),
    ),
);
Deno.test(
  "StringParser",
  (_) =>
    (
      (o: funRouterOptions) =>
        (
          (r) =>
            assertEquals(
              stringParser(o)(r[1])("http://localhost:8080/"),
              [1, ""],
            )
        )(
          atlas(o)(arraySwap(o)(optimize(o)(paths))),
        )
    )(
      {}
    ),
);
Deno.test(
  "StringParser",
  (_) =>
    (
      (o: funRouterOptions) =>
        (
          (r) =>
            assertEquals(
              stringParser(o)(r[1])("http://localhost:8080/"),
              [1, ""],
            )
        )(
          atlas(o)(arraySwap(o)(optimize(o)(paths))),
        )
    )(
      {  hasName: "http://localhost:8080/" },
    ),
);
Deno.test(
  "StringParser",
  (_) =>
    (
      (o: funRouterOptions) =>
        (
          (r) =>
            assertEquals(
              stringParser()(r[1])("http://localhost:8080/hello"),
              [1, "hello"],
            )
        )(
          atlas(o)(arraySwap(o)(optimize(o)(paths))),
        )
    )(
      {},
    ),
);
Deno.test(
  "StringParser",
  (_) =>
    (
      (o: funRouterOptions) =>
        (
          (r) =>
            assertEquals(
              stringParser()(r[1])("http://localhost:8080/hello"),
              [1, "hello"],
            )
        )(
          atlas(o)(arraySwap(o)(optimize(o)(paths))),
        )
    )(
      { hasName: "http://localhost:8080/hello" },
    ),
);
Deno.test(
  "StringParser",
  (_) =>
    (
      (o: funRouterOptions) =>
        (
          (r) =>
            assertEquals(
              stringParser()(r[1])("http://localhost:8080/hello"),
              [1, "hello"],
            )
        )(
          atlas(o)(arraySwap(o)(optimize(o)(paths))),
        )
    )(
      {},
    ),
);
Deno.test(
  "StringParser",
  (_) =>
    (
      (o: funRouterOptions) =>
        (
          (r) =>
            assertEquals(
              stringParser(o)(r[1])("http://localhost:8080/test/id/num/"),
              [4, "test/id/num/"],
            )
        )(
          atlas(o)(arraySwap(o)(optimize(o)(paths))),
        )
    )(
      {},
    ),
);
Deno.test(
  "StringParser",
  (_) =>
    (
      (o: funRouterOptions) =>
        (
          (r) =>
            assertEquals(
              stringParser(o)(r[1])("http://localhost:8080/test/id/num/"),
              [4, "test/id/num/"],
            )
        )(
          atlas(o)(arraySwap(o)(optimize(o)(paths))),
        )
    )(
      {},
    ),
);

Deno.test(
  "StringParser",
  (_) =>
    (
      (o: funRouterOptions) =>
        (
          (r) =>
            assertEquals(
              stringParser(o)(r[1])("http://localhost:8080/test/id/num/"),
              [4, "test/id/num/"],
            )
        )(
          atlas(o)(arraySwap(o)(optimize(o)(paths))),
        )
    )(
      {  hasName: "http://localhost:8080/" },
    ),
);
