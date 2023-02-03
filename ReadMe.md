# Endofunctor 

Alpha

## About

Endofunctor is:

- Independent 
- Fast 
- Scalable 
- Predictable
- Functional

## Benchmark

Faster than Hono / [Endofunctor vs. Hono](https://github.com/mimiMonads/hono-functor-benchmark)


## Get started in 10 Minutes!

### Get Endofunctor  and a server

```typescript
//Endofunctor is just a router, so a server that gives a Request and expects a Response is needed

import { serve } from "https://deno.land/std@0.159.0/http/server.ts";

// import fun

import fun from "https://deno.land/x/endofunctor/fun.ts";
```
## Give a path and a function

```typescript
// the function has to return a valid BodyInt or Promise<BodyInit>
await serve(
  fun()([
    {
      path: "/",
      f: (_) => "hello world",
    },
  ]),
  { port: 8080 },
);
```
## Add parameters, a query, a status, or a header!

```typescript
// the router auto-detect if you are using (parameters,  queries, or Request ) unless you send the arguments out of the scope
// r: (arguments) => outOfScope(arguments),
// you can add or remove them with "add", "delete"


await serve(
  fun(
 { hasName: "http://127.0.0.1:8080/" },
)([
    {
      path: "/test/:id",
      status: 201,
      header:  ".html", // { 'Content-Type' : 'text/html'}
      f: (f) => f.param.id + " " + (f.query?.hello || ""),
    },
  ]),
  { port: 8080, hostname: "127.0.0.1" },
);
```

## Parameters

```typescript

 "/hello/:id"
 "/hello/:id/"
 "/hello/:id/:page/:time"
 "/hello/:id/:page/:time/"
 "/hi/:id/page/:time"

```


## Do you need more control?

```typescript
// use the type: "request" to return a Response or Promise<Response>
// you can use params and query here too!


await serve(
  fun(
 { hasName: "http://127.0.0.1:8080/" },
)([
    {
        type: "request",
        path: "/abc",
        f: (f) => new Response(f.query?.hello || "abc"),
    },
  ]),
  { port: 8080, hostname: "127.0.0.1" },
);
```
## Do you need Functor just to route your function? I've got you covered!

```typescript
// use the type: "response" to return a Response or Promise<Response>
await serve(
  fun( 
{ hasName: "http://127.0.0.1:8080/" },
)([
      {
        type: "response",
        path: "/",
        r: (_) => new Response("hello world"),
      
      },  ]),
  { port: 8080, hostname: "127.0.0.1" },
);
```
## Static file is natively built in Endofunctor!

```typescript
// "path" is relative to the terminal
// remove mime types with mime:false
// add mime with extra: [ [header, extension]]
await serve(
  fun(
 { hasName: "http://127.0.0.1:8080/" },
)([
      {
        type: "static",
        name: "/s",
        path: "./",
      },
,  ]),
  { port: 8080, hostname: "127.0.0.1" },
);
```
 Thanks and have fun ~




# Specifications


## Route options



```typescript
 type funRouterOptions = {
  hasName?: string;
  paramsStartsWith?: string;
  notFound?: { (x: Request): Response };
  badMethod?: { (x: Request): Response };
};

```

- **"hasName"**: is the name of the server, and it always has to finish with "/"
  , 
example: "http://127.0.0.1:8080/", the router will be 5% faster if a name is
  given.

- **"paramsStartsWith"**: by default, a parameter is defined by ":" next to a
  "/", changing this value, will take the first character and check if it's
  follow by "/" to start a new parameter.

- **"notFound"**: changes the default NOT_FOUND.

- **"badMethod"**: changes the default BAD_METHOD.

## Methods

There are four methods

```typescript
type ParamsMethod = "GET" | "HEAD" | "POST" | "DELETE";
```


## License

[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0/legalcode.txt)
