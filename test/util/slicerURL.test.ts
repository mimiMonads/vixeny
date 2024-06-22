import { assertEquals } from "@std/assert";
import mainSlicerUrl from "../../src/util/slicerURL/mainSlicerUrl.ts";
import { test } from "@cross/test";
const baseURL = "https://example.com/1/2/3/4/5";

test("SlicerURL", () => {
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
