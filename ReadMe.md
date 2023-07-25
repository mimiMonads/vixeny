# Vixeny

  <p align="center">
    <img src="misc/logo.png" alt="Vixeny Logo" style="max-width: 100%;">
    <br>
    <b style="font-size:1.2em; font-style:italic; color:darkcyan;">Unleash the functional beast~</b>
  </p>

## Introduction

Vixeny is a purely functional web framework in TypeScript that aims to rival other typed programming languages like Go or Rust.
- **High-Performance:** Carefully optimized for delivering top-tier performance at every processing level.
- **Self-Sufficiency:** Operates independently, with no external dependencies.
- **Immutable Data:** Prioritizes data safety and eliminates side effects.
- **Scalability:** Ensures high performance even under heavy loads.
- **Extensive Testing:** Over 100 different tests to ensure stability, reliability, and robustness in various scenarios and environments.
- **User-Friendly:** Provides clear syntax and comprehensive documentation for developers at all levels.

## Benchmarks

### Bun
[By SaltyAom](https://github.com/SaltyAom/bun-http-framework-benchmark)

### Deno
[By Denosaurs](https://github.com/denosaurs/bench)


## Get Started in 10 Minutes!

### Hello World in Deno!

```typescript
import { serve } from "https://deno.land/std/http/server.ts";
import vixeny from "https://deno.land/x/endofunctor/fun.ts";
//import vixeny from "npm:vixeny/fun";

await serve(
  vixeny({ hasName: "http://127.0.0.1:8080/" })([
    {
      path: "/",
      f: () => "hello world",
    },
  ]),
  { port: 8080, hostname: "127.0.0.1" },
);
```
### Hello World in Bun!

```typescript
import vixeny from "vixeny/fun";

export default {
  port: 8080,
  hostname: "127.0.0.1",
  fetch: vixeny({ hasName: "http://127.0.0.1:8080/" })([
    {
      path: "/",
      f: () => "hello world",
    },
  ]) 
}

```
## The Basics

```typescript
/*
    The vixeny framework requires:

    vixeny(options)([...petitions])

    Options - Configuration options for the vixeny server.
    Petitions - An array of Petition (routes).

*/
import { Petitions } from "vixeny/types";

    //Petition in the hello world example.
    {
      path: "/",
      f: () => "hello world",
    } 


```

## Parameters

```typescript
[
  {
    path: '/param/:name/bun/:where',
    f: (req) => `Hello ${req.param.name}, the oven is ready for you at : ${req.param.where}`
  },
  {
    path: '/param/:name/deno/:where',
    f: (req) => `Hello ${req.param.name}, time to ride the t-rex at : ${req.param.where}`
  },
]
```

## Query

```typescript
[
  {
    path: '/query/name',
    f: (req) => `Your name is : ${req.query?.name || "default"}`
  },
  {
    path: '/query/nameAndId',
    f: (req) => `Your name is : ${req.query?.name || 'default'} with the id : ${req.query?.id || "-1"}`
  },
  // Only the 'name' field is parsed from the query, ignoring other fields, 
  // using "only" improves significantly the performance.
  {
    path: '/query/onlyName',
    query: {
      only: ["name"]
    },
    f: (req) => `Hello ${req.query?.name || 'default'}`
  },
]

```

## Options

```typescript
[
    // This petition has the pre-set ".html" header that sets to "text/html".
    {
        path: "/headers/hello",
        headers: ".html",
        f:  () => "<p>Hello world!</p>" 
    },
    // Headers can also be manually set using an object. Here, 
    // Here,  "Content-Type" is manually set to "text/html".
    {
        path: "/headers/again",
        headers: { "Content-Type": "text/html"},
        f:  () => "<p>Hello world!</p>" 
    },
    // This route mirrors the body of the request.
    // Here, the "POST" method is used.
    {
        path: "/headers/method",
        method: "POST", // "GET" | "HEAD" | "POST" | "DELETE"
        status: 201,
        f: (request) => request.req.body
    }
]
```

## Type Request

```typescript
/*
 * By setting the type to "request", the return type is changed from BodyInit to Response. 
*/

[
    // The ":name" is a dynamic part of the route which will match any string.
    // The function 'f' checks if the 'name' parameter equals "Bun" or "Deno". 
    // If so , it responds with a 200 status code.
    // If 'name' is anything else, it responds with a 400.
    {
        path: "/response/who/:name",
        type: "request",
        f: (req) => (req.param.name === "Bun" || req.param.name === "Deno")
            ? new Response( "Welcome", {status:200})
            : new Response( "Only devs here", {status: 400})
    }
] 
```

## Vixeny

Offers the ability to manage different aspects of an HTTP request-response cycle in the arguments as response, including headers, response status, request methods, query , parameters an others.

- add: allows you to add fields to the arguments, effectively enabling parsing for certain aspects of the request when your arguments go out of the scope

```typescript
import functionX from "outOfScope"

[
  {
    //(f) will have the fields "req" and "param"
    path:"/example/:id",
    add: ["req","param"],
    f: f => functionX(f)
  }
]
```

- delete: allows you to remove fields from the arguments, providing the ability to exclude certain aspects of the request when there are no needed.

```typescript
[
  {
    path: '/query/block',
    delete: ['query'],
    f: () =>  "Hello world"
  }
]
```
**Vixeny will always try to give you only what is necessary, not only for optimization, but also for the sake of safety and to avoid side effects.**

## Type Response

```typescript
/*
 * When the type is set to "response", the optimizer is bypassed.
 * In such case, a Request is received and a Response is returned directly.
 * Note that "r" is used instead of "f" 
*/

[
  // The route has the type set to "response", bypassing the optimizer. 
  // The function 'r' directly takes a Request object and returns a Response object.
  {
      path: "/response/hello",
      type: "response",
      r: (request) => new Response("Hello world!")    
  }
] 
```

## Type Static

```typescript
/*
 * The "path" is relative to where the terminal is currently located.
 * In this example, we're serving files from the "misc" directory.
 * MIME types are enabled by default but can be disabled by setting "mime: false".
 * At the moment, only one static file can be served at a time.
*/
[
    {
        type: "static",
        name: "/static/",
        path: "./misc/",
    },  
]
```

## Join all together

In the Vixeny framework, the spread operator (`...`) can be used to efficiently include or import routes from other modules or parts of your application. This technique simplifies code organization and encourages a modular design. 

The example you provided demonstrates the use of the spread operator in the main route configuration:

```javascript
[
    // A simple "Hello World" petition
    {
        path: "/",
        f: () => "Hello world"
    },
    // Petitions imported from other modules using the spread operator 
    ...urlParams,
    ...urlQueries,
    ...httpOptions,
    ...typeRequest,
    ...typeResponse,
    ...staticServer,
    ...jsonStringifier
]
```

In this configuration array, `urlParams`, `urlQueries`, `httpOptions`, `typeRequest`, `typeResponse`, `staticServer`, and `jsonStringifier` are arrays of routes that are defined elsewhere in your application. By using the spread operator, these petitions definitions are unpacked and included directly.

## Stringifier

```typescript
/*
 * This method uses the use of JSON Schema for faster serialization. 
 * By defining the structure of our data, we can potentially speed up JSON.stringify by a factor of 3 or more.
*/

[
  // The function 'f' returns the parameters of the request.
  // The 'json' attribute is used to define a JSON Schema that describes the structure of the expected JSON data.
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
] 
```

## Wildcard

``` typescript
//assuming we have these petitions
[
  {path: "/hello/*", f: () => "first"},
  {path: "/hello/nested/*" , f: () => "second"}
]

// new Request("http://127.0.0.1:8080/hello/nested/hi")  -> "second"
// new Request("http://127.0.0.1:8080/hello/hi") -> "first"

```

## Sign and verify

//explication of how it works goes here

there are two ways to use it:

```ts
vixeny({
	hasName: 'http://127.0.0.1:3000/'
})
    ([
        // -> http://127.0.0.1:3000/sign/01234567
        // -> 01234567.k+1wEh9x
        {
            path: "/sign/:id",
            signer: {
                seed: "PUT_YOUR_SEED"
            },
            f: f => 
            f.param.id.length > 7 
                ? f.sign(f.param.id) 
                : "null"
        },
        {
        // -> http://127.0.0.1:3000/verify/01234567.k+1wEh9x
        // -> valid
            path: "/verify/:token",
            verifier: {
                seed: "PUT_YOUR_SEED"
            }, 
            f: f => f.verify(f.param.token) 
                ? "valid"
                : "inValid"
        }
    
    ])

```

``` typescript


import signer from "./components/tokens/signer.ts"
import verifier from "./components/tokens/verifier.ts"

const sign = signer({seed:"PUT_YOUR_SEED"})
const verify = verifier({seed:"PUT_YOUR_SEED"})

console.log(verify(sign("01234567")))


```


Thank you and enjoy using Vixeny!


## Experimental Features

***These features are still under development and may change over time.***

## Modularity

Compose and work as you want with components:

``` typescript

import stringify from "vixeny/components/stringify/stringify"
//Experimental
import signer from "vixeny/components/tokens/signer"
import verifier from "vixeny/components/tokens/verifier"

```



## Q&A

- **Why doesn't Vixeny support Node.js?**

  Node.js is not supported due to its incompatibility with the Response and Request methods used by Vixeny.


## License

[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0/legalcode.txt)
