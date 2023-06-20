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
- **User-Friendly:** Provides clear syntax and comprehensive documentation for developers at all levels.

## Benchmarks

### Deno
[Vixeny Hono](https://github.com/mimiMonads/hono-functor-benchmark)


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
    Petitions - An array of routes for the vixeny server to handle.

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
  // Only the 'name' field is parsed from the query, ignoring other fields, using "only" improves significantly the performance.
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
    // This route has the pre-set ".html" header that sets the "Content-Type" header to "text/html".
    {
        path: "/headers/hello",
        headers: ".html",
        f:  () => "<p>Hello world!</p>" 
    },
    // Headers can also be manually set using an object. Here, "Content-Type" is manually set to "text/html".
    {
        path: "/headers/again",
        headers: { "Content-Type": "text/html"},
        f:  () => "<p>Hello world!</p>" 
    },
    // This route mirrors the body of the request. Here, the "POST" method is used.
    {
        path: "/headers/method",
        method: "POST",
        status: 201,
        f: (request) => request.req.body
    }
]
```

## Type Request

```typescript
/*
 * By setting the type to "request", the return type is changed to Response. 
*/

[
    // The ":name" is a dynamic part of the route which will match any string.
    // The function 'f' checks if the 'name' parameter equals "Mimi". 
    // If 'name' is "Mimi", it responds with a 200 status code and the message "Welcome back Mimi".
    // If 'name' is anything else, it responds with a 400 status code and the message "Only devs here".
    {
        path: "/response/who/:name",
        type: "request",
        f: (req) => req.param.name === "Mimi"
            ? new Response( "Welcome back Mimi", {status:200})
            : new Response( "Only devs here", {status: 400})
    }
] 
```

## The Optimizer

The Optimizer offers the ability to manage different aspects of an HTTP request-response cycle in the arguments as response, including headers, response status, request methods, query , parameters an others.

- add: allows you to add fields to the arguments, effectively enabling parsing for certain aspects of the request when your arguments go out of the scope

```typescript
import functionX from "outOfScope"

[
  {
    //(f) will have the fields "req" and "param"
    path:"/example/:id"
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

## Type Response

```typescript
/*
 * When the type is set to "response", the optimizer is bypassed. In such case, a Request is received and a Response is returned directly.
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
 * The "path" is relative to where the terminal is currently located. In this example, we're serving files from the "misc" directory.
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
    // A simple "Hello World" route
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

In this configuration array, `urlParams`, `urlQueries`, `httpOptions`, `typeRequest`, `typeResponse`, `staticServer`, and `jsonStringifier` are presumably arrays of routes that are defined elsewhere in your application. By using the spread operator, these route definitions are unpacked and included directly in your main route configuration. 

Thank you and enjoy using Vixeny!

## More Examples

If you prefer learning with code, this repository details how it works, step by step, from basic to advanced concepts with a live server. It's highly recommended.

[Examples](https://github.com/mimiMonads/vixeny_examples)


## Experimental Features

***These features are still under development and may change over time.***

### Stringifier

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


## Q&A

- **Why doesn't Vixeny support Node.js?**

  Node.js is not supported due to its incompatibility with the Response and Request methods used by Vixeny.


## License

[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0/legalcode.txt)
