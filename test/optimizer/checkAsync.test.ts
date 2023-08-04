
import { assertEquals } from "https://deno.land/std@0.160.0/testing/asserts.ts";
import checkAsync from "../../optimizer/checkAsync.ts";

Deno.test(
  "check for async",
  () => assertEquals(
    checkAsync({
      path: "/",
      f: async f => await f.req.blob()
    }),
    true
  )
)
Deno.test(
  "check for sync",
  () => assertEquals(
    checkAsync({
      path: "/",
      f: () => "hello"
    }),
    false
  )
)
Deno.test(
  "check for nested async",
  () => assertEquals(
    checkAsync({
      path: "/",
      resolve: {
        name: "hi",
        f: async f => await f.req.blob()
      },
      f: () => "hi"
    }),
    true
  )
)
Deno.test(
  "check for nested async",
  () => assertEquals(
    checkAsync({
      path: "/",
      resolve: {
        name: "hi",
        f: () => "hi"
      },
      f: () => "hi"
    }),
    false
  )
)
Deno.test(
  "check for nested array async",
  () => assertEquals(
    checkAsync({
      path: "/",
      resolve: [
        {
          name: "hi",
          f: () => "ji"
        }, {
          name: "hi2",
          f: async f => await f.req.blob()
        }
      ],
      f: () => "hi"
    }),
    true
  )
)
Deno.test(
  "check for nested array async",
  () => assertEquals(
    checkAsync({
      path: "/",
      resolve: [
        {
          name: "hi",
          f: () => "ji"
        }, {
          name: "hi2",
          f: () => "hi"
        }
      ],
      f: () => "hi"
    }),
    false
  )
)
