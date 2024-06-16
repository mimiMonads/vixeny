// Import assertEquals from Deno's standard library for assertion
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { body } from "../../../src/components/cookies/cookieBodyParser.ts";

Deno.test("Test single cookie extraction", () => {
  const testCookies = "sessionToken=abc123";
  const result = body(["sessionToken"])(testCookies);
  assertEquals(result, { sessionToken: "abc123" });
});

Deno.test("Test multiple cookie extraction", () => {
  const testCookies = "sessionToken=abc123,userId=456def";
  const result = body(["sessionToken", "userId"])(testCookies);
  assertEquals(result, { sessionToken: "abc123", userId: "456def" });
});

Deno.test("Test with empty input array", () => {
  const testCookies = "sessionToken=abc123";
  const result = body([])(testCookies);
  assertEquals(result, {}); // Expecting an empty object since no cookie names were provided
});

// Optionally, add more complex scenarios or edge cases
Deno.test("Test with non-existent cookies", () => {
  const testCookies = "sessionToken=abc123";
  const result = body(["nonExistent"])(testCookies);
  assertEquals(result, { nonExistent: null }); // Should return null for non-existent cookie keys
});
