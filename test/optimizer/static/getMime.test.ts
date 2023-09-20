import assert from "node:assert";
import test from "node:test"

import checker from "../../../optimizer/staticFiles/getMime.ts";



test(
    "test",
    () => 
        assert.deepStrictEqual(
            checker([[".txt", "hello"]])(".hello"),
            "text/html"
        )
)

test(
    "test",
    () => 
        assert.deepStrictEqual(
            checker([[".hello", "hello"]])(".hello"),
            "hello"
        )
)