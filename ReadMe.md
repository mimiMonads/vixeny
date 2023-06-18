# Vixeny

<p align="center">
  <img src="misc/logo.svg" alt="Vixeny Logo" width="33%">
  <br>
  <b style="font-size:1.2em; font-style:italic; color:darkcyan;">Unleash the functional beast~</b>
</p>

## Intro

Vixeny is a purely functional web framework in TypeScript that matches other typed programming languages like Go or Rust.

## Benchmarks

## Deno
[Vixeny Hono](https://github.com/mimiMonads/hono-functor-benchmark)

## Vixeny's AdvantagesParameters

These key advantages make Vixeny an unmatched web framework choice in the JavaScript ecosystem.

- **No External Dependencies:** Vixeny stands alone, free from external dependencies. Experience the power of true independence.

- **Safety and Immutability:** Vixeny eradicates side effects and locks in data safety. Ensuring immutable data, always.

- **Clean Global Context:** Vixeny operates without polluting your global context. Enjoy a clean, efficient workspace.

- **Embracing Functional Paradigm:** Vixeny embodies the power of typed programming languages in JavaScript. Experience unmatched functional efficiency without speed penalties, while maintaining programming versatility (you can use other functional paradigms). 


Topics
- Get started
- Experimental
- Coming soon
- Q&A

## Get started in 10 Minutes!

### Hello World in Deno!

```typescript

import { serve } from "https://deno.land/std@0.159.0/http/server.ts";
import vixeny from "npm:vixeny/fun"
//Types
import { ObjectRawResponse } from "npm:vixeny/optimizer/types";

await serve(
  vixeny(
    // optional
    { hasName: "http://127.0.0.1:8080/" },
  )([
    {
      path: "/",
      f: (_) => "hello world",
    },
  ]),
  { port: 8080, hostname: "127.0.0.1" },
);

```
### Hello World in Bun!

``` typescript

//Bun
import vixeny from "vixeny/fun"
//Types 
import { ObjectRawResponse } from "vixeny/optimizer/types";


export default {
  port: 8080,
  hostname: "127.0.0.1",
  fetch: vixeny(
    // optional
    { hasName: "http://127.0.0.1:8080/" },
  )([
    {
      path: "/",
      f: (_) => "hello world",
    },
  ]) ,
}
```
## Examples

Some programmers learn more with code, here is a repo with all the details of how it works, step by step and with a live server, with basic to advanced concepts.

[Examples](https://github.com/mimiMonads/vixeny_examples)


``` typescript
/*
    The vixeny framework requires:

    vixeny(option)([...petitions])

    option - Configuration options for the vixeny server.
    petitions - An array of routes for the vixeny server to handle.

*/
import { ObjectRawResponse } from "vixeny/optimizer/types";

    //An example of a petition
    {
      path: "/",
      f: (_) => "hello world",
    } as ObjectRawResponse


```

## Add parameters, a query, a status, or a header

```typescript

// The router auto-detects if you are using parameters, queries, or Request unless you send the arguments out of the scope
// r: (arguments) => outOfScope(arguments),
// You can add or remove them with "add" or "delete"

    {
      path: "/test/:id",
      status: 201,
      headers: ".html", // { 'Content-Type' : 'text/html'}
      f: (f) => f.param.id + " " + (f.query?.hello || ""),
    }

// Parameters examples
"/hello/:id";
"/hello/:id/";
"/hello/:id/:page/:time";
"/hello/:id/:page/:time/";
"/hi/:id/page/:time";
```

## Do you need more control?

```typescript
// Use the type: "request" to return a Response or Promise<Response>
// You can use params and query here too!

    {
      type: "request",
      path: "/abc",
      f: (f) => new Response(f.query?.hello || "abc"),
    },
 

```

## Do you need Functor just to route your function? I've got you covered!

```typescript
// Use the type: "response" to return a Response or Promise<Response>

    {
      type: "response",
      path: "/",
      r: (_) => new Response("hello world"),
    }

```

## Static file is natively built-in Vixeny!
***It only supports one, this will be solved in the future***
```typescript
// "path" is relative to the terminal
// Remove mime types with mime: false
// Add mime with extra: [ [header, extension]]

    {
      type: "static",
      name: "/s/",
      path: "./static/",
    }

```

Thanks and have fun ~

# Specifications

## Route options

```typescript
type funRouterOptions = {
  hasName?: string;
  paramsStartsWith?: string;
  notFound?: (x: Request) => Response;
  badMethod?: (x: Request) => Response;
};
```

- **"hasName"**: It is the name of the server, and it always has to finish with "/", for example: "http://127.0.0.1:8080/". The router will be 5% faster if a name is given.

- **"paramsStartsWith"**: By default, a parameter is defined by ":" next to a "/". Changing this value will take the first character and check if it's followed by "/" to start a new parameter.

- **"notFound"**: Changes the default NOT_FOUND.

- **"badMethod"**: Changes the default BAD_METHOD.

## Methods

There are four methods:

```typescript
type ParamsMethod = "GET" | "HEAD" | "POST" | "DELETE";
```

## Experimental

***These methods can change over time and are not finished.***

### Stringifier

A JSON Stringifier based on JSONSchema. It is important to notice that:
- It does not verify the JSON.
- It cannot fail.
- If a key is missing and it is required, it will be "null". Otherwise, it will not be added to the final string.

Example usage:

```typescript
    {
        path: "/json/:name",
        f: (req) => req.param,
        json: {
            scheme: {
                type: "object",
                properties:{
                    name: {
                        type: "string"
                    }
                },
                required: ["name"]
            }
        }
    }
```

## Coming soon

- wild cards
- signer and verifier 

## Q&A

- **Why is Node.js not supported?**
  
  - The Node.js server does not support the Response and Request utilized by Vixeny.

- **Why is Vixeny so fast?**

 - ***Efficient Function Resolution:*** Vixeny leverages unique tools, "Atlas" and "Solver," streamlining function execution. Using set and category theory principles, it smartly composes functions in the same execution context as the caller. This approach enhances function resolution speed significantly.

 - ***Stack-Savvy Memory Management:*** By utilizing stack memory, exploiting symmetry, and restricting itself to primitives, Vixeny achieves optimized memory management. It mitigates heap usage, promoting swift stack operations and ensuring data immutability. This memory strategy further amplifies Vixeny's speed.

 - ***No Looping nor Named Recursion:*** Vixeny capitalizes on the symmetrical properties of sets and categories, negating the need for looping or recursion (inside of the return function and uses Y combinator (fix point) due the lack of context to set up some functions). By inferring results for equivalent paths (or the lack of them) in the code or data, it eradicates redundancy and unnecessary computation, contributing to its superior efficiency.

 - ***JIT Compiler Optimizations:*** By resolving everything simultaneously without a context, Vixeny creates a unique environment that encourages the JIT compiler to compile the code in a particular manner (this is a simplification that does not do justice to what really happens). This strategy provides the JIT compiler with more opportunities to identify and (hopefully) apply optimizations. The primary motivation behind this technique is to manipulate the JIT compiler into parsing and compiling all elements concurrently. This approach is instrumental in further enhancing the performance and speed of Vixeny.

and there are more things like the optimization of the functions given from the user, but it will not be covered...
  
Vixeny is not just a tool; it's a tribute to the power and potential of functional programming. It is the culmination of over 1,000 hours of research and meticulous design testing, dedicated to unraveling and exploiting the inherent strengths of functional programming. Vixeny showcases how the principles of function composition, immutability, combinators and leveraging set and category theory can lead to a system with robust efficiency, speed, and remarkable memory management. It's an ode to the beauty of functional programming that pushes its boundaries, transforms theory into practice, and encourages us all to envision new possibilities. To every functional programmer out there, Vixeny is a testament to your craft, an embodiment of your work's potential.

If you have any more questions, don't hesitate to ask and post a good issue!

## License

[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0/legalcode.txt)
