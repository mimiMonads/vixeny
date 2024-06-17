import assert from "node:assert";
import test from "node:test";

import composer from "../../src/staticFiles/composedPaths.ts";

test(
  "static file checking file in composition",
  () => {
    assert.deepStrictEqual(
      "/fun.test.ts",
      composer({ type: "fileServer", path: "./misc/", name: "/", mime: false })(
        "./test/",
      )("./")(["./test/fun.test.ts"])([])[0].path,
    );
    assert.deepStrictEqual(
      "/fun.test.ts",
      composer({ type: "fileServer", path: "./misc/", name: "/", mime: false })(
        "./test/",
      )("./")(["./test/fun.test.ts"])([[".ts", "null"]])[0]
        .path,
    );
  },
);
