import { assertEquals } from "https://deno.land/std@0.160.0/testing/asserts.ts";
import elements from "../../../optimizer/queries/elements.ts";

Deno.test(
  "queries",
  () =>
    assertEquals(
      elements(["hello"]),
      '(p=>u=>(l=> l!==-1?p(u.slice(l)) :null)(u.indexOf("?")))(s => ({ hello:  (a =>a !== -1? (l =>  l !== -1 ? s.slice(a+6,l):s.slice(a+6,s.length))(s.indexOf("&",a)):null)(s.indexOf("hello=")) }))',
    ),
);

Deno.test(
  "queries",
  () =>
    assertEquals(
      elements(["hello", "hi"]),
      '(p=>u=>(l=> l!==-1?p(u.slice(l)) :null)(u.indexOf("?")))(s => ({ hello:  (a =>a !== -1? (l =>  l !== -1 ? s.slice(a+6,l):s.slice(a+6,s.length))(s.indexOf("&",a)):null)(s.indexOf("hello=")) , hi:  (a =>a !== -1? (l =>  l !== -1 ? s.slice(a+3,l):s.slice(a+3,s.length))(s.indexOf("&",a)):null)(s.indexOf("hi=")) }))',
    ),
);
