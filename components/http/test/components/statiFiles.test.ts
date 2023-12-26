import assert from "node:assert";
import test from "node:test";
import staticFiles from "../../optimizer/staticFiles.ts";

test(
  "statiFiles",
  () =>
    (
      async (f) =>
        assert.deepStrictEqual(
          (await (f(
            new Request("https://localhost:8080/static/fun.test.ts"),
          ) as Response)).status,
          200,
        )
    )(
      staticFiles()(
        { type: "fileServer", path: "./test/", name: "/static/" },
      ),
    ),
);
