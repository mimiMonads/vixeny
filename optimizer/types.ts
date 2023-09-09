import { ParamsMethod } from "../builder/types.ts";
import { JsonOptions, JsonType } from "../components/stringify/types.ts";
import { SignVerifyOptions } from "../components/tokens/types.ts";
import { JsonSinger } from "../components/tokens/jSigner.ts"
import { ResolveOptions as UnResolveOption } from "./resolve/types.ts";
import { BranchOptions as UnBranchOptions } from "./branch/types.ts";

type ResolveOptions = Omit<UnResolveOption, "path">
type BranchOptions = Omit<UnBranchOptions, "path">

/**
 * Options for the petition.
 */
export type PetitionOptions = {
  /**
   * Options for adding.
   */
  add?: AddOption[];
  /**
   * Options for debugging.
   */
  debug?: DebugOptions;
  /**
   * Options for removing.
   */
  remove?: AddOption[];
  /**
   * Options for filtering only specified items.
   */
  only?: AddOption[];
  /**
   * Hash to set.
   */
  setHash?: string;
  /**
   * Random number to set.
   */
  setRandomNumber?: number;
  /**
   * Date to set.
   */
  setDate?: number;
}


/**
 * Headers for the petition.
 */
export type PetitionHeader = {
  /** 
   * The headers initialization. 
   */
  headers?: HeadersInit | defaultMime
  /** 
   * The status text. 
   */
  statusText?: string;
  /** 
   * The status number. 
   */
  status?: number;
}

/**
 * Options for the query.
 */
export type QueryOptions = {
  /**
   * Specify only certain fields.
   */
  only?: string[];
};

/**
 * Options for debugging.
 */
export type DebugOptions = {
  type: "list",
  name: string
}

/**
 * Options for adding.
 */
export type AddOption = "req" | "query" | "param" | "date" | "sign" | "verify" | "jSign" | "jVerify" | "randomNumber" | "hash" | "cookie" | "resolve" | "mutable" | "branch" | "arguments";

/**
 * List of options for adding.
 */
export type AddOptions = AddOption[];

new Response

export type RequestArguments = {
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
   * 
   * @see {@link https://vixeny.dev/docs/modules/query | Vixeny Queries} 
   */
  query: Record<string, string | undefined>;
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
   * 
   * @see {@link https://vixeny.dev/docs/modules/parameters | Vixeny Parameters} 
   */
  param: Record<string, string>;
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
   *{
   *    path: "/",
   *    options:{
   *      setDate: 1694246953189
   *    },
   *    f: ctx => ctx.date === 1694246953189
   *       ? "Date is bind to a state"
   *       : "unreachable"
   *}
   *```
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
  resolve: Record<string, unknown | null>;
  /**
 * Branch
 * 
 * - **Usage**: Branches can be synchronous or asynchronous and receive input via the `arguments` property.
 * 
 * ```ts
 * // Basic use of branch:
 * {
 *     path: "/branch",
 *     f: c => c.branch.hello("hi"),
 *     branch: { name: "hello", f: c => c.arguments }
 * }
 * ```
 * 
 * - **Combining Branches**: You can define multiple branches and use them in compositions.
 * 
 * ```ts
 * {
 *     path: "/branches",
 *     f: c => `${c.branch.left("Hello ")}${c.branch.right("world!")}`,
 *     branch: [ { name: "left", f: c => c.arguments }, { name: "right", f: c => c.arguments } ]
 * }
 * ```
 * 
 * - **Interaction with Resolve**: Branches can leverage the `resolve` property for more intricate compositions.
 * 
 * ```ts
 * {
 *     path: "/branch",
 *     f: c => c.branch.hello("world!"),
 *     branch: {
 *         resolve: { name: "prefix", f: () => "hello" },
 *         name: "hello",
 *         f: c => `${c.resolve.prefix}${c.arguments}`
 *     }
 * }
 * ```
 */
  branch: Record<string, { (args: unknown): Promise<unknown> | unknown }>;
  /**
 * Introduces a random number generator using Math.random().
 * 
 * ```ts
 * {
 *    path: "/path",
 *    f: ctx => ctx.randomNumber > 0.5
 *      ? "greater than 0.5"
 *      : "less than or equal to 0.5"
 * }
 * ```
 * ---
 * This behavior can be set for testing purposes:
 * ```ts
 * {
 *    path: "/",
 *    options:{
 *      setRandomNumber: 0.4235
 *    },
 *    f: ctx => ctx.randomNumber === 0.4235
 *       ? "Random number is bind to a state"
 *       : "unreachable"
 * }
 * ```
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
 * 
 * @see {@link https://vixeny.dev/docs/modules/cookie | Vixeny Cookies} 
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
 * Use `ctx.mutable` judiciously, ensuring it addresses genuine mutable requirements.
 * 
 * @see {@link https://vixeny.dev/docs/modules/mutable | Vixeny Mutable}
 */

  mutable: Record<string, unknown>;
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
 * 
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
   * 
   */
  sign: (s: string) => string;
/**
 * Verifies a signed string.
 * 
 * Takes a signed string, typically stored in a cookie, and checks its validity, according to the `seed` 
 * 
 * ```ts
 * {
 *   path: "/path",
 *   verifier: {
 *    seed: "SECRET_SEED",
 *   },
 *   f: ctx => ctx.cookie.id
 *     ? ctx.verify(ctx.cookie.id)
 *       ? "valid"
 *       : "invalid"
 *     : "no cookie"
 * }
 * ```
 * 
 */
  verify: (s: string) => boolean;
  /**
   *  Takes a JSON object and sign it and st, it has to:
   *  - Be longer than 7 
   *  - Have a `seed`, witch it has to be declare in the `Petition` , `branch` or `resolve`
   * 
   * ```ts
   * {
   *   path:"/path/:id",
   *   jSigner: {
   *      seed: "SECRET_SEED",
   *    },
   *   f: ctx => ctx.jSign(ctx.param)
   *  }
   * ```
   * 
   */
  jSign: (s: JsonType) => string;
/**
 * `jVerifier` is responsible for token handling in `jVerify`.
 * 
 * When using `jSigner`:
 * - Avoid setting a fixed size for tokens.
 * - Always ensure an expiration time is added to tokens.
 * 
 * we are using `resolve` in the next example
 * ```ts
 * {
 *   path: "/path",
 *   jVerifier: {
 *     seed: "SECRET_SEED",
 *   },
 *   resolve: {
 *     name: "user",
 *     f: ctx => ctx.jVerify(ctx.cookie?.user)?.name
 *   },
 *   f: ctx => ctx.resolve.user as string ?? "not_user_found"
 * }
 * ```
 * 
 */
  jVerify: (s: string) => Record<string, JsonType> | null;
};

/**
 * **Petitions in Vixeny**:
 * 
 * 1. **Untyped**: Standard without `type`. Returns `BodyInit`.
 * ```ts
 * { path: "/", f: () => "hello world" }
 * ```
 * 
 * 2. **Type Request**: Returns `Response` for custom statuses.
 * ```ts
 * { 
 *  path: "/response/who/:name",
 *  type: "request", 
 *  f: context => 
 *    context.param.name === "Bun" 
 *      ? new Response("Welcome") 
 *      : new Response("Only devs", {status: 400})
 *  }
 * ```
 * 
 * 3. **Type Response**: Direct interaction with Request and Response.
 * ```ts
 * { path: "/response/hello", type: "response", r: r => new Response("Hello world!") }
 * ```
 * 
 */

export type Petition =
  | ObjectRawResponseCommon
  | ObjectRawResponseReturn
  | ObjectRawCommonRequest
  | ObjectRawResponseStatic;

/**
 * Common raw response object.
 */
export type RawResponseCommon = {
  /**
   * Route Method
   */
  method?: ParamsMethod;
  headings?: PetitionHeader;
} & RawCommonRequest ;

/**
 * Common raw request object.
 */
export type RawCommonRequest = {
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
/**
 * Signs a string for secure storage and transport.
 * 
 * Takes a string and signs it using the provided `seed`. The resulting signed string can later be verified to ensure its authenticity and integrity.
 * 
 * ```ts
 * {
 *   path: "/path",
 *   signer: {
 *     seed: "SECRET_SEED",
 *   },
 *   f: ctx => ctx.sign(ctx.request.body.data)
 * }
 * ```
 * 
 */
  signer?: SignVerifyOptions;
  options?: PetitionOptions;
  /**
 * Verifies a signed string.
 * 
 * Takes a signed string, such as one that was previously signed using the corresponding `signer`, and checks its validity based on the `seed` provided.
 * 
 * ```ts
 * {
 *   path: "/path",
 *   verifier: {
 *     seed: "SECRET_SEED",
 *   },
 *   f: ctx => ctx.cookie.id
 *     ? ctx.verify(ctx.cookie.id)
 *       ? "valid"
 *       : "invalid"
 *     : "no cookie"
 * }
 * ```
 * 
 */
  verifier?: SignVerifyOptions;
  jSigner?: JsonSinger;
  jVerifier?: SignVerifyOptions;
  query?: QueryOptions;
  resolve?: ResolveOptions | ResolveOptions[];
    /**
 * Branch
 * 
 * - **Usage**: Branches can be synchronous or asynchronous and receive input via the `arguments` property.
 * 
 * ```ts
 * // Basic use of branch:
 * {
 *     path: "/branch",
 *     f: c => c.branch.hello("hi"),
 *     branch: { name: "hello", f: c => c.arguments }
 * }
 * ```
 * 
 * - **Combining Branches**: You can define multiple branches and use them in compositions.
 * 
 * ```ts
 * {
 *     path: "/branches",
 *     f: c => `${c.branch.left("Hello ")}${c.branch.right("world!")}`,
 *     branch: [ { name: "left", f: c => c.arguments }, { name: "right", f: c => c.arguments } ]
 * }
 * ```
 * 
 * - **Interaction with Resolve**: Branches can leverage the `resolve` property for more intricate compositions.
 * 
 * ```ts
 * {
 *     path: "/branch",
 *     f: c => c.branch.hello("world!"),
 *     branch: {
 *         resolve: { name: "prefix", f: () => "hello" },
 *         name: "hello",
 *         f: c => `${c.resolve.prefix}${c.arguments}`
 *     }
 * }
 * ```
 */
  branch?: BranchOptions | BranchOptions[];
};

export type  MutableKey  = {
  /**
 * Enables mutable state in Vixeny petitions.
 * 
 * Vixeny primarily champions immutability, but for instances requiring mutable state, the `mutable` property is at your disposal.
 * 
 * Use at the petition's onset:
 * ```ts
 * {
 *     path: "/mutable",
 *     mutable: true,
 *     resolve: {...example_r_$hello_m_$result_string},
 *     f: c => c.mutable.result as string,
 * }
 * ```
 * 
 * It's globally accessible, effective at any depth:
 * ```ts
 * {
 *     path: "/mutable",
 *     mutable: true,
 *     resolve: {...example_r_$hello_m_$result_string},
 *     f: c => c.branch.function("Hello") as string,
 *     branch: {
 *         name: "function",
 *         f: c => c.arguments + c.mutable.result as string
 *     }
 * }
 * ```
 * 
 * `mutable` offers flexibility, letting developers mold Vixeny to diverse needs.
 */
  mutable?: true
}

/**
 * Object for raw response with common properties.
 */
export type ObjectRawResponseCommon =
  | (RawResponseCommon & {
    f: (ctx: RequestArguments) => BodyInit | Promise<BodyInit>;
  } & MutableKey )
  | (RawResponseCommon & {
    f: (ctx: RequestArguments) => JsonType | Promise<JsonType>;
    json: JsonOptions;
  } & MutableKey );


/**
 * Object for raw common request.
 */
export type ObjectRawCommonRequest = {
  /**
   * Route Method
   */
  method?: ParamsMethod;
  type: "request";
  f: (ctx: RequestArguments) => Response | Promise<Response>;
} & RawCommonRequest & MutableKey

/**
 * Object for raw response return.
 */
export type ObjectRawResponseReturn = {
  type: "response";
  path: string;
  r: (r: Request) => Response | Promise<Response>;
  method?: ParamsMethod;
};


/**
 * Object for raw response static.
 */
export type ObjectRawResponseStatic = {
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
};

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
