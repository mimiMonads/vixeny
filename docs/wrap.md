<head>
    <link rel="stylesheet" href="/css/prism.css">
    <link rel="stylesheet" href="/css/main.css">
    <script src="/mjs/docs.mjs" type="module"></script>
</head>
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
    .logPaths()
```

### Optimizer

In Vixeny, the `optimizer` is a crucial function that oversees the `CTX` in `f`, composes the petition, chains `resolve` and `branch`, and efficiently handles all asynchronous and synchronous functions. But what does this mean? Let's first explore the `CTX`, which in TypeScript shows you all the native functions (including plugins, which are not included here):

 - `"req"`: Gives access to the `Request`.
 - `"query"`: Retrieves the query parameters.
 - `"param"`: Fetches the URL parameters.
 - `"date"`: Returns the current date.
 - `"randomNumber"`: Generates a random number from 0 to 1.
 - `"hash"`: Produces a random hash (string).
 - `"cookie"`: Accesses cookies.
 - `"resolve"`: Resolves any `morpishim` before the execution of the current `CTX`.
 - `"branch"`: A function within `CTX` that is also a `morpishim` and it has its own `CTX`.
 - `"mutable"`: Adds a fixed point to all `morpishim` in the `petition`, regardless of depth.
 - `"arguments"`: Arguments passed to `branch`.
 - `"token"`: (requires `crypto`) Checks and parses a cookie with the given key.
 - `"sign"`: (requires `crypto`) Signs a JSON.
 - `"verify"`: (requires `crypto`) Verifies and parses a string.

However, none of these are actually included in the `CTX` by default. The `Optimizer` analyzes (tokenizes `f` and checks for the keys used) your petition and adds only what's required. If there's nothing required, it simply handles the `Request`.

```ts
export default wrap()()
  .stdPetition({
    path: "/",
    f: () => "helloWorld",
  })
    // console logging
    // outputs: []
  .logLastCheck()
  .stdPetition({
    path: "/hello/:id",
    f: c => c.param.id,
  })
    // console logging
    // outputs: ["param"]
  .logLastCheck()
```

There are some limitations to this, for example, the optimizer cannot understand what functions outside of the context need, but you can manually add them:

```ts
export default wrap()()
  .stdPetition({
    path: "/hello/query1",
    f: c => functionOutsideOfContext(c),
  })
    // console logging
    // outputs: []
  .logLastCheck()
  .stdPetition({
    path: "/hello/query2",
    f: c => functionOutsideOfContext(c),
    options:{
      add: ['query']
    }
  })
    // console logging
    // outputs: ["query"]
  .logLastCheck()
```

You have three options for customization:
- `only`: Bypasses the optimizer, adding only the requested functions.
- `add`: Adds specified functions to the list.
- `remove`: Removes a function if it is added but not required, which could happen but is harmless to the `CTX`.