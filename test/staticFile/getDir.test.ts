import { assertEquals } from "@std/assert";
import { test } from "@cross/test";

import staticFileTools from "../../src/staticFiles/staticFileTools.ts";

test(
  "static",
  () =>
    assertEquals(
      staticFileTools.getDir("./misc/").every((x) =>
        x[0] === "." && x[1] === "/"
      ),
      true,
    ),
);
