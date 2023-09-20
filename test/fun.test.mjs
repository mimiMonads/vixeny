
import paths from "./util/paths.ts";
import fun from "../fun.ts";


export default (test=>it=>describe=>(
test(
        it("main"),
        () =>
          (
            async (f) =>
            describe(
                [
                  await (f(new Request("http://localhost:8080/"))).text(),
                  await (f(new Request("http://localhost:8080/one"))).text(),
                  await (f(new Request("http://localhost:8080/two"))).text(),
                  await (f(new Request("http://localhost:8080/three"))).text(),
                  await (f(new Request("http://localhost:8080/four"))).text(),
                  await (f(new Request("http://localhost:8080/five"))).text(),
                  await (f(new Request("http://localhost:8080/six"))).text(),
                  await (f(new Request("http://localhost:8080/test"))).text(),
                  await (f(new Request("http://localhost:8080/test/"))).text(),
                  await (f(new Request("http://localhost:8080/", { method: "POST" })))
                    .text(),
                  await (f(new Request("http://localhost:8080/", { method: "HEAD" })))
                    .text(),
                  await (f(new Request("http://localhost:8080/", { method: "DELETE" })))
                    .text(),
                  await (f(new Request("http://localhost:8080/test/1/2/")))
                    .text(),
                  (f(new Request("http://localhost:8080/notFound"))).status,
                  (f(
                    new Request("http://localhost:8080/notFound", {
                      method: "BAD_METHOD_",
                    }),
                  )).status
                ]).toEqual(
                [
                  "GET:main",
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "GET:test",
                  "GET:test/",
                  "POST:main",
                  "HEAD:main",
                  "DELETE:main",
                  "GET:test/:id/:name/",
                  404,
                  405,
                ]
              )
      
          )(
            fun()(paths)
          )
      ),

test(
    it("main"),
    () =>
      (
        async (f) =>
        describe(
            [
    
              await (f(new Request("http://localhost:8080/count"))).text(),
              await (f(new Request("http://localhost:8080/hello_world"))).text(),
              await (f(new Request("http://localhost:8080/random_number"))).text(),
              await (f(new Request("http://localhost:8080/plus_1", { method: "POST" } ))).text(),
              await (f(new Request("http://localhost:8080/minus_1", { method: "POST" } ))).text(),
            ]).toEqual(
            ["1","2","3","4","5"]
          )
  
      )(
        fun()([
          {
            path: "/count",
            f: () => "1",
          },
          {
            path: "/hello_world",
            f: () => "2",
          },
          {
            path: "/random_number",
            f: () => "3",
          },
          {
            path: "/plus_1",
            f: () => "4",
            method: "POST",
          },
          {
            path: "/minus_1",
            f: () => "5",
            method: "POST",
          },
        ])
      )
  ),
  test(
    it("main"),
    () =>
      (
        async (f) =>
        describe(
            [
              await (f(new Request("http://localhost:8080/"))).text(),
              await (f(new Request("http://localhost:8080/test"))).text(),
              await (f(new Request("http://localhost:8080/test/"))).text(),
              await (f(new Request("http://localhost:8080/", { method: "POST" })))
                .text(),
              await (f(new Request("http://localhost:8080/", { method: "HEAD" })))
                .text(),
              await (f(new Request("http://localhost:8080/", { method: "DELETE" })))
                .text(),
              await (f(new Request("http://localhost:8080/test/1/2/")))
                .text(),
              (f(new Request("http://localhost:8080/notFound"))).status,
              (f(
                new Request("http://localhost:8080/notFound", {
                  method: "BAD_METHOD",
                }),
              )).status,
              await (f(new Request("http://localhost:8080/hello/***/*/*/*/*"))).text(),
              await (f(new Request("http://localhost:8080/hello/nested/*/*/*/*"))).text()
            ]).toEqual(
            [
              "GET:main",
              "GET:test",
              "GET:test/",
              "POST:main",
              "HEAD:main",
              "DELETE:main",
              "GET:test/:id/:name/",
              404,
              405,
              "wild",
              "card"
            ]
          )
  
      )(
        fun()([...paths,
        { path: "/hello/*", f: () => "wild" },
        { path: "/hello/nested/*", f: () => "card" }
        ])
      )
  ),
  test(
    it("main"),
    () =>
      (
        async (f) =>
        describe(
            [
              await (f(new Request("http://localhost:8080/"))).text(),
              await (f(new Request("http://localhost:8080/test"))).text(),
              await (f(new Request("http://localhost:8080/test/"))).text(),
              await (f(new Request("http://localhost:8080/", { method: "POST" })))
                .text(),
              await (f(new Request("http://localhost:8080/", { method: "HEAD" })))
                .text(),
              await (f(new Request("http://localhost:8080/", { method: "DELETE" })))
                .text(),
              await (f(new Request("http://localhost:8080/test/1/2/")))
                .text(),
              (f(new Request("http://localhost:8080/notFound"))).status,
              f(
                new Request("http://localhost:8080/notFound", {
                  method: "BAD_METHOD",
                }),
              ).status,
              await (f(new Request("http://localhost:8080/hello/***/*/*/*/*"))).text(),
              await (f(new Request("http://localhost:8080/hello/nested/*/*/*/*"))).text(),
              (await (f(new Request("http://localhost:8080/static/fun.test.ts")))).status,
            ]).toEqual(
  
            [
              "GET:main",
              "GET:test",
              "GET:test/",
              "POST:main",
              "HEAD:main",
              "DELETE:main",
              "GET:test/:id/:name/",
              404,
              405,
              "wild",
              "card",
              200
            ]
          )
  
  
      )(
        fun({
          hasName: "http://localhost:8080/"
        })([...paths,
        { path: "/hello/*", f: () => "wild" },
        { path: "/hello/nested/*", f: () => "card" },
        { type: "fileServer", path: "./test/", name: "/static/" },
        ])
      )
  )
  
))

