import assert from "node:assert";
import test from "node:test";
import checkAsync from "../../src/framework/optimizer/checkAsync.ts";

test(
  "check for async",
  () =>
    assert.deepStrictEqual(
      checkAsync({
        path: "/",
        f: async (f) => await f.req.blob(),
      }),
      true,
    ),
);
test(
  "check for sync",
  () =>
    assert.deepStrictEqual(
      checkAsync({
        path: "/",
        f: () => "hello",
      }),
      false,
    ),
);
test(
  "check for nested async",
  () =>
    assert.deepStrictEqual(
      checkAsync({
        path: "/",
        resolve:{ hi: {
          f: async (f) => await f.req.blob(),
        }},
        f: () => "hi",
      }),
      true,
    ),
);
test(
  "check for nested async",
  () =>
    assert.deepStrictEqual(
      checkAsync({
        path: "/",
        resolve:{ hi: {
          f: () => "hi",
        }},
        f: () => "hi",
      }),
      false,
    ),
);
test(
  "check for nested array async",
  () =>
    assert.deepStrictEqual(
      checkAsync({
        path: "/",
        resolve:{ 
          "hi" :{
           
            f: () => "ji",
          },
          "hi2" :{
  
            f: async (f) => await f.req.blob(),
          },
        },
        f: () => "hi",
      }),
      true,
    ),
);
test(
  "check for nested array async",
  () =>
    assert.deepStrictEqual(
      checkAsync({
        path: "/",
        resolve: {
          hi :{

            f: () => "ji",
          },
          hi2 :{
            f: () => "hi",
          },
        },
        f: () => "hi",
      }),
      false,
    ),
);
