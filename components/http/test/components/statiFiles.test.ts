import assert from "node:assert";
import test from "node:test";
import staticFiles from "../../src/framework/optimizer/staticFiles.ts";

test(
  "statiFiles",
  () =>
    (
      async (f) =>
        assert.deepStrictEqual(
          (await (f(
            new Request("https://localhost:8080/static/logo.png"),
          ) as Response)).status,
          200,
        )
    )(
      staticFiles()(
        { type: "fileServer", path: "./misc/", name: "/static/" },
      ),
    ),
);
