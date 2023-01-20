import { assertEquals } from "https://deno.land/std@0.160.0/testing/asserts.ts";
import resolver from "../../builder/resolver.ts";
import atlas from "../../builder/atlas.ts";
import paths from "../util/paths.ts";
import arraySwap from "../../builder/arraySwap.ts";
import optimize from "../../optimizer/optimize.ts";

Deno.test(
  "Resolver",
  (_) =>
    (
      (a) =>
        assertEquals(
          resolver()(a[3].length)(a[1])(a[2])(a[4])(0)("notFound/"),
          1,
        )
    )(
      atlas()(arraySwap()(optimize()(paths))),
    ),
);
Deno.test(
  "Resolver",
  (_) =>
    (
      (a) =>
        assertEquals(
          resolver()(a[3].length)(a[1])(a[2])(a[4])(-1)("notFound/"),
          8,
        )
    )(
      atlas()(arraySwap()(optimize()(paths))),
    ),
);

Deno.test(
  "Resolver",
  (_) =>
    (
      (a) =>
        assertEquals(
          resolver()(a[3].length)(a[1])(a[2])(a[4])(0)(
            "http://localhost:8080/test",
          ),
          0,
        )
    )(
      atlas()(arraySwap()(optimize()(paths))),
    ),
);


Deno.test(
  "Resolver",
  (_) =>
    (
      (a) =>
        assertEquals(
          resolver()(a[3].length)(a[1])(a[2])(a[4])(0)(
            "http://localhost:8080/",
          ),
          1,
        )
    )(
      atlas()(arraySwap()(optimize()(paths))),
    ),
);
Deno.test(
  "Resolver",
  (_) =>
    (
      (a) =>
        assertEquals(
          resolver()(a[3].length)(a[1])(a[2])(a[4])(0)(
            "http://localhost:8080/test/",
          ),
          2,
        )
    )(
      atlas()(arraySwap()(optimize()(paths))),
    ),
);

Deno.test(
  "Resolver",
  (_) =>
    (
      (a) =>
        assertEquals(
          resolver()(a[3].length)(a[1])(a[2])(a[4])(0)(
            "http://localhost:8080/test/id/num/",
          ),
          3,
        )
    )(
      atlas()(arraySwap()(optimize()(paths))),
    ),
);
Deno.test(
  "Resolver",
  (_) =>
    (
      (a) =>
        assertEquals(
          resolver()(a[3].length)(a[1])(a[2])(a[4])(3)(
            "http://localhost:8080/",
          ),
          6,
        )
    )(
      atlas()(arraySwap()(optimize()(paths))),
    ),
);
