import { assertEquals } from "@std/assert";
import { test } from "@cross/test";
import { isMain } from "./fixpoint.ts";

//@ts-ignore
const VALUE = Uint8Array.from("Hello");

if (isMain) {
  test("uwu", async () => {
    assertEquals(
      null,
      null,
    );
  });
}
