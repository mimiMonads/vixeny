# Wrap

### Union

One of the most important uses of `wrap` in Vixeny is to protect and modularize `Petitions`, especially when they are exported or modified. This ensures that your code remains organized and maintainable. Let's demonstrate this with an example involving multiple files:

First, create a file named `extension.ts`:

```ts
//file: extension.ts
export default wrap()()
  .stdPetition({
    path: "/",
    f: () => "helloWorld",
  })
```

Next, create two separate files, `a.ts` and `b.ts`, which import and utilize `extension.ts`:

```ts
import extencion from "./extension.ts"

// file: a.ts
export default wrap()()
    .union(extension.unwrap())
    .stdPetition({
    path: "/hello",
    f: () => "helloWorld"
    })
    // console logging
    // outputs: "/"
    //          "/hello"
    .logPaths()

```

```ts
import extension from "./extension.ts"

// file: b.ts
export default wrap()()
    .union(extension.unwrap())
    .stdPetition({
    path: "/api",
    f: () => "helloWorld"
    })
    // console logging
    // outputs: "/"
    //          "/api"
    .logPaths()
```
Additionally, you can add `extension` to its second curried function (`wrap()(here)`) and modify the `base`. This allows for further customization of the routing:

```ts
import extension from "./extension.ts"

export default wrap()(
    extension.union(
        // changing the start path of the wrap `extension`
        extension.changeOptions({ "startWith": "/api" })
        .unwrap(),
    ))
    .stdPetition({
        path: "/",
        f: () => "helloWorld",
    })
    // console logging
    // outputs: "/api/"
    //          "/"
    .logSize()
```
<Heading title="Introduction to wrap" size="2" />

In the `versatile` world of JavaScript, wrap plays a key role in harmonizing the language's polymorphic nature with Vixeny's functional approach. It ensures scalability and maintains code purity, crucial for efficient web development.

```ts
// name of this file: api.ts
import { wrap } from "vixeny";
//routing options
import { options } from "somewhere.ts"; 

const api = wrap({
  //setting up options
  ...options,
  startWith: "/api",
})()
//creating a petition
  .stdPetition({
    path: "/ping",
    f: () => "pong",
  })

export { api }
```

Simplifing handling diverse HTTP requests, offering a structured, side-effect-free programming environment. This makes building, maintaining, and scaling web applications more intuitive and manageable, showcasing wrap as an essential tool in the Vixeny toolkit.

```ts
import { wrap, vixeny } from "vixeny";
import { options } from "somewhere.ts"; 
import { api } from "api.ts"; 

const router = wrap(options)()
  .stdPetition({
    path: "/",
    f: () => "hello world",
  })
  //joining `api` to this wrap
  .union(api.unwrap())
  // console logging:
  // outputs: '/'
  //          '/api/ping'
  .logPaths()

// unwrapping all the petitions giving them to the router
vixeny(options)(router.unwrap())
```
<Heading title="Working with petitions" size="2" />

Let's create a Petition without wrap and export it an create new differents routes out of it.

```ts
import { Petition } from "vixeny/optimizer/types";

const surprise: Petition = {
    path: "/meow",
    headings: {
        status: 307,
        statusText: "Temporary Redirect",
        headers: {
            Location: "https://www.youtube.com/watch?v=_e9yMqmXWo0"
        }
    },
    f: (c) => ""
}

export { surprise }
```
In another file:

```ts
import { surprise }  from 'somewhere.ts'

export default wrap(options)()
  .stdPetition(surprise)
  .stdPetition({...surprise, path: '/woof'})
  .stdPetition({...surprise, path: '/woooow'})
  // console logging:
  // outputs: '/meow'
  //          '/woof'
  //          '/woooow'
  .logPaths()
```

Applies to any other key in the object.

<Heading title="Petitions types in wrap" size="2" />

 There are two type of petitions:
  - `stdPetition`: where you have to return a `BodyInt` or `Promise<BodyInt>`
  - `customPetition`: where you have to return a `Response` or `Promise<Response>`

```ts
wrap(options)()
  .stdPetition({
    path: "/",
    f: () => "hello world",
  })
  .customPetition({
    path: "/response/who/:name",
    f: (c) =>  new Response(c.param.name)
  })
```

It is important to note that `wrap` only supports these types although there are more types which serve different purposes which must be directly inserted.

```ts
vixeny(options)([
    //importing all the paths
    ...wrap(options)()
      .union(root.unwrap())
      .union(api.unwrap())
      .unwrap(),
    //adding the static server
    {
      type: "fileServer",
      path: "./public/",
      name: "/public/",
    },
    // petition without ctx
    {
      path: "/responseType",
      type: "response",
      r: () => new Response('Hello')
    }
  ])
```