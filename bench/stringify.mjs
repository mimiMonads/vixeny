
import { bench , run } from "mitata";
import stringify from "../components/stringify/safe.mjs";
import Ustringify from "../components/stringify/unsafe.mjs";
const str = stringify({
    type: "object",
    properties: {
        sub: { type: "string" },
        iat: { type: "number" },
        r: {type: "string", const: "hello"}
    },
    required: ["sub","iat"],
  })

  const ustr = Ustringify({
    type: "object",
    properties: {
        sub: { type: "string" },
        iat: { type: "number" },
        r: {type: "string", const: "hello"}
    },
    required: ["sub","iat"],
  })

const f = {
    sub: "1234567890",
    iat: Date.now(),
    r: "hello"
}

const f1 = {
    sub: "1234567890",
    iat: Date.now(),
    r: "hello"
}



bench('standard / string_number_const',  () => JSON.stringify(f1))
bench('V / string_number_const', () => str(f))
bench('V / unsafe_string_number_const',  () => ustr(f))

await run()