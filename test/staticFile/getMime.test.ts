import { assertEquals } from "@std/assert";
import { test } from "@cross/test";

import staticFileTools from "../../src/staticFiles/staticFileTools.ts";

test(
  "statci file gets mine",
  () => {
    assertEquals(
      staticFileTools.getMime([[".hello", "hello"]])(".hello"),
      "hello",
    );
    assertEquals(
      staticFileTools.getMime([[".txt", "hello"]])(".hello"),
      "text/html",
    );
  },
);
