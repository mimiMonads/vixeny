import main from "./fun.test.mjs"
import assert from "node:assert";
import test from "node:test"

const  describe = (v => ({
    toEqual: ar => assert.deepStrictEqual(v,ar)
}));

main(test)(i=>i)(describe)

