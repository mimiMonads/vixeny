import { assertEquals } from "@std/assert";
import { test } from "@cross/test";

import composer from "../../src/staticFiles/composedPaths.ts";

test(
  "static file checking file in composition",
  () => {
    assertEquals(
      "/fun.test.ts",
      composer()({ type: "fileServer", path: "./misc/", name: "/", mime: false })(
        "./test/",
      )("./")(["./test/fun.test.ts"])([])[0].path,
    );
    assertEquals(
      "/fun.test.ts",
      composer()({ type: "fileServer", path: "./misc/", name: "/", mime: false })(
        "./test/",
      )("./")(["./test/fun.test.ts"])([[".ts", "null"]])[0]
        .path,
    );
  },
);
