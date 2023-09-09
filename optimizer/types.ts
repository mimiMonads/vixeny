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
  mutable: Record<string, unknown>;
  arguments: unknown;
  sign: (s: string) => string;
  jSign: (s: string) => string;
  verify: (s: string) => boolean;
  jVerify: (s: string) => Record<string, JsonType> | null;
};

/**
 * Petition object.
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
  method?: ParamsMethod;
  headings?: PetitionHeader;
} & RawCommonRequest ;

/**
 * Common raw request object.
 */
export type RawCommonRequest = {
  path: string;
  signer?: SignVerifyOptions;
  options?: PetitionOptions;
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

/**
 * Object for raw response with common properties.
 */
export type ObjectRawResponseCommon =
  | (RawResponseCommon & {
    mutable?: true;
    f: (r: RequestArguments) => BodyInit | Promise<BodyInit>;
  })
  | (RawResponseCommon & {
    mutable?: true;
    f: (r: RequestArguments) => JsonType | Promise<JsonType>;
    json: JsonOptions;
  });



/**
 * Object for raw common request.
 */
export type ObjectRawCommonRequest = {
  method?: ParamsMethod;
  type: "request";
  mutable?: true;
  f: (r: RequestArguments) => Response | Promise<Response>;
} & RawCommonRequest

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
