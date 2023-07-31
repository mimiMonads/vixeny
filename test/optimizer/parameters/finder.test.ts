import finder from "../../../components/parameters/finder.ts";
import { assertEquals } from "https://deno.land/std@0.160.0/testing/asserts.ts";
import options from "../../../components/parameters/map.ts";

Deno.test(
  "only one parameter at the end and query",
  (_) =>
    assertEquals(
      (new Function(` return ${finder(options()({ f: (_) => "hello", path: "/test/:id/:hi" }))
        }`))()("456/hi"),
      {
        hi: "hi",
        id: "456",
      },
    ),
);

Deno.test(
  "only one parameter at the end and query",
  (_) =>
    assertEquals(
      (new Function(` return ${finder(options()({ f: (_) => "hello", path: "/:test/:id/:hi" }))
        }`))()("test/456/hi"),
      {
        hi: "hi",
        id: "456",
        test: "test",
      },
    ),
);

Deno.test(
  "only one parameter at the end and query",
  (_) =>
    assertEquals(
      (new Function(` return ${finder(options()({ f: (_) => "hello", path: "/:test/:id/hi" }))
        }`))()("test/456"),
      {
        id: "456",
        test: "test",
      },
    ),
);
