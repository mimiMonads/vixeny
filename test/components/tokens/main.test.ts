import verifier from "../../../components/tokens/verifier.ts";
import signer from "../../../components/tokens/signer.ts";

import assert from "node:assert";
import test from "node:test"
import jSigner from "../../../components/tokens/jSigner.ts";
import jVerify from "../../../components/tokens/jVerify.ts";



test(
  "test",
  () => (
    sign => assert.deepStrictEqual(
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


test(
  "test",
  () => (
    sign => assert.deepStrictEqual(
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

test(
  "experies",
  () => (
    sign => assert.deepStrictEqual(verifier({ seed: "hello", expires: 1000 })(sign("01234567")), true)
  )(
    signer({ seed: "hello", expires: 1000 })
  )
)
test(
  "experies",
  () => (
    sign => assert.deepStrictEqual(verifier({ seed: "hello", expires: 1000 })(sign("01234567")), true)
  )(
    signer({ seed: "hello", expires: 1000, size: 21 })
  )
)
test(
  "experies",
  () => (
    sign => assert.deepStrictEqual(verifier({ seed: "hello", expires: 1000, size: 21 })(sign("01234567")), true)
  )(
    signer({ seed: "hello", expires: 1000 })
  )
)
test(
  "experies",
  () => (
    sign => assert.deepStrictEqual(verifier({ seed: "hello", expires: 1000 })(sign("01234567")), false)
  )(
    signer({ seed: "hello", expires: -1 })
  )
)

test(
  'test',
  () =>
    assert.deepStrictEqual(
      jVerify({ seed: "hello" })(jSigner({ seed: "hello" })({ hello: "world" })),
      { hello: "world" }
    )
)
test(
  'test',
  () =>
    assert.deepStrictEqual(
      jVerify({ seed: "hello", expires: 1000 })(jSigner({ seed: "hello", expires: 1000 })({ hello: "world" })),
      { hello: "world" }
    )
)
test(
  'test',
  () =>
    assert.deepStrictEqual(
      jVerify({ seed: "hello", expires: -1 })(jSigner({ seed: "hello", expires: -1 })({ hello: "world" })),
      null
    )
)
