import assert from "node:assert";
import test from "node:test";

import composer from "../../src/staticFiles/composedPaths.ts";


test(
  "hello",
  () =>
    assert.deepStrictEqual(
      "/fun.test.ts",
      composer({ type: "fileServer", path: "./misc/", name: "/", mime: false })(
        "./test/",
      )("./")(["./test/fun.test.ts"])([])[0].path,
    ),
);
test(
  "hello",
  () =>
    assert.deepStrictEqual(
      "/fun.test.ts",
      composer({ type: "fileServer", path: "./misc/", name: "/", mime: false })(
        "./test/",
      )("./")(["./test/fun.test.ts"])([[".ts", "null"]])[0]
        .path,
    ),
);
