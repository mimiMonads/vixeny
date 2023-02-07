import { assertEquals } from "https://deno.land/std@0.160.0/testing/asserts.ts";
import finder from "../../../optimizer/queries/finder.ts";

Deno.test(
  "queries",
  () =>
    assertEquals(
      finder("hello"),
      ' (a =>a !== -1? (l =>  l !== -1 ? s.slice(a+6,l):s.slice(a+6,s.length))(s.indexOf("&",a)):null)(s.indexOf("hello=")) ',
    ),
);
