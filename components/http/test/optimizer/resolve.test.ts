import assert from "node:assert";
import test from "node:test";

import resolveComposer from "../../src/optimizer/resolveComposer.ts";

test(
  "check for async",
  async () =>
    assert.deepStrictEqual(
      await resolveComposer()({
        first: {
          f: async (f) => await (await f.req.blob()).text(),
        },
      })(
        new Request("http://hi.com/", { method: "POST", body: "hello" }),
      ) as Record<string, string>,
      { first: "hello" },
    ),
);
//await (first=>async r =>({first:await first(r)}))((a=>k=>async r=> await k(await a(r)))(r=>({req:r}))(async f => await(await f.req.blob()).text()))(new Request("http://localhost:8080/", {method: "POST", body: "hello"}))

test(
  "check for sync",
  () =>
    assert.deepStrictEqual(
      resolveComposer()({
        hi: {
        f: () => "hello",
      }
      })(new Request("http://hi.com/")),
      { hi: "hello" },
    ),
);

test(
  "check for sync",
  async () =>
    assert.deepStrictEqual(
      await resolveComposer(
        { mutable: { hi: "hello" } },
      )({resolve :{
        f: (f) => f.mutable,
      }})(new Request("http://hi.com/")),
      { resolve: { hi: "hello" } },
    ),
);
test(
  "check for async",
  async () =>
    assert.deepStrictEqual(
      await resolveComposer()({
        first :{
        resolve: {
          second : {
          f: async (f) => (await f.req.blob()).text(),
        }},
        options: {
          add: ["resolve"],
        },
        f: (f) => f.resolve,
      }})(new Request("http://hi.com/", { method: "POST", body: "hello" })),
      { first: { second: "hello" } },
    ),
);

test(
  "check for sync",
  () =>
    assert.deepStrictEqual(
      resolveComposer()({
        first : {
        resolve: { second :{
          f: (f) => "hello",
        }},
        f: (f) => f.resolve,
      }})(new Request("http://hi.com/")),
      { first: { second: "hello" } },
    ),
);
