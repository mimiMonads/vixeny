
# Demystifying Vixeny: Your Guide to Building Digital Experiences

Imagine Vixeny guiding you through the process of crafting your dream home, simplifying the complexities of web development into something straightforward and manageable. It employs two key concepts —`Resolve` and `Branch`— much like the essential steps in building a house, laying the foundation and then expanding upon it to add the final touches.

## Foundations First: Resolve

`Resolve` prepares your site, organizing all the essentials before construction starts. It's like getting the land ready, ensuring materials are on-site. This includes setting up data and permissions in advance, guaranteeing that when it's time to build, everything's in place.

## Adding Features: Branch

Once the basics are set, `Branch` lets you customize, adding unique features to your site. Think of it as choosing room designs or adding a garden, enhancing your home's functionality and appeal without starting over.

## Building with Intention: The Vixeny Way

Vixeny’s approach mirrors thoughtful home construction, emphasizing:

- **Reusability**: Modular design lets you replicate and adapt features easily, akin to using a beloved room design throughout your home.
- **Purity**: Ensuring operations are clean and predictable, much like choosing quality materials for your home, Vixeny keeps your project stable and reliable.
- **Testing for the Future**: Mocking tests different scenarios, preparing your site for future needs—just as planning for potential home additions or changes.


## Morphism

### Resolve and Branch

Now, let's talk more about the Optimizer in Vixeny; after identifying all necessary functions, orchestrates the composition of petitions. This process intricately weaves together all resolves and branches, both of which are considered types of morphisms. Interestingly, a petition in itself is conceptualized as a morphism. This highlights the functional and compositional core of Vixeny, where both resolves and branches play pivotal roles:

## Resolve

- **Definition**: In any morphism, a `resolve` guarantees its resolution prior to the execution of the petition's main function (`f`).

  ```ts
  wrap(options)()
    .stdPetition({
      path: "/withResolve",
      resolve: {
        // The key name here can be any string
        hi: { c: () => "Hello world" }
      },
      // This petition consistently outputs "Hello world"
      f: (c) => c.resolve.hi,
    })
  ```

- **Asynchronous Functions**: Asynchronous resolves maintain the state of the morphism, meaning the asynchronous result is merged without altering the original state.

  ```ts
  wrap()()
    .stdPetition({
      path: "/withResolveAsync",
      resolve: {
        hi: { async c: () => await Promise.resolve("Hello world") }
      },
      // Note: The function in `f` is synchronous
      f: (c) => c.resolve.hi,
    })
  ```

- **Execution Order**: All resolves are executed and completed prior to their integration into the `CTX`, ensuring their resolved outputs are accessible within the `CTX` for the petition's logic.

  ```ts
  wrap(options)()
    .stdPetition({
      path: "/helloWorld",
      resolve: {
        hello: { async f: () => await Promise.resolve("Hello") }, 
        world: { f: () => 'world' }
      },
      f: c => `${c.resolve.hello} ${c.resolve.world}`,
    })
  ```

- **Uniqueness of `CTX`**: With the exception of `mutable`, each `CTX` instance remains unique and isolated, ensuring petitions remain decoupled.

  ```ts
  wrap(options)()
  .stdPetition({
    path: "/date",
    resolve: {
      date: morphism(o)({ f : c => c.date })
    },
    f: c => c.resolve.date !== c.date
        ? 'Always true'
        : 'Unreachable'
  })
  ```

- **Nested Resolves and Branches**: Vixeny supports an unlimited nesting of resolves and branches within each other.

  ```ts
  const hello = morphism(options)({
    resolve: {
      nestedHello: {
        f: () => "hello world"
      },
    },
    f: (c) => c.resolve.nestedHello,
  });

  wrap(options)()
    .stdPetition({
      path: "/hello",
      resolve: {
        hello: hello
      },
      f: (c) => c.resolve.hello,
    })
  ```

In Vixeny, `f` stands for `functor`, because: `functor preserve structure`. This concept underscores how resolves and the main function interact while maintaining the integrity of the petition's structure.


### Branch

In Vixeny, a `Branch` is used to incorporate additional logic or operations within the execution of a petition,which has its own `CTX`. Branches, like resolves, are morphisms but are specifically designed to execute alongside or within the main function (`f`) of a petition, offering a direct way to extend functionality without cluttering the primary logic.


### 1. Defining a Simple Branch

A branch can be as simple as a function that returns a static message. This example demonstrates how to define and use a simple branch within a petition:

```ts
const helloBranch = morphism(options)({
  f: (c) => "Hello from branch",
});

wrap(options)()
  .stdPetition({
    path: "/helloBranch",
    branch: {
      hello: helloBranch,
    },
    f: (c) => new Response(c.branch.hello(null)),
  })
```

- **Explanation**: Here, `helloBranch` is defined as a morphism with a function (`f`) that returns a static string. Within the petition, this branch is invoked, and its return value is used to construct a response.

### 2. Branch with Parameters

Branches can also accept parameters, making them dynamic in their operation. This example illustrates a branch that utilizes parameters from the `CTX`:

```ts
const greetUserBranch = morphism()({
  f: (c) => `Hello, ${c.arguments.name}`,
});

wrap(options)()
  .stdPetition({
    path: "/greet/:name",
    branch: {
      greetUser: greetUserBranch,
    },
    f: (c) => new Response(c.branch.greetUser({ name: c.param.name })),
  })
```

- **Explanation**: `greetUserBranch` takes a name parameter through `c.arguments` and returns a personalized greeting. The branch is executed in the petition's main function, using the name parameter extracted from the URL.

### 3. Asynchronous Branch

Branches can perform asynchronous operations, such as fetching data from a database or an external API:

```ts
const fetchUserDataBranch = morphism(options)({
  async f: (c) => {
    const userId = c.arguments.userId;
    return await fetch(`https://api.example.com/users/${userId}`).then(res => res.json());
  },
});

wrap(options)()
  .stdPetition({
    path: "/user/:userId",
    branch: {
      fetchUserData: fetchUserDataBranch,
    },
    f: async (c) => {
      const userData = await c.branch.fetchUserData({ userId: c.param.userId });
      return new Response(JSON.stringify(userData));
    },
  })
```

### Explaining `Mutable` in Context


- **Mutability Concept**: In this scenario, `Mutable` refers to the ability of the context (`c`) to have its state changed and those changes preserved across subsequent transformations or operations.

- **Implementation with `mutStdPetition`**: By using `mutStdPetition`, adds the key `mutable` which persistent. This allows subsequent operations or morphisms to access and further modify the updated state. Specifically, any property added to `c.mutable` becomes a preserved state that can be referenced or altered in later stages of processing.

### Practical Example

```ts
// Initial operation with mutStdPetition, introducing a mutable context
.mutStdPetition({
  // Configuration and initial transformation
  resolve: {
    // Use morphism to modify and use the mutable state
    randomNumber: morphism(options)({ f : c => 
    { 
      c.mutable.randomNumber = c.randomNumber; 
      return c.randomNumber; 
      } 
    )
  },
  // Subsequent operation accessing and evaluating the mutable state
  f: c => c.mutable.randomNumber !== c.randomNumber
      ? 'Condition based on mutable state'
      : 'Potentially reachable if state matches'
})
```

In this example, `c.mutable.randomNumber` is set in one operation, and this state is then available for comparison in the next operation. This demonstrates how `Mutable` allows for complex, state-dependent logic to be implemented across a sequence of morphisms, leveraging the state preserved in `c.mutable`.

It's important to notice that `mutStdPetition` and `stdPetition` are composed differently and a pure state like `stdPetition` is totally independent of `mutStdPetition`




### Purpose of morphism

`morphism` functions are designed to facilitate explicit data transformation in a type-safe manner, especially useful in scenarios where TypeScript's type inference capabilities are stretched thin by deep nesting or complex operations. By breaking down transformations into manageable, clearly defined steps, `morphism` ensures that each operation is both comprehensible and type-safe.

### TypeScript's Typing Limitation

TypeScript's type system, while robust, cannot always effectively manage or infer types in deeply nested or highly complex transformations. This limitation can lead to challenges in enforcing type safety, particularly in applications that require detailed manipulation of nested data structures.


### Practical Application

To explain the provided code snippets effectively, let's break down the concept of morphisms as used here, especially 


#### Hello Morphism

The first morphism, `hello`, is defined to perform no direct transformation but specifies a nested `resolve` structure with a static value and a function that returns a string "hello". The final function `f` extracts the `nested` part of the resolved structure.

```ts
const hello = morphism(options)({
  resolve: {
    //resolves first
    nested: {
      crypto: {
        globalKey: 'your secret'
      },
      f: () => "hello",
    },
  },
  // showing inference from a nested resolve
  f: (f) => f.resolve.nested,
});
```

#### NestedHello Morphism

The `nestedHello` morphism wraps the `hello` morphism within its `resolve`, showing how morphisms can be nested or chained to build upon the results of previous transformations.

```ts
const nestedHello = morphism(options)({
  resolve: {
    hello: hello,
  },
  // showing inference from a nested resolve
  f: (f) => f.resolve.hello,
});
```

#### isValidUser Morphism

This morphism validates a JWT token by checking if it exists and if its `iat` (issued at time) is before the current time. It showcases how to perform conditional checks within a morphism.

```ts
const isValidUser = morphism(options)({
  crypto: {
    globalKey: 'your secret',
    token: {
      jwtToken: {},
    },
  },
  f: c => c.token.jwtToken && (c.token.jwtToken as {name:string,iat:number}).iat < Date.now()
    ? c.token.jwtToken
    : null
});
```

#### Please Morphism

Finally, the `check` morphism demonstrates how to resolve dependencies using previous morphisms (`isValidUser`) and process the result further.

```ts
const please = morphism(options)({
  resolve: {
    check: isValidUser
  },
  f: c => c.resolve.check !== null 
    ? 'Valid token'
    : 'Invalid token'
});
```

### Key Concepts

- **Branching and Resolving**: These operations allow for the construction of complex data transformation pipelines. Branching can be seen as defining various paths of data flow and logic, while resolving handles the actual execution of these paths to produce a final outcome.
- **Modularity**: Morphisms can be nested and reused, promoting modularity and reuse of logic.
- **Declarative Logic**: The structure allows for a clear, declarative definition of data transformations and conditions, improving readability and maintainability.
