import assert from "node:assert";
import test from "node:test"

import checker from "../../../optimizer/staticFiles/getDir.ts";


test(
    "static",
    () => 
        assert.deepStrictEqual(
            checker("./test/").every( x => x[0] === "." && x[1] === "/"),
            true
        )
)