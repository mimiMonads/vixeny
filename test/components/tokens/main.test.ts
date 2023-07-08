import verifier from "../../../components/tokens/verifier.ts";
import signer from "../../../components/tokens/signer.ts";

import { assertEquals } from "https://deno.land/std@0.160.0/testing/asserts.ts";


Deno.test(
  "test",
  async () => (
    async sign => assertEquals(
      (await verifier({ seed: "hello" }))(sign("123435675634")),
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

