
import { assertEquals } from "https://deno.land/std@0.160.0/testing/asserts.ts";
import checkAsync from "../../optimizer/resolve/main.ts";


Deno.test(
  "check for async",
    async () =>   assertEquals(
       ( await checkAsync()("/")({
        name: "first",
        path: "/",
        f: async f => await(await f.req.blob()).text()
      })
      (new Request("http://hi.com/", {method: "POST", body: "hello"})) as Record<string, string>) ,
      { first : "hello"}
  )
)
//await (first=>async r =>({first:await first(r)}))((a=>k=>async r=> await k(await a(r)))(r=>({req:r}))(async f => await(await f.req.blob()).text()))(new Request("http://localhost:8080/", {method: "POST", body: "hello"}))

Deno.test(
  "check for sync",
  () => assertEquals(
    checkAsync()("/")({
        name: "hi",
        path: "/",
      f: () => "hello"
    })(new Request("http://hi.com/")),
    { hi : "hello"}
  )
)


Deno.test(
  "check for async",
      async () =>   assertEquals(
      (await checkAsync()("/")({
        name: "first",
        resolve: [{
          name: "second",
          f : async f => (await f.req.blob()).text()
        },
      ],
        path: "/",
        add: ["resolve"],
        f: f => f.resolve
      })
      (new Request("http://hi.com/", {method: "POST", body: "hello"}))),
      { first : {second: "hello"}}
  )
)

Deno.test(
  "check for sync",
  () => assertEquals(
    checkAsync()("/")({
        name: "first",
        resolve:{
          name: "second",
          f: f => "hello"
        },
        path: "/",
      f: f => f.resolve
    })(new Request("http://hi.com/")),
    { first : {second: "hello"}}
  )
)