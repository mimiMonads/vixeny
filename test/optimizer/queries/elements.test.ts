import assert from "node:assert";
import test from "node:test"
import elements from "../../../components/queries/elements.ts";

test(
  "queries",
  () =>
    assert.deepStrictEqual(
      elements(["hello"]),
      '(p=>u=>(l=> l!==-1?p(u.slice(l)) :null)(u.indexOf("?")))(s => ({ hello:  (a =>a !== -1? (l =>  l !== -1 ? s.slice(a+6,l):s.slice(a+6,s.length))(s.indexOf("&",a)):null)(s.indexOf("hello=")) }))',
    ),
);

test(
  "queries",
  () =>
    assert.deepStrictEqual(
      elements(["hello", "hi"]),
      '(p=>u=>(l=> l!==-1?p(u.slice(l)) :null)(u.indexOf("?")))(s => ({ hello:  (a =>a !== -1? (l =>  l !== -1 ? s.slice(a+6,l):s.slice(a+6,s.length))(s.indexOf("&",a)):null)(s.indexOf("hello=")) , hi:  (a =>a !== -1? (l =>  l !== -1 ? s.slice(a+3,l):s.slice(a+3,s.length))(s.indexOf("&",a)):null)(s.indexOf("hi=")) }))',
    ),
);
