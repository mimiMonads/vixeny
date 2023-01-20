import { assertEquals } from "https://deno.land/std@0.160.0/testing/asserts.ts";
import checker from "../../optimizer/checker.ts";

Deno.test(
  "Params",
  (_) =>
    assertEquals(
      checker([])(["param"])([])("r=> r. param "),
      ["param"],
    ),
);
