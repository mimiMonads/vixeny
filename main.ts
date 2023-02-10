import composer from "./components/stringify/composer/composer.ts";

const f = composer(
  {
    type: "object",
    properties: {
      hello: {
        type: "object",
        properties: {
          hello: {
            type: "object",
            properties: {
              hello: { type: "number" },
            },
            required: ["hello"],
          },
        },
        required: ["hello"],
      },
    },
    required: ["hello"],
  }
)

const o = {hello:{hello:{hello:1}}}
let i = 0

const t1  = performance.now()

while(i < 1_000_000){
    f(o)
    // JSON.stringify(o)
    i++
}

console.log( performance.now() - t1)