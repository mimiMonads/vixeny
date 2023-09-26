
import { bench , run } from "mitata";
import stringify from "../components/stringify/safe.mjs";
import Ustringify from "../components/stringify/unsafe.mjs"; 
import safe from "../components/stringify/safe.mjs";
import unsafe from "../components/stringify/unsafe.mjs";

// one string 


const one_string = {
    hello : "hello"
},
    str_one_string = stringify({
        type: "object",
        properties: {
            hello: { type: "string" },
        },
        required: ["hello"],
      }),
    ustr_one_string = Ustringify({
        type: "object",
        properties: {
            hello: { type: "string" },
        },
        required: ["hello"],
      })

// three


const three_string = {
        hello : "hello",
        bar: "hello1",
        foo: "hello2"
    },
        str_three_string = stringify({
            type: "object",
            properties: {
                hello: { type: "string" },
                bar: { type: "string" },
                foo: { type: "string" }
            },
            required: ["hello","bar", "foo"],
          }),
        ustr_three_string = Ustringify({
            type: "object",
            properties: {
                hello: { type: "string" },
                bar: { type: "string" },
                foo: { type: "string" }
            },
            required: ["hello","bar", "foo"],
          })

//nested 
const nested = {
    hello: {
        hello: "foo"
    }
},
    str_nested = safe({
        type: "object",
        properties: {
          hello: {
            type: "object",
            properties: {
              hello: { type: "string" },
            },
          },
        },
        required: ["hello"],
      }),
    ustr_nested = unsafe({
        type: "object",
        properties: {
          hello: {
            type: "object",
            properties: {
              hello: { type: "string" },
            },
          },
        },
        required: ["hello"],
      })

bench('standard / one_string_string',  () => JSON.stringify(one_string))
bench('V safe / one_string_string', () => str_one_string(one_string))
bench('V unsafe / one_string_string',  () => ustr_one_string(one_string))

bench('standard / three_string_string',  () => JSON.stringify(three_string))
bench('V safe / three_string_string', () => str_three_string(three_string))
bench('V unsafe / three_string_string',  () => ustr_three_string(three_string))

bench('standard / nested',  () => JSON.stringify(nested))
bench('V safe / nested', () => str_nested(nested))
bench('V unsafe / nested',  () => ustr_nested(nested))

await run()