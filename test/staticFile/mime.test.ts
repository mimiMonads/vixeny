import { assertEquals } from "@std/assert";
import { test } from "@cross/test";

import staticFileTools from "../../src/staticFiles/staticFileTools.ts";

test(
  "checking mime",
  () => {
    assertEquals(
      staticFileTools.mimeForm({
        type: "fileServer",
        path: "./",
        name: "/hello/",
      }).length,
      74,
    );
    assertEquals(
      staticFileTools.mimeForm({
        type: "fileServer",
        path: "./",
        name: "/hello/",
        mime: false,
      })
        .length,
      0,
    );
    assertEquals(
      staticFileTools.mimeForm({
        type: "fileServer",
        path: "./",
        name: "/hello/",
      }).find( val => val[0] === '.ts'),
      [".ts", "video/mp2t"],
    );
    assertEquals(
      staticFileTools.mimeForm({
        type: "fileServer",
        path: "./",
        name: "/hello/",
        extra: [[".ts", "hello/hello"]],
      }).find( val => val[0] === '.ts'),
      [".ts", "hello/hello"],
    );
  },
);
