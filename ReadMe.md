#  Vixeny




Unleash the functional beast~


## Intro

  Vixeny is  a functional middleware/handler in Javascript that matches others typed programming languages like go or request, it works with Bun and Deno

Topics
 - Get started
 - Experimental
 - Q&A

## Get started in 10 Minutes!

### Get Endofunctor and a server

```typescript

//Vixiny is just a handler,  a server that gives a Request and expects a Response is needed

import { serve } from "https://deno.land/std@0.159.0/http/server.ts";

//  Deno.serve()
//  Bun.serve()

// Get Vixiny 

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

## Add parameters, a query, a status, or a header

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
      header: ".html", // { 'Content-Type' : 'text/html'}
      f: (f) => f.param.id + " " + (f.query?.hello || ""),
    },
  ]),
  { port: 8080, hostname: "127.0.0.1" },
);
```

## Parameters

```typescript
"/hello/:id";
"/hello/:id/";
"/hello/:id/:page/:time";
"/hello/:id/:page/:time/";
"/hi/:id/page/:time";
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
    },
  ]),
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
      name: "/s/",
      path: "./static/",
    },
    ,
  ]),
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
  , example: "http://127.0.0.1:8080/", the router will be 5% faster if a name is
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

## Experimental

***These methods can change over time and are not finished***

### Stringifier

A JSON Stringifier base on JSONSchema, it is import to notice that:

 - It does not verify the JSON
 - It can not fail
 - If a key is missing and it is required, it will be "null", otherwise, it will not be added to the final string

 ```typescript
{
  schema:{
    json:{
      type: "object",
      properties: {
        hello: {
          type: "object",
          properties: {
            hello: { type: "string" },
          },
      },
      required: ["hello"],
    }
  }
}

 ```
 

### Signer and Verifier

***Currently disable***

### Signer

A fast way to sign and verify session tokes, ***DO NOT USED TO STORE INFORMATION***

***"expires" it not well supported yet, do not use; It is important to consider:***
  - checks the first 13 character to compare it to Date.now() if the Date.now is  > than the Number(string) it will  check the validity of the token
  - Size of the token (min:8 , avg: 24, max 64)
  - The signer has to be set with the same configuration

```typescript
{
   path: "/get/:id",
  // it also can be an untyped petition
   type: "request",
   signer: {
     seed: "hello",
     sequence: .25,
   },
   f: (f) =>
    //This is just a typical response body where signer sings in the body and the cookie
     new Response(f.sign(f.param.id), {
       headers: new Headers({
         "Set-Cookie": ("session=" + f.sign(f.param.id) +";SameSite=Strict;Path=/"),
       }),
     }),
 }
```
### Verifier

``` typescript
 {
   path: "/check",
   verifier: {
     seed: "hello",
     sequence: .25,
   },
   f: (r) =>  (
   // check if there are cookies
     c => c !== null
       ? (
       // check if there a session 
         p => p !== -1
          // slice the cookie , verifier only return true or false 
           ? r.verify(c.slice(p+8,c.length))
           : "null"
       )(
         c.indexOf("session=")
       )
       // if not it return the string null
       : "null"
   )(
     r.req.headers.get("Cookie")
   )
 },

```
## Q&A


Why Deno if Bun is faster?
 - It's more secured
 - More mature
 - The only reason why there is a considerable gap in performance is due its server implementation, yet, Deno has more potential for being optimized (In the future there is a chance that a exclusive server can be made to leverage Vixeny)

 Why nodejs is not supported?
  - Response and Request are not supported by their server

Why is so fast?

 - It uses the same context of the caller to execute a function called solver, the solver has NOT_FOUND and BAD_METHOD as part of its set, making that the Request always part of the universe and returning the position to an array of functions, these functions were arrange with help of the Atlas

 - It is import to understand that there is any object creation besides the strings returned by splice, and all other arguments are passed by value

```typescript
    //where "re" is the result of the Atlas
    ((re) =>
      // Re[3] is an array of all the petitions (functions) 
      ((s) => (r: Request) => re[3][s(r)](r))(
        // Compose a solver with the options and the Atlas
        solver(o)(re),
      ))

```
 - The optimizer uses the petition to compose unique functions that are optional without any looping, indeed, the solver does not loop (thanks to symmetry) nor uses recursion
 
Confused?

Same here, this project has more than 1,000 of research and DOE (design of experiments) in its creation, from understanding lambda calculus to checking the assembly, without counting the countless hours of testing to reach to the conclusion that it can not be significantly faster, the average overhead of Vixeny around .45% - .8% 

I must confess that there is a lot that it can be done to add more functionality, but it is time to get feedback and show what functional programming is capable of

Antony(Mimi)


## License

[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0/legalcode.txt)
