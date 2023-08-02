import fun from "./fun.ts";
const r = new Request("http://localhost:8080/get/hello?hello=world")

const v = fun()([
    {
        path: "/get/:name",
        resolve: [{
            name:"element_1", 
            f: f=> f.param.name
        },
        {
            name:"element_2", 
            query:{only:["hello"]},
            f: f=> f.query.hello ?? "not_found"
        }],
        f: f => f.resolve.element_1.param.name  + " " + f.resolve.element_2.query.hello
            }
])
console.log(await v(r).text())