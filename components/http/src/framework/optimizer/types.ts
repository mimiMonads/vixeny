import { CyclePluginMap, FunRouterOptions } from "../../../types.ts";
import { ParamsMethod } from "../builder/types.ts";

// Modified ExtractPluginTypes
type ExtractPluginTypes<O extends FunRouterOptions> = O["cyclePlugin"] extends
  CyclePluginMap ? {
    [K in keyof O["cyclePlugin"]]?: O["cyclePlugin"][K] extends
      { type: infer T } ? T : never;
  }
  : {};

export type Morphism<
  ResMap extends MorphismMap = MorphismMap,
  BraMap extends AnyMorphismMap = AnyMorphismMap,
  Query extends QueryOptions = QueryOptions,
  Param extends ParamOptions = ParamOptions,
  Options extends FunRouterOptions = FunRouterOptions,
  Crypto extends CryptoOptions = CryptoOptions,
  Mut extends MutableKey = MutableKey,
  Return = any,
> = {
  resolve?: ResMap;
  branch?: BraMap;
  f: (
    ctx: WithPlugins<ResMap, BraMap, Query, Param, Options, Crypto, {}>,
  ) => Return;
  query?: Query;
  param?: Param;
  options?: PetitionOptions<
    [Extract<keyof Options["cyclePlugin"], string>],
    Crypto
  >;
  plugins?: ExtractPluginTypes<Options>;
  readonly crypto?: Crypto;
  mutable?: Mut;
  isAsync?: true;
};

type CryptoContext<CR extends CryptoOptions> = CR extends
  { globalKey: any; token: infer Token } ? Token extends Record<string, any> ? {
      token: { [K in keyof Token]: Record<string, unknown> };
    } & SignerAndVarifier
  : {
    sign: any;
    verify: any;
    token: any;
  }
  : CR extends { globalKey: any } ? {
      token: Record<string, Record<string, unknown> | null>;
    } & SignerAndVarifier
  : {
    sign: any;
    verify: any;
    token: any;
  };

type SignerAndVarifier = {
  verify: (s: string) => Record<string, unknown> | null;
  sign: (key: Record<string, unknown>) => string;
};

export type CryptoOptions = {
  globalKey: SupportedKeys;
  token?: {
    only?: {
      [key: string]: {};
    };
  };
} | {};

export type AnyMorphism<
  ResMap extends MorphismMap = MorphismMap,
  BraMap extends AnyMorphismMap = AnyMorphismMap,
  Query extends QueryOptions = QueryOptions,
  Param extends ParamOptions = ParamOptions,
  Options extends FunRouterOptions = FunRouterOptions,
  Crypto extends CryptoOptions = CryptoOptions,
  Mut extends MutableKey = MutableKey,
  Return = any,
> = Omit<Morphism<ResMap, BraMap, Query, Param, Options, Crypto, Mut>, "f"> & {
  f: (
    ctx: WithPlugins<ResMap, BraMap, Query, Param, Options, Crypto, {}>,
  ) => Return;
};
export type MorphismMap = {
  [key: string]: Morphism<any, any, any, any, any, any, any, any>;
};
export type AnyMorphismMap = {
  [key: string]: AnyMorphism<any, any, any, any, any, any, any, any>;
};

type CyclePlugingFunctions<CPM extends CyclePluginMap> = {
  [K in keyof CPM]: CPM[K] extends
    { isFunction: boolean; f: (...args: any) => any }
    ? ReturnType<ReturnType<CPM[K]["f"]>> // Direct function case
    : CPM[K] extends { f: (...args: any) => any }
      ? Awaited<ReturnType<ReturnType<ReturnType<CPM[K]["f"]>>>> // Nested function case
    : never; // Handle cases that do not match expected structure
};

type specialElements = {
  readonly hasHeaders?: true;
} | {};

type WithPlugins<
  R extends MorphismMap,
  B extends AnyMorphismMap,
  QS extends QueryOptions,
  PA extends ParamOptions,
  O extends FunRouterOptions,
  CR extends CryptoOptions,
  UNI extends specialElements,
> =
  & Ctx<R, B, QS, PA, O, CR, { hasHeaders: true }>
  & (O extends { cyclePlugin: infer CPM } ? [keyof CPM] extends [never] ? {}
    : CPM extends CyclePluginMap ? CyclePlugingFunctions<CPM>
    : never
    : {})
  & CryptoContext<CR>;

export interface Ctx<
  R extends MorphismMap,
  B extends AnyMorphismMap,
  QS extends QueryOptions,
  PA extends ParamOptions,
  O extends FunRouterOptions,
  CR extends CryptoOptions,
  UNI extends specialElements,
> {
  /**
   * The `resolve` property is integral to ensuring that all necessary data is fetched or calculations are performed before the main function (`f`) of a morphism is executed. It consists of a map where each key corresponds to a resolve function that is executed prior to `f`. The results of these resolves are then made available in the `CTX` for use in the main function.
   *
   * **Key Features**:
   * - Ensures data dependencies are resolved beforehand.
   * - Supports both synchronous and asynchronous operations.
   * - Maintains the original state, allowing for clean and predictable code execution.
   * - Executes all resolves before integrating their outputs into the `CTX`.
   * - Supports an unlimited nesting of resolves and branches (using morphism), providing a flexible structure for complex data handling.
   *
   * **Examples**:
   * ---
   * Basic usage with synchronous data fetching:
   * ```js
   * wrap(options)()
   *   .stdPetition({
   *     path: "/withResolve",
   *     resolve: {
   *       hi: { f: () => "Hello world" },
   *     },
   *     f: (ctx) => ctx.resolve.hi,
   *   });
   * ```
   * ---
   * Incorporating asynchronous functions:
   * ```js
   * wrap()()
   *   .stdPetition({
   *     path: "/withResolveAsync",
   *     resolve: {
   *       hi: { async f: () => await Promise.resolve("Hello world") }
   *     },
   *     f: (ctx) => ctx.resolve.hi,
   *   })
   * ```
   * ---
   * Execution order and integration into `CTX`:
   * ```js
   * wrap(options)()
   *   .stdPetition({
   *     path: "/helloWorld",
   *     resolve: {
   *       hello: { async f: () => await Promise.resolve("Hello") },
   *       world: { f: () => 'world' }
   *     },
   *     f: ctx => `${ctx.resolve.hello} ${ctx.resolve.world}`,
   *   })
   * ```
   * ---
   *  Using `morphism` with `resolve`:
   *
   * Suppose you need to fetch user data and perform some preprocessing on it before responding to a request. You can define a `morphism` for fetching and preprocessing the data, and then use it within the `resolve` to ensure the data is ready by the time you need to use it in `f`.
   *
   * ```js
   * // Define a morphism for fetching and preprocessing user data
   * const fetchAndProcessUserData = morphism({
   *   resolve: {
   *     userData: {
   *       f: async (c) => {
   *         // Imagine fetching user data asynchronously
   *         const userData = await fetchUserData(c.param.userId);
   *         // Preprocess the fetched data
   *         const processedData = processData(userData);
   *         return processedData;
   *       }
   *     }
   *   },
   *   f: (c) => c.resolve.userData, // This function simply returns the processed user data
   * });
   *
   * // Use the above morphism in a petition
   * wrap()()
   *   .stdPetition({
   *     path: "/user/:userId",
   *     resolve: {
   *       // Utilize the morphism to fetch and preprocess user data before executing the main function
   *       processedUserData: fetchAndProcessUserData,
   *     },
   *     f: (c) => {
   *       // Access the resolved and processed user data directly in the main function
   *       const userData = c.resolve.processedUserData;
   *       // Use the processed user data to construct the response
   *       return new Response(JSON.stringify(userData));
   *     }
   *   });
   * ```
   */
  resolve: { [V in keyof R]: Awaited<ReturnType<R[V]["f"]>> };
  /**
   * The `branch` property allows for additional logic or operations to be executed alongside or within the main function (`f`) of a petition. Each key within the `branch` object maps to a branch function, executed with its context. The results of these branches are then accessible under the `branch` property of the `CTX`, complementing the main logic without overcrowding it.
   *
   * **Key Features**:
   * - Enables the execution of side operations or additional logic in parallel to the main function.
   * - Each branch operates with its own context, allowing for independent execution.
   * - Supports dynamic operations with parameters and asynchronous actions, enhancing flexibility.
   *
   * **Examples**:
   * ---
   * Defining a simple branch:
   * ```typescript
   * const helloBranch = morphism(options)({
   *   f: (ctx) => "Hello from branch",
   * });
   *
   * wrap(options)()
   *   .stdPetition({
   *     path: "/helloBranch",
   *     branch: {
   *       hello: helloBranch,
   *     },
   *     f: (ctx) => new Response(ctx.branch.hello(null)),
   *   });
   * ```
   * ---
   * Branch with parameters:
   * ```typescript
   * const greetUserBranch = morphism()({
   *   f: (ctx) => `Hello, ${ctc.arguments.name}`,
   * });
   *
   * wrap(options)()
   *   .stdPetition({
   *     path: "/greet/:name",
   *     branch: {
   *       greetUser: greetUserBranch,
   *     },
   *     f: (ctx) => new Response(c.branch.greetUser({ name: ctx.param.name })),
   *   });
   * ```
   * ---
   * Asynchronous branch example:
   * ```js
   * const fetchUserDataBranch = morphism(options)({
   *   async f: (ctx) => {
   *     const userId = ctc.arguments.userId;
   *     return await fetch(`https://api.example.com/users/${userId}`).then(res => res.json());
   *   },
   * });
   *
   * wrap(options)()
   *   .stdPetition({
   *     path: "/user/:userId",
   *     branch: {
   *       fetchUserData: fetchUserDataBranch,
   *     },
   *     f: async (ctx) => {
   *       const userData = await ctx.branch.fetchUserData({ userId: ctx.param.userId });
   *       return new Response(JSON.stringify(userData));
   *     },
   *   })
   * ```
   */
  branch: {
    [V in keyof B]: {
      (ctx: any): ReturnType<B[V]["f"]>;
    };
  };

  /**
   * Adds with query to the `context`
   *
   * ---
   * ```ts
   * {
   *  path: "/path",
   *  f: async ctx => await ctx.req.blob()
   * }
   * ---
   * {
   *   path: '/path',
   *   options: {add: ["req"]},
   *   f: ctx => outOfContext(ctx)
   * };
   * ```
   */
  req: Request;
  /**
   * `query`: Facilitates access to URL query parameters within the petition's execution context.
   *
   * **Examples**:
   *
   * Accessing a simple query parameter:
   * ```typescript
   * {
   *   path: '/query',
   *   f: ctx => ctx.query.name ?? "NotFound"
   * };
   * ```
   * In this scenario, `ctx.query.name` directly accesses the `name` query parameter from the URL.
   *
   * ---
   *
   * Using query parameters with optimization for unique queries:
   * ```typescript
   * .stdPetition({
   *   path: "/query",
   *   query: {
   *     unique: true,
   *     name: "hello"
   *   },
   *   f: ctx => ctx.query ?? "NotFound"
   * })
   * ```
   */
  query: QS extends { unique: true } ? (string | null)
    : { [key: string]: string };

  /**
   * `param`: Enables the extraction of URL path parameters within the petition's execution context. This feature simplifies accessing dynamic segments of the URL path, allowing petitions to respond to varied requests efficiently.
   *
   * **Examples**:
   *
   * Accessing a path parameter:
   * ```typescript
   * {
   *   path: '/user/:userId',
   *   f: ctx => `User ID: ${ctx.param.userId}`
   * };
   * ```
   * In this example, `ctx.param.userId` retrieves the `userId` path parameter, enabling dynamic response content based on the URL.
   *
   * ---
   *
   * Using path parameters with optimization for unique paths:
   * ```typescript
   * .stdPetition({
   *   path: "/user/:userId",
   *   param: {
   *     unique: true
   *   },
   *   f: ctx => `User ID: ${ctx.param}`
   * })
   * ```
   * Here, setting `unique: true` within the `param` configuration optimizes retrieval for a scenario where only one path parameter is expected, allowing direct access to the parameter value as `ctx.param`.
   */
  param: PA extends { unique: true } ? string : Record<string, string>;
  /**
   * `headers`: Provides access to HTTP request headers within the petition's execution.
   *
   * **Examples**:
   *
   * Accessing request headers:
   * ```typescript
   * export const root = wrap({
   *   cors: {
   *     'maxAge': 14556156
   *   },
   * })()
   *   .customPetition({
   *     path: "/getHeaders",
   *     f: c => new Response(
   *       null, {
   *         headers: c.headers
   *       }
   *     )
   *   });
   *
   * const handles = root.handleRequest("/getHeaders")({});
   *
   * console.log(
   *   await handles(
   *     new Request("http://localhost/getHeaders")
   *   )
   * );
   * ```
   */
  headers: UNI extends {
    readonly hasHeaders: true;
  } ? Record<string, string>
    : null;

  /**
   * Adds a Date.now() returning the number of milliseconds elapsed since the epoch.
   *
   * ```ts
   * {
   *    path: "/path"
   *    f: ctx =>  ctx.date > Date.now()
   *      ? "unreachable"
   *      : "date is created before ctx is passed to f"
   * }
   * ```
   * ---
   * This behavior can be set for testing purpose
   * ```ts
   * {
   *    path: "/",
   *    options:{
   *      setDate: 1694246953189
   *    },
   *    f: ctx => ctx.date === 1694246953189
   *       ? "Date is bind to a state"
   *       : "unreachable"
   * }
   * ```
   */
  date: number;
  randomNumber: number;
  /**
   * Generates a unique ID using `crypto.randomUUID()`.
   *
   * ```ts
   * {
   *    path: "/path",
   *    f: ctx => ctx.hash === "some-random-uuid"
   *      ? "ID matches expected value"
   *      : "Generated a unique ID"
   * }
   * ```
   * ---
   * This behavior can be set for testing purposes:
   * ```ts
   * {
   *    path: "/",
   *    options:{
   *      setHash: "specified-uuid-value"
   *    },
   *    f: ctx => ctx.hash === "specified-uuid-value"
   *       ? "UUID is bind to a state"
   *       : "unreachable"
   * }
   * ```
   */
  hash: string;
  /**
   * Retrieves cookies sent with the request using `ctx.cookie`.
   *
   * ---
   * ```ts
   * {
   *   path: '/path',
   *   f: ctx => ctx.cookie?.sessionID
   * };
   * // If the `ctx` goes out of context
   * {
   *   path: '/path',
   *   options: {add: ["cookie"]},
   *   f: ctx => outOfContext(ctx)
   * };
   * ```
   */
  cookie: null | { [key: string]: string | undefined };

  /**
   * `mutable`: A property designed to facilitate state mutation within the execution context of a petition. It enables the dynamic alteration of state across different parts of your application's flow, allowing for sophisticated state management strategies and interactions.
   *
   * **Caution**: Mutable state should be handled with care to prevent unintended side effects. It's recommended to use this feature judiciously, ensuring that state mutations are predictable and well-understood within your application's context.
   *
   * **Key Concept**:
   * - All morphisms composing a petition can share and mutate this state, providing a powerful mechanism for stateful logic and data management.
   * - This shared mutable state can be particularly useful for maintaining state across asynchronous operations, user authentication status, or other complex interaction patterns within a petition.
   *
   * **Example Usage**:
   * ```js
   * {
   *     path: '/',
   *     resolve: {
   *       // Define a resolve function that mutates state within `mutable`
   *       world: morphism()({
   *         f: c => {
   *           c.mutable.hello = "hello "; // Mutating state
   *           return 'world';
   *         }
   *       })
   *     },
   *     // The main function leverages the mutated state for constructing the response
   *     f: c => new Response(c.mutable.hello + c.resolve.world) // Accessing mutated state
   * }
   * ```
   * **Note**: The structure and usage of `mutable` enable developers to architect complex and dynamic data flows within their Vixeny applications, offering flexibility in handling stateful operations.
   */
  mutable: {
    [keys: string]: any;
  };

  /**
   * Interacts with the `arguments` property in `ctx.branch` to receive input for branch functions.
   *
   * ---
   * ```ts
   * {
   *   path: '/path',
   *   f: ctx => ctx.branch.hello("Greetings!"),
   *   branch: {
   *     hello: {
   *     f: c => c.arguments
   *    }
   *   }
   * };
   * ```
   *
   * ---
   *
   * When invoking a branch function, any parameters passed are accessible as `arguments` within the branch function.
   *
   * ```ts
   * {
   *   path: '/multipleArgs',
   *   f: ctx => ctx.branch.greet("Hello", "world!"),
   *   branch: {
   *     greet: {
   *     f: c => `${c.arguments[0]} ${c.arguments[1]}`
   *    }
   *   }
   * };
   * ```
   * In this example, multiple arguments are passed to the branch function, and they're accessed via index in the branch.
   */
  arguments: unknown;
}

export type CommonRequestMorphism<
  ResMap extends MorphismMap = MorphismMap,
  BraMap extends AnyMorphismMap = AnyMorphismMap,
  Query extends QueryOptions = QueryOptions,
  Param extends ParamOptions = ParamOptions,
  Options extends FunRouterOptions = FunRouterOptions,
  Crypto extends CryptoOptions = CryptoOptions,
  Mut extends MutableKey = MutableKey,
  _Return = any,
> =
  & Omit<Morphism<ResMap, BraMap, Query, Param, Options, Crypto, Mut>, "f">
  & RawCommonRequest
  & {
    headings?: PetitionHeader;
    f: (
      ctx: WithPlugins<ResMap, BraMap, Query, Param, Options, Crypto, {}>,
    ) => BodyInit | Promise<BodyInit>;
  };

export type RequestMorphism<
  ResMap extends MorphismMap = MorphismMap,
  BraMap extends AnyMorphismMap = AnyMorphismMap,
  Query extends QueryOptions = QueryOptions,
  Param extends ParamOptions = ParamOptions,
  Options extends FunRouterOptions = FunRouterOptions,
  Crypto extends CryptoOptions = CryptoOptions,
  Mut extends MutableKey = MutableKey,
  _Return = any,
> =
  & Omit<Morphism<ResMap, BraMap, Query, Param, Options, Crypto, Mut>, "f">
  & ObjectRawCommonRequest
  & {
    f: (
      ctx: WithPlugins<
        ResMap,
        BraMap,
        Query,
        Param,
        Options,
        Crypto,
        { hasHeaders: true }
      >,
    ) => Response | Promise<Response>;
  };

export type BodyNull = {
  [propName: string]: any;
} | null;
export type ObjectAndNullMorphism<
  ResMap extends MorphismMap = MorphismMap,
  BraMap extends AnyMorphismMap = AnyMorphismMap,
  Query extends QueryOptions = QueryOptions,
  Param extends ParamOptions = ParamOptions,
  Options extends FunRouterOptions = FunRouterOptions,
  Crypto extends CryptoOptions = CryptoOptions,
  Mut extends MutableKey = MutableKey,
  _Return = any,
> =
  & Omit<Morphism<ResMap, BraMap, Query, Param, Options, Crypto, Mut>, "f">
  & {
    f: (
      ctx: WithPlugins<
        ResMap,
        BraMap,
        Query,
        Param,
        Options,
        Crypto,
        { hasHeaders: true }
      >,
    ) => Promise<BodyNull> | BodyNull;
  };

export type ObjectaAnyMorphism<
  ResMap extends MorphismMap = MorphismMap,
  BraMap extends AnyMorphismMap = AnyMorphismMap,
  Query extends QueryOptions = QueryOptions,
  Param extends ParamOptions = ParamOptions,
  Options extends FunRouterOptions = FunRouterOptions,
  Crypto extends CryptoOptions = CryptoOptions,
  Mut extends MutableKey = MutableKey,
  T = any, // Add generic type parameter T here
> =
  & Omit<Morphism<ResMap, BraMap, Query, Param, Options, Crypto, Mut>, "f">
  & {
    f: (
      ctx: WithPlugins<
        ResMap,
        BraMap,
        Query,
        Param,
        Options,
        Crypto,
        { hasHeaders: true }
      >,
    ) => T;
  };

export type Petition =
  | RequestMorphism
  | CommonRequestMorphism
  | ObjectRawResponseReturn
  | ObjectRawResponseStatic;

/**
 * Object for raw response return.
 */
export type ObjectRawResponseReturn = {
  /**
   *  Direct interaction with Request and Response.
   *
   * ---
   * ```ts
   * {
   *    path: "/response/hello",
   *    type: "response",
   *    r: r => new Response("Hello world!")
   * }
   * ```
   */
  type: "response";
  /**
   * `r` requires a functions which arguments contains the `Request` and need to return a `Response` or a `Promise<Response>`
   * ---
   *
   * ```ts
   * {
   *    path: "/path",
   *    r: () => new Response("hi")
   *
   * }
   *
   * ```
   */
  r: (r: Request) => Response | Promise<Response>;
  method?: ParamsMethod;
} & PathKey;

/**
 * Object for raw common request.
 */
export type ObjectRawCommonRequest =
  & {
    /**
     * Route Method
     */
    method?: ParamsMethod;
    /**
     * Returns `Response` for custom statuses.
     *
     * ---
     * ```ts
     * {
     *   path: "/response/who/:name",
     *   type: "request",
     *   f: context =>
     *      context.param.name === "Bun"
     *        ? new Response("Welcome")
     *        : new Response("Only devs", {status: 400})
     *  }
     * ```
     */
    type: "request";
  }
  & RawCommonRequest;

/**
 * Common raw request object.
 */
export type RawCommonRequest = {
  /**
   * Route Method
   */
  method?: ParamsMethod;
} & PathKey;

type ExtendedAddOption<CR extends CryptoOptions> = "globalKey" extends keyof CR
  ? AddOption | "token" | "sign" | "verify"
  : AddOption;

/**
 * Options for the petition.
 */
export type PetitionOptions<
  T extends string[],
  CR extends CryptoOptions,
> = {
  add?: Array<ExtendedAddOption<CR> | T[number]>;
  debug?: DebugOptions;
  remove?: Array<ExtendedAddOption<CR> | T[number]>;
  only?: Array<ExtendedAddOption<CR> | T[number]>;
  setHash?: string;
  setRandomNumber?: number;
  setDate?: number;
};

/**
 * List of options for adding.
 */
export type AddOptions = AddOption[];

/**
 * Options for adding.
 */
export type AddOption =
  | "req"
  | "query"
  | "param"
  | "date"
  | "randomNumber"
  | "hash"
  | "cookie"
  | "resolve"
  | "mutable"
  | "branch"
  | "arguments"
  | "headers";

export type PathKey = {
  /**
   * Represents the endpoint path for a Vixeny petition.
   *
   * Remember that it have to start with `/`
   *
   * A "Hello World" example on `"/"`:
   * ```ts
   * {
   *  path: "/",
   *  f: () => "hello world",
   * }
   * ```
   *
   * Alongside other configurations, this path determines how the server responds to specific endpoints.
   */
  path: string;
};

/**
 * Options for debugging.
 */
export type DebugOptions = {
  type: "list";
  name: string;
};

export type MutableKey = {
  mutable?: {
    readonly is: true;
  };
} | {};

/**
 * Headers for the petition.
 */
export type PetitionHeader = {
  /**
   * The headers initialization.
   */
  headers?: HeadersInit | defaultMime;
  /**
   * The status text.
   */
  statusText?: string;
  /**
   * The status number.
   */
  status?: number;
};

export type QueryOptions = {
  unique?: true;
  name: string; // 'unique' is an optional boolean
} | {
  only?: string[];
} | {};

export type ParamOptions = {
  readonly unique?: true; // 'unique' is an optional boolean
} | {};

type StaticFilePlugin = {
  checker: (path: string) => boolean;
  r: (options: {
    root: string;
    path: string;
    relativeName: string;
  }) => ObjectRawResponseReturn;
};

/**
 * Object for raw response static.
 */
export type ObjectRawResponseStatic =
  & ({
    type: "fileServer";
    name: string;
    path: string;
  } | {
    type: "fileServer";
    name: string;
    path: string;
    mime?: true;
    extra: [string, string][];
  } | {
    type: "fileServer";
    name: string;
    path: string;
    mime: false;
  })
  & {
    template?: StaticFilePlugin[];
    removeExtensionOf?: defaultMime[];
    slashIs?: string;
  };

export type SupportedKeys =
  | string
  | Uint8Array
  | Uint8ClampedArray
  | Uint16Array
  | Uint32Array
  | Int8Array
  | Int16Array
  | Int32Array
  | BigUint64Array
  | BigInt64Array
  | Float32Array
  | Float64Array;

export type defaultMime =
  | ".aac"
  | ".abw"
  | ".arc"
  | ".avif"
  | ".avi"
  | ".azw"
  | ".azw"
  | ".bmp"
  | ".bz"
  | ".bz2"
  | ".cda"
  | ".csh"
  | ".css"
  | ".csv"
  | ".doc"
  | ".docx"
  | ".eot"
  | ".epub"
  | ".gz"
  | ".gif"
  | ".htm"
  | ".html"
  | ".ico"
  | ".ics"
  | ".jar"
  | ".jpeg"
  | ".js"
  | ".json"
  | ".jsonld"
  | ".mid"
  | ".mjs"
  | ".mp3"
  | ".mp4"
  | ".mpeg"
  | ".mpkg"
  | ".odp"
  | ".ods"
  | ".odt"
  | ".oga"
  | ".ogv"
  | ".ogx"
  | ".opus"
  | ".otf"
  | ".png"
  | ".pdf"
  | ".php"
  | ".ppt"
  | ".pptx"
  | ".rar"
  | ".rtf"
  | ".sh"
  | ".svg"
  | ".tar"
  | ".tif"
  | ".tiff"
  | ".ts"
  | ".ttf"
  | ".txt"
  | ".vsd"
  | ".wav"
  | ".weba"
  | ".webm"
  | ".webp"
  | ".woff"
  | ".woff2"
  | ".xhtml"
  | ".xls"
  | ".xlsx"
  | ".xml"
  | ".xul"
  | ".zip"
  | ".3gp"
  | ".3g2"
  | ".7z";
