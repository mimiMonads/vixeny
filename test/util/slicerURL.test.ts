import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import mainSlicerUrl from "../../src/util/slicerURL/mainSlicerUrl.ts";

const baseURL = "https://example.com/1/2/3/4/5";

Deno.test("SlicerURL", () => {
  assertEquals(
    mainSlicerUrl(2)(baseURL),
    "https://example.com".length,
  );
  assertEquals(
    mainSlicerUrl(3)(baseURL),
    "https://example.com".length,
  );
  assertEquals(
    mainSlicerUrl(4)(baseURL),
    "https://example.com/1".length,
  );
  assertEquals(
    mainSlicerUrl(5)(baseURL),
    "https://example.com/1/2".length,
  );
  assertEquals(
    mainSlicerUrl(6)(baseURL),
    "https://example.com/1/2/3".length,
  );
});
