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

/**
 * Arguments for the request.
 */
export type RequestArguments = {
  req: Request;
  query: Record<string, string | undefined>;
  param: Record<string, string>;
  date: number;
  resolve: Record<string, unknown | null>;
  branch: Record<string, { (args: unknown): Promise<unknown> | unknown }>;
  randomNumber: number;
  hash: string;
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
  path: string;
  options?: PetitionOptions;
  query?: QueryOptions;
  signer?: SignVerifyOptions;
  jSigner?: JsonSinger;
  verifier?: SignVerifyOptions;
  jVerifier?: SignVerifyOptions;
  method?: ParamsMethod;
  resolve?: ResolveOptions | ResolveOptions[];
  branch?: BranchOptions | BranchOptions[];
  headings?: PetitionHeader;
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
  branch?: BranchOptions | BranchOptions[];
};

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
  type: "static";
  name: string;
  path: string;
} | {
  type: "static";
  name: string;
  path: string;
  mime?: true;
  extra: [string, string][];
} | {
  type: "static";
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
