import assert from "node:assert";
import test from "node:test";
import finder from "../../../src/queries/finder.ts";

test(
  "queries",
  () =>
    assert.deepStrictEqual(
      finder("hello"),
      ' (a =>a !== -1? (l =>  l !== -1 ? s.slice(a+6,l):s.slice(a+6,s.length))(s.indexOf("&",a)):null)(s.indexOf("hello=")) ',
    ),
);
