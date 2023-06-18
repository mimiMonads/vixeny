# Vixeny

<p align="center">
  <img  src="misc/logo.png" alt="Vixeny Logo" max-width="33%">
  <br>
  <b style="font-size:1.2em; font-style:italic; color:darkcyan;">Unleash the functional beast~</b>
</p>

## Introduction

Vixeny is a purely functional web framework in TypeScript that rivals other typed programming languages like Go or Rust.

## Benchmarks

### Deno
[Vixeny Hono](https://github.com/mimiMonads/hono-functor-benchmark)

## Key Advantages of Vixeny

These are the key benefits that position Vixeny as a standout web framework choice in the JavaScript ecosystem.

- **No External Dependencies:** Vixeny is self-sufficient, independent of external dependencies. 

- **Safety and Immutability:** Vixeny eradicates side effects and assures data safety, always prioritizing immutable data.

- **Clean Global Context:** Vixeny operates without corrupting your global context, maintaining a clean, efficient workspace.

- **Embracing Functional Paradigm:** Vixeny embodies the efficiency of typed programming languages in JavaScript without speed penalties, while maintaining programming versatility. Other functional paradigms can also be applied. 

## Table of Contents
- Get Started
- Experimental Features
- Upcoming Features
- Q&A

## Get Started in 10 Minutes!

### Hello World in Deno!

```typescript
import { serve } from "https://deno.land/std@0.159.0/http/server.ts";
import vixeny from "npm:vixeny/fun";
// Types
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

```typescript
// Bun
import vixeny from "vixeny/fun";
// Types 
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

If you prefer learning with code, this repository details how it works, step by step, from basic to advanced concepts with a live server. It's highly recommended.

[Examples](https://github.com/mimiMonads/vixeny_examples)

## The Basics

```typescript
/*
    The vixeny framework requires:

    vixeny(option)([...petitions])

    option - Configuration options for the vixeny server.
    petitions - An array of routes for the vixeny server to handle.

*/
import { ObjectRawResponse } from "vixeny/optimizer/types";

    //An example of a petition, all the following examples are PETITIONS
    {
      path: "/",
      f: (_) => "hello world",
    } as ObjectRawResponse
```

## Adding Parameters, Query, Status, or Header

```typescript
// It auto-detects if you are using parameters, queries, or Request unless you send the arguments out of the scope
// r:

 (arguments) => outOfScope(arguments),
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

## Need More Control?

```typescript
// Use the type: "request" to return a Response or Promise<Response>
// You can use params and query here too!

    {
      type: "request",
      path: "/abc",
      f: (f) => new Response(f.query?.hello || "abc"),
    }
```

## Just Need to Route Your Function? We've Got You Covered!

```typescript
// Use the type: "response" to return a Response or Promise<Response>

    {
      type: "response",
      path: "/",
      r: (_) => new Response("hello world"),
    }
```

## Static File Support is Natively Built into Vixeny!
***It currently only supports one; this will be enhanced in future releases.***
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

Thank you and enjoy using Vixeny!

# Specifications

## Route Options

```typescript
type funRouterOptions = {
  hasName?: string;
  paramsStartsWith?: string;
  notFound?: (x: Request) => Response;
  badMethod?: (x: Request) => Response;
};
```

- **"hasName"**: This is the name of the server, and it must always end with "/", for example: "http://127.0.0.1:8080/". The router will operate 5% faster if a name is provided.

- **"paramsStartsWith"**: By default, a parameter is defined by ":" following a "/". Changing this value will take the first character and check if it's followed by "/" to start a new parameter.

- **"notFound"**: Modifies the default NOT_FOUND response.

- **"badMethod"**: Modifies the default BAD_METHOD response.

## Methods

There are four main methods:

```typescript
type ParamsMethod = "GET" | "HEAD" | "POST" | "DELETE";
```

## Experimental Features

***These features are still under development and may change over time.***

### Stringifier

This feature is a JSON Stringifier based on JSONSchema. Noteworthy aspects are:
- It doesn't verify the JSON.
- It cannot fail.
- If a required key is missing, it will be "null". Otherwise, it won't be added to the final string.

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

## Upcoming Features

- Wild cards
- Signer and Verifier 

## Q&A

- **Why doesn't Vixeny support Node.js?**

  Node.js is not supported due to its incompatibility with the Response and Request methods used by Vix

eny.

- **What makes Vixeny so fast?**

  - **Efficient Function Resolution:** Vixeny uses proprietary tools "Atlas" and "Solver" to streamline function execution. By applying set and category theory, functions are smartly composed in the caller's execution context, enhancing speed.

  - **Optimized Memory Management:** Vixeny optimizes memory by using stack memory, symmetry, and primitives. This minimizes heap usage, ensures data immutability, and speeds up operations.

  - **No Looping or Named Recursion:** Leveraging the symmetrical properties of sets and categories, Vixeny eliminates the need for looping or recursion in the return function. This reduces redundancy and unnecessary computation.

  - **JIT Compiler Enhancements:** Vixeny encourages the JIT compiler to compile code in a specific way by resolving all elements simultaneously. This strategy allows the JIT compiler to identify and apply optimizations, thus enhancing performance.

Additional optimizations such as user-provided function optimization are also applied but aren't detailed here.

Vixeny is more than a tool; it's a testament to the power of functional programming. With over 1,000 hours of research and meticulous design testing, it showcases the efficiency, speed, and memory management that functional programming can provide. Vixeny pushes boundaries, transforms theory into practice, and opens up new possibilities. To all functional programmers, Vixeny salutes your craft.

For further inquiries, please feel free to post an issue on our repository!

## License

[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0/legalcode.txt)
