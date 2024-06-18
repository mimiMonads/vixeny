import map from "../../../src/components/parameters/map.ts";
import { assertEquals } from "@std/assert";
import { test } from "@cross/test";
import type { Petition } from "../../../src/morphism.ts";

test(
  "only one parameter at the end",
  (_) => {
    assertEquals(
      map({})({ path: "/test/:id", f: (_) => "hello" } as Petition),
      {
        elements: [
          ":id",
        ],
        endsInSlash: false,
        firstParam: 5,
        lastParam: 0,
        bind: undefined,
        list: [
          "test",
          ":id",
        ],
        map: [
          false,
          true,
        ],
        startsWith: ":",
      },
    );
    assertEquals(
      map({})({ path: "/test/:id/", f: (_) => "hello" } as Petition),
      {
        elements: [
          ":id",
        ],
        endsInSlash: true,
        firstParam: 5,
        lastParam: 1,
        bind: undefined,
        list: [
          "test",
          ":id",
        ],
        map: [
          false,
          true,
        ],
        startsWith: ":",
      },
    ),
      assertEquals(
        map({})({ path: "/test/:id/hi", f: (_) => "hello" } as Petition),
        {
          elements: [
            ":id",
          ],
          endsInSlash: false,
          firstParam: 5,
          lastParam: 3,
          bind: undefined,
          list: [
            "test",
            ":id",
            "hi",
          ],
          map: [
            false,
            true,
            false,
          ],
          startsWith: ":",
        },
      ),
      assertEquals(
        map({})({ path: "/test/:id/hi/", f: (_) => "hello" } as Petition),
        {
          elements: [
            ":id",
          ],
          endsInSlash: true,
          firstParam: 5,
          lastParam: 4,
          bind: undefined,
          list: [
            "test",
            ":id",
            "hi",
          ],
          map: [
            false,
            true,
            false,
          ],
          startsWith: ":",
        },
      ),
      assertEquals(
        map({})({ path: "/test/:id/:test", f: (_) => "hello" } as Petition),
        {
          elements: [
            ":id",
            ":test",
          ],
          endsInSlash: false,
          firstParam: 5,
          lastParam: 0,
          bind: undefined,
          list: [
            "test",
            ":id",
            ":test",
          ],
          map: [
            false,
            true,
            true,
          ],
          startsWith: ":",
        },
      ),
      assertEquals(
        map({})({ path: "/:test/:id/:hi", f: (_) => "hello" } as Petition),
        {
          elements: [
            ":test",
            ":id",
            ":hi",
          ],
          endsInSlash: false,
          firstParam: 0,
          lastParam: 0,
          bind: undefined,
          list: [
            ":test",
            ":id",
            ":hi",
          ],
          map: [
            true,
            true,
            true,
          ],
          startsWith: ":",
        },
      );
  },
);
