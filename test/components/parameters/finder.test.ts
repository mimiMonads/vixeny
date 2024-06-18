import finder from "../../../src/components/parameters/finder.ts";
import map from "../../../src/components/parameters/map.ts";
import type { Petition } from "../../../src/morphism.ts";
import { test } from "@cross/test";
import { assertEquals } from "@std/assert";

test(
  "only one parameter at the end and query",
  (_) => {
    assertEquals(
      (new Function(
        ` return ${
          finder(
            map()({ f: (_) => "hello", path: "/test/:id/:hi" } as Petition),
          )
        }`,
      ))()("456/hi"),
      {
        hi: "hi",
        id: "456",
      },
    ),
    assertEquals(
        (new Function(
          ` return ${
            finder(
              map()({ f: (_) => "hello", path: "/:test/:id/:hi" } as Petition),
            )
          }`,
        ))()("test/456/hi"),
        {
          hi: "hi",
          id: "456",
          test: "test",
        },
      );
      assertEquals(
      (new Function(
        ` return ${
          finder(
            map()({ f: (_) => "hello", path: "/:test/:id/hi" } as Petition),
          )
        }`,
      ))()("test/456"),
      {
        id: "456",
        test: "test",
      },
    );
  },
);
