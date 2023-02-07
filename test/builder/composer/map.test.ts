import map from "../../../builder/composer/map.ts";
import { assertEquals } from "https://deno.land/std@0.160.0/testing/asserts.ts";

Deno.test(
  "only one parameter at the end",
  (_) =>
    assertEquals(
      map({})("/test/:id"),
      {
        elements: [
          ":id",
        ],
        endsInSlash: false,
        firstParam: 5,
        lastParam: 0,
        path: "/test/:id",
        hasName: undefined,
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
);

Deno.test(
  "only one parameter at the end",
  (_) =>
    assertEquals(
      map({})("/test/:id/:acc/:x/"),
      {
        elements: [
          ":id",
          ":acc",
          ":x",
        ],
        endsInSlash: true,
        firstParam: 5,
        lastParam: 0,
        path: "/test/:id/:acc/:x/",
        hasName: undefined,
        list: [
          "test",
          ":id",
          ":acc",
          ":x",
        ],
        map: [
          false,
          true,
          true,
          true,
        ],
        startsWith: ":",
      },
    ),
);
