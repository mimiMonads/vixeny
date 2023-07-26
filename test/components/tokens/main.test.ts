import verifier from "../../../components/tokens/verifier.ts";
import signer from "../../../components/tokens/signer.ts";

import { assertEquals } from "https://deno.land/std@0.160.0/testing/asserts.ts";



Deno.test(
  "test",
  () => (
    sign => assertEquals(
      (verifier({ seed: "hello", size: 40 }))(sign(
        Array.from({ length: 40 }, (_, i) => String.fromCharCode(i + 30)).join("")
      )),
      true
    )
  )(
    signer(
      {
        seed: "hello",
        size: 40
      }
    )
  )
)


Deno.test(
  "test",
  () => (
    sign => assertEquals(
      (verifier({ seed: "hello" }))(sign(
        Array.from({ length: 9 }, (_, i) => String.fromCharCode(i + 30)).join("")
      )),
      true
    )
  )(
    signer(
      {
        seed: "hello",

      }
    )
  )
)

Deno.test(
  "experies",
  () => (
    sign => assertEquals(verifier({ seed: "hello", expires: 1000 })(sign("01234567")), true)
  )(
    signer({ seed: "hello", expires: 1000 })
  )
)
Deno.test(
  "experies",
  () => (
    sign => assertEquals(verifier({ seed: "hello", expires: 1000 })(sign("01234567")), true)
  )(
    signer({ seed: "hello", expires: 1000, size: 21 })
  )
)
Deno.test(
  "experies",
  () => (
    sign => assertEquals(verifier({ seed: "hello", expires: 1000, size: 21 })(sign("01234567")), true)
  )(
    signer({ seed: "hello", expires: 1000 })
  )
)
Deno.test(
  "experies",
  () => (
    sign => assertEquals(verifier({ seed: "hello", expires: 1000 })(sign("01234567")), false)
  )(
    signer({ seed: "hello", expires: -1 })
  )
)
