import { assertEquals } from "@std/assert";
import { test } from "@cross/test";

import { wrap } from "../../main.ts";

const wrapAt4 = wrap({
  indexBase: {
    at: 4,
  },
})()
  .stdPetition({
    path: "/hello",
    f: () => "from inside",
  })
  .stdPetition({
    path: "/hello/:hello",
    f: ({ param }) => param.hello,
  })
  .compose();



const base = "http://hello.com/hello";
const req = new Request(base + "/hello");
const param = new Request(base + "/hello/hello");

