import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import mainSlicerUrl from "../../src/util/slicerURL/mainSlicerUrl.ts";

const baseURL = "https://example.com/1/2/3/4/5";

Deno.test("SlierURL", () => {
  assertEquals(
    mainSlicerUrl(2)(baseURL),
    "/1/2/3/4/5",
  );
  assertEquals(
    mainSlicerUrl(3)(baseURL),
    "/1/2/3/4/5",
  );
  assertEquals(
    mainSlicerUrl(4)(baseURL),
    "/2/3/4/5",
  );
  assertEquals(
    mainSlicerUrl(5)(baseURL),
    "/3/4/5",
  );
  assertEquals(
    mainSlicerUrl(6)(baseURL),
    "/4/5",
  );
});
