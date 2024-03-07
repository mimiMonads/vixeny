# Introduction: 

/// talk about vixeny in general

## Bateries included:
Templates for :
- Pug
- Ejs
- Jsx
- Tsx
- Sass
- PostCSS
- Remaker
 and more ...

## Testability end-to-end 

Check anything at any state

```ts
const router = routes.testRequests();

test("Checking in `/`"  , async () => {
  expect(
    await router(new Request(serverName))
      .then((res) => res.status),
  ).toStrictEqual(200);
});

```
## Reusable

Make your own life cycle with `resolve`

```ts
import { isValidUser } from "../resolve.ts"

export default wrap()()
  .stdPetition({
    path: "/api/path1",
    resolve:{
        user: isValidUser // <--
    }
    f: (c) => c.resolve.user 
        ? "Hello: " + c.resolve.user.name
        : "notFound",
  })
  .stdPetition({
    path: "/api/path1",
    resolve:{
        user: isValidUser // <--
    }
    f: (c) => c.resolve.user 
        ? "Hello: " + c.resolve.user.name
        : "notFound",
  })

```

## Clean an easy to transport

Zero side effets

```ts
import api from './api.ts'

const main = wrap(o)()
  .stdPetition({
    path: "/",
    headings: {
      headers: ".html",
    },
    f: () => "hello world",
  })
  .stdPetition({
    path: "/get/:id",
    param: {
      unique: true,
    },
    f: (c) => c.param,
  });


composeResponse()(
    main.union(
        api.unwrap()
    ).unwrap()
);
```

## Pure

```ts
wrap(o)()
  .stdPetition({
    path: "/date",
    resolve: {
      date: {
        f: (c) => c.date,
      },
    },
    f: (c) => c.resolve.date !== c.date 
        ? "Always true" 
        : "Unreachable",
  })
```