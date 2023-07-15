import verifier from "../../../components/tokens/verifier.ts";
import signer from "../../../components/tokens/signer.ts";

import { assertEquals } from "https://deno.land/std@0.160.0/testing/asserts.ts";



Deno.test(
  "test",
  async () => (
    async sign => assertEquals(
      (await verifier({ seed: "hello", size:40}))(sign(
        Array.from({length:40}, (_,i) => String.fromCharCode(i + 30)).join("")
      )),
      true
    )
  )(
    await signer(
      {
        seed: "hello",
        size:40
      }
    )
  )
)


Deno.test(
  "test",
  async () => (
    async sign => assertEquals(
      (await verifier({ seed: "hello"}))(sign(
        Array.from({length:9}, (_,i) => String.fromCharCode(i + 30)).join("")
      )),
      true
    )
  )(
    await signer(
      {
        seed: "hello",

      }
    )
  )
)
