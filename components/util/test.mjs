import assert from "node:assert";

export default await (async () =>
  // deno-lint-ignore no-async-promise-executor
  await new Promise(async (resolve, reject) =>
    typeof Bun === "object"
      ? resolve(await import("./trampoline.mjs"))
      : reject(await import("node:test"))
  ))()
  .then((x) => ({ describe: x.default.expect, test: x.default.test }))
  .catch((x) => ({
    describe: (v) => ({
      toEqual: (ar) => assert.deepStrictEqual(v, ar),
    }),
    test: x.test,
  }));
