import { bench, group, run } from "mitata";
import jsonString from "../components/encode/jsonString.mjs";

import parseArguments from "../components/runtime/parseArguments.mjs";
const args = parseArguments();

const one_string = {
    hello: "hello",
  },
  str_one_string = jsonString()({
    type: "object",
    properties: {
      hello: { type: "string" },
    },
    required: ["hello"],
  }),
  ustr_one_string = jsonString({ type: "unsafe" })({
    type: "object",
    properties: {
      hello: { type: "string" },
    },
    required: ["hello"],
  });

// one number

const one_number = {
    hello: 1234,
  },
  str_one_number = jsonString()({
    type: "object",
    properties: {
      hello: { type: "number" },
    },
    required: ["hello"],
  });

// three

const three_string = {
    hello: "hello",
    bar: "hello1",
    foo: "hello2",
  },
  str_three_string = jsonString()({
    type: "object",
    properties: {
      hello: { type: "string" },
      bar: { type: "string" },
      foo: { type: "string" },
    },
    required: ["hello", "bar", "foo"],
  }),
  ustr_three_string = jsonString({ type: "unsafe" })({
    type: "object",
    properties: {
      hello: { type: "string" },
      bar: { type: "string" },
      foo: { type: "string" },
    },
    required: ["hello", "bar", "foo"],
  });

//nested
const nested = {
    hello: {
      hello: "foo",
    },
  },
  str_nested = jsonString()({
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
  ustr_nested = jsonString({ type: "unsafe" })({
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
  });

group("One element type string", () => {
  bench("JSON", () => JSON.stringify(one_string));
  bench("Vixeny safe", () => str_one_string(one_string));
  bench("Vixeny unsafe", () => ustr_one_string(one_string));
});

group("One element type number", () => {
  bench("JSON", () => JSON.stringify(one_number));
  bench("Vixeny", () => str_one_number(one_number));
});

group("Three elements type string", () => {
  bench("JSON", () => JSON.stringify(three_string));
  bench("Vixeny safe", () => str_three_string(three_string));
  bench("Vixeny unsafe", () => ustr_three_string(three_string));
});

group("One nested element", () => {
  bench("JSON", () => JSON.stringify(nested));
  bench("Vixeny safe", () => str_nested(nested));
  bench("Vixeny unsafe", () => ustr_nested(nested));
});

await run({
  json: "json" in args,
});
