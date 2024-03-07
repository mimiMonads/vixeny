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
  readonly hasHeaders? : true
} | {};

type WithPlugins<
  R extends MorphismMap,
  B extends AnyMorphismMap,
  QS extends QueryOptions,
  PA extends ParamOptions,
  O extends FunRouterOptions,
  CR extends CryptoOptions,
  UNI extends specialElements
> =
  & Ctx<R, B, QS, PA, O, CR , {}>
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
  UNI extends specialElements
> {
  resolve: { [V in keyof R]: Awaited<ReturnType<R[V]["f"]>> };
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
   * {
   *   path: '/path',
   *   options: {add: ["req"]},
   *   f: ctx => outOfContext(ctx)
   * };
   * ```
   */
  req: Request;
  /**
   * Gets the Queries from the URL, utilize the `ctx.query`.
   *
   * ---
   * ```ts
   * {
   *   path: '/path',
   *   f: ctx => ctx.query?.name
   * };
   * // If the `ctx` goes out of context
   * {
   *   path: '/path',
   *   options: {add: ["query"]},
   *   f: ctx => outOfContext(ctx)
   * };
   * ```
   */
  query: QS extends { unique: true } ? (string | null)
    : { [key: string]: string };

  /**
   * Gets the parameters from the URL
   *
   * ```ts
   * {
   *   path: '/hello/:name',
   *   f: ctx => ctx.param.name
   * };
   *
   * // If the `ctx` goes out of context
   * {
   *    path: '/hello/:name',
   *    options: {add: ["param"]},
   *    f: ctx => outOfContext(ctx)
   * };
   * ```
   */
  param: PA extends { unique: true } ? string : Record<string, string>;
  headers: UNI extends {
    readonly hasHeaders : true
  }  ? Record<string, string > : null;
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
  /**
   * Resolve Behavior
   *
   * In a `petition` that includes a `resolve`, every element within the `resolve` object is initially unknown.
   * It must be explicitly set within the containing `petition` to be recognized and processed.
   *
   * ```ts
   * // Example
   * {
   *     path: "/sample",
   *     resolve: { name: "nestedElement", f: () => "Hello World"},
   *     // 'nestedElement' is set here for the main function to recognize it
   *     f: context => context.resolve.nestedElement
   * }
   * ```
   * Ensure that every element you want to use from `resolve` is appropriately defined in your `petition`.
   */
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
   * Utilizes `ctx.mutable` for scenarios where mutable state is needed in Vixeny.
   *
   * ---
   * ```ts
   * {
   *   path: '/mutable',
   *   mutable: true,
   *   //  the function is "example", resolves with name "hello", which mutates "result"
   *   resolve: {...example_r_$hello_m_$result_string},
   *   f: ctx => ctx.mutable.result as string
   * };
   * ```
   * The mutable state is global and can be accessed at any depth:
   *
   * ```ts
   * {
   *   path: '/deepMutable',
   *   mutable: true,
   *   //  the function is "example", resolves with name "hello", which mutates "result"
   *   resolve: {...example_r_$hello_m_$result_string},
   *   f: ctx => ctx.branch.function("Greetings") as string,
   *   branch: {
   *     name: "function",
   *     f: c => `${c.arguments} ${c.mutable.result}`
   *   }
   * };
   * ```
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
   *     name: "hello",
   *     f: c => c.arguments
   *   }
   * };
   * ```
   * When invoking a branch function, any parameters passed are accessible as `arguments` within the branch function.
   *
   * ---
   * ```ts
   * {
   *   path: '/multipleArgs',
   *   f: ctx => ctx.branch.greet("Hello", "world!"),
   *   branch: {
   *     name: "greet",
   *     f: c => `${c.arguments[0]} ${c.arguments[1]}`
   *   }
   * };
   * ```
   * In this example, multiple arguments are passed to the branch function, and they're accessed via index in the branch.
   */
  arguments: unknown;
  /**
   *  Takes a string and sign it, it has to:
   *  - Be longer than 7
   *  - Have a `seed`, witch it has to be declare in the `Petition` , `branch` or `resolve`
   *
   * ```ts
   * {
   *  path:"/path",
   *  signer: {
   *    seed: "SECRET_SEED",
   *  },
   *  f: ctx => ctx.sign(ctx.cookie.id)
   * }
   * ```
   */
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
      ctx: WithPlugins<ResMap, BraMap, Query, Param, Options, Crypto , {}>,
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
      ctx: WithPlugins<ResMap, BraMap, Query, Param, Options, Crypto , { hasHeaders: true}>,
    ) => Response | Promise<Response>;
  };

export type BodyNull = {
  [propName: string]: any;
} | null;
export type ObjectaAndNullMorphism<
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
      ctx: WithPlugins<ResMap, BraMap, Query, Param, Options, Crypto, {hasHeaders: true}>,
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
      ctx: WithPlugins<ResMap, BraMap, Query, Param, Options, Crypto, {hasHeaders: true}>,
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
  | "headers"  
  ;

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
