import { ParamsMethod } from "../builder/types.ts";
import { JsonOptions, JsonType } from "../components/stringify/types.ts";
//import { SignVerifyOptions } from "../components/signer/types.ts";

export type ParamsOptions = {
  elements: string[];
};
export type QueryOptions = {
  only?: string[];
};
export type AddOption = "req" | "query" | "param";
export type AddOptions = AddOption[];
export type RequestArguments = {
  req: Request;
  query: Record<string, string | null | undefined>;
  param: Record<string, string>;
//  sign: (s: string) => string;
//  verify: (s: string) => -1 | 1;
};
export type Petition =
  | ObjectRawResponseCommon
  | ObjectRawResponseReturn
  | ObjectRawCommonRequest
  | ObjectRawResponseStatic;

export type RawResponseCommon = {
  path: string;
  param?: ParamsOptions;
  query?: QueryOptions;
  add?: AddOptions;
  // signer?: SignVerifyOptions;
  //  verifier?: SignVerifyOptions;
  delete?: AddOptions;
  dev?: "test";
  method?: ParamsMethod;
  status?: number;
  headers?: Record<string, string> | defaultMime;
};

export type ObjectRawResponseCommon =
  | (RawResponseCommon & {
    f: (r: RequestArguments) => BodyInit | Promise<BodyInit>;
  })
  | (RawResponseCommon & {
    f: (r: RequestArguments) => JsonType | Promise<JsonType>;
    json: JsonOptions;
  });

export type ObjectRawCommonRequest = {
  type: "request";
  path: string;
  f: (r: RequestArguments) => Response | Promise<Response>;
  param?: ParamsOptions;
  //  signer?: SignVerifyOptions;
  //  verifier?: SignVerifyOptions;
  query?: QueryOptions;
  add?: AddOptions;
  delete?: AddOptions;
  dev?: "test";
  method?: ParamsMethod;
};

export type ObjectRawResponseReturn = {
  type: "response";
  path: string;
  r: (r: Request) => Response | Promise<Response>;
  method?: ParamsMethod;
};

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
