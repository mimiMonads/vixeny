import verifier from "../../../components/tokens/verifier.ts";
import signer from "../../../components/tokens/signer.ts";

import { assertEquals } from "https://deno.land/std@0.160.0/testing/asserts.ts";


Deno.test(
    "test",
    async () => (
         sign => assertEquals(
            sign("0123456789"),
            "0123456789.4VVXxO0mc9"
         )
    )(
       await signer(
            {
                seed: "hello",
                
            }
        )
    )
)


Deno.test(
    "test",
    async () => (
        verify => assertEquals(
            verify("0123456789.4VVXxO0mc9"),
            true
         )
    )(
        await verifier(
            {
                seed: "hello",
                
            }
        )       
    )
)