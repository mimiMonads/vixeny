# Vixeny's Tokens

## Introduction 

JSON Web Tokens (JWTs) are renowned for their effectiveness and robustness in asynchronously signing claims and authenticating with either public or private keys. Despite their advantages, there are several inherent challenges with JWTs:

- JWTs necessitate payload decoding from Base64 and parsing to JSON to validate claims like expiration dates. Even though this operation is straightforward, it could be computationally intensive, particularly in high-traffic applications or in resource-constrained environments.
- Waiting for the entire hash to determine the validity of a token can be inefficient as there is no mechanism for early detection of invalid tokens. The hashing process depends on the entire message and the key.
- JWTs are not specifically designed or optimized for signing strings and they return an "Error" upon failure, which is not always the most helpful response.

In response to these challenges, we propose an innovative approach that draws upon the strengths of two well-established encryption algorithms: RC4 and Salsa20. Using these algorithms as our foundation, we developed a prototype that utilizes a seed value to generate a unique signing and verifying algorithm for each signer and verifier. This strategy employs the concept of function composition, the process of crafting a complex function by integrating simpler ones, and takes full advantage of a runtime environment, in this case, JavaScript.

Our proposed solution presents numerous advantages:

- The payload does not need to be decoded to check the expiration, enhancing performance efficiency.
- The algorithm checks the validity at each character level, enabling early rejection of invalid tokens.
- Instead of returning an "Error", it returns "False" or "Null" depending on the mode when an error occurs, providing more versatile error handling.
- Key strength issues become irrelevant, as the seed used to plot the unique algorithm ensures robust security without the need for a separate secret key.
- The size of the claim decreases significantly for small claims, optimizing data transfer efficiency.

However, our approach is not without potential limitations:

- The nature of the algorithm makes it synchronous, meaning only those with the correct seed can verify the claim.
- The solution requires a minimum length of 8 for functionality.

## Retrieving Signer and Verifier

We provide two sets of signers and verifiers, each set tailored to handle either JSON-like objects or plain strings. 

Let's fetch these functions:

### Using Deno

```ts
import jSigner from "https://deno.land/x/endofunctor/components/tokens/jSigner.ts"
import jVerifier from "https://deno.land/x/endofunctor/components/tokens/jVerify.ts"
import signer from "https://deno.land/x/endofunctor/components/tokens/signer.ts"
import verifier from "https://deno.land/x/endofunctor/components/tokens/verify.ts"
```

### Using Bun

```ts
import jSigner from "vixeny/components/tokens/jSigner"
import jVerifier from "vixeny/components/tokens/jVerify"
import signer from "vixeny/components/tokens/signer"
import verifier from "vixeny/components/tokens/verifier"
```

## Handling Plain Claims

We've designed this mode with session ID in mind. For optimal security, we strongly recommend adding expiration to all your claims.

The SignVerifyOptions type contains these parameters:

```ts
type SignVerifyOptions = {
    seed: string;
    // this option allows you to fix the token size, improving performance. Note that it does not include the size of expiration - you'll need to add 13 to the size of your token.
    size?: NumericRange<CreateArrayWithLengthX<8>, 40>;
    // set at 4 by default, this parameter adjusts the complexity of the function. The value of 4 is four times more complex than 1.
    sequence?: 1 | 2 | 3 | 4;
    // add the time in ms based on Date.now() 
    expires?: number
};
```

Let's sign and verify a message: 

```ts
const   seed = "hello",
        message = "12345678",
        inValidClaim = "12345678.xT7u34qa"

const sign = signer({seed:seed})
const verify = verifier({seed:seed})

console.log(sign(message))
// Output: 12345678.xT7u34qz

console.log(verify(sign(message)))
// Output: true
console.log(verify(inValidClaim))
// Output: false
```

Adding expiration:

```ts

const   seed = "hello",
        message = "12345678"

const sign = signer({seed:seed, expires: 10_000})
// This signer will generate tokens but the verifiers will always reject them.
const signExpired = signer({seed:seed, expires: -1})
// The expires option does not affect the verifier directly but informs it that it should expect an expiration date.
const verify = verifier({seed:seed, expires: 10_000})

console.log(verify(sign(message)))
// Output: true
console.log(verify(signExpired(message)))
// Output: false
```

Working with a fixed size:

```ts

const   seed = "hello",
        message = "12345678"

// The length of our message is 8, and the timestamp size is 13, so our size in this case will be 21.
const sign = signer({seed:seed, expires: 10_000 , size: 21})

const CommonVerify = verifier({seed:seed, expires: 10_000})
const verify = verifier({seed:seed, expires: 10_000, size: 21})

console.log(verify(sign(message)))
// Output: true
console.log(verify(signer(message)))
// Output: true
console.log(CommonVerify(signer(message)))
// Output: true
```

It's important to note:

```ts
const   seed = "hello",
        message = "12345678"

const sign = signer({seed:seed})
const sign_sequence3 = signer({seed:seed, sequence: 3})

// These two signed messages will be completely different
console.log(sign(message) === sign_sequence3(message))
// Output: false
```

## Managing Tokens

The handling of tokens follows the same principle as plain claims, but setting a fixed size isn't recommended for tokens.

> Important: Always add an expiration time to your tokens. The following are merely illustrative examples:

```ts
const   seed = "hello",
        obj = {hello: "world"},
        invalidToken = "eyJoZWxsbyI6IndvcmxkIn0=.rwY85qhxKJXaHivubE+sDunr"

const sign = jSigner({seed: seed })
const verify = jVerifier({seed: seed })

console.log(sign(obj))
// Output: eyJoZWxsbyI6IndvcmxkIn0=.rwY85qhxKJXaHivubE+sDunt

console.log(verify(sign(message)))
// Output: {seed: seed }
console.log(verify(invalidToken))
// Output: null

```

You can utilize a schema to accelerate the process. This is based on JSONSchema:

```ts
const   seed = "hello",
        obj = {hello: "world"}

const sign = jSigner({seed: "hello" , schema: {
    type: "object",
    properties: {
      hello: { type: "string" },
    },
    required: ["hello"],
  }})

const verify = jVerifier({seed: seed })

console.log(sign(obj))
// Output: eyJoZWxsbyI6IndvcmxkIn0=.rwY85qhxKJXaHivubE+sDunt

console.log(verify(sign(message)))
// Output: {hello: "world"}
```

Utilizing a schema not only makes the token generation process faster, but it also provides a clear structure for the data encapsulated within the token, ensuring its validity and consistency.