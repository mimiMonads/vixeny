
import assert from "node:assert";
import test from "node:test"
import checkAsync from "../../optimizer/recursiveCheckAsync.ts";

test(
  "check for async",
  () => assert.deepStrictEqual(
    checkAsync({
      path: "/",
      f: async f => await f.req.blob()
    }),
    true
  )
)
test(
  "check for sync",
  () => assert.deepStrictEqual(
    checkAsync({
      path: "/",
      f: () => "hello"
    }),
    false
  )
)
test(
  "check for nested async",
  () => assert.deepStrictEqual(
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
test(
  "check for nested async",
  () => assert.deepStrictEqual(
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
test(
  "check for nested array async",
  () => assert.deepStrictEqual(
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
test(
  "check for nested array async",
  () => assert.deepStrictEqual(
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
