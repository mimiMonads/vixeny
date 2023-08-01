import { ParamsMethod } from "../builder/types.ts";
import { JsonOptions, JsonType } from "../components/stringify/types.ts";
import { SignVerifyOptions } from "../components/tokens/types.ts";
import { JsonSinger } from "../components/tokens/jSigner.ts"
export type ParamsOptions = {
  elements: string[];
};
export type QueryOptions = {
  only?: string[];
};
export type DebugOptions = {
  type: "log"
}
export type AddOption = "req" | "query" | "param" | "date" | "sign" | "verify" | "jSign" | "jVerify" | "randomNumber" | "hash" | "cookie";
export type AddOptions = AddOption[];
export type RequestArguments = {
  req: Request;
  query: Record<string, string | undefined>;
  param: Record<string, string>;
  date: number;
  randomNumber: number;
  hash: string;
  cookie: null | { [key: string]: string | undefined };
  sign: (s: string) => string;
  jSign: (s: string) => string;
  verify: (s: string) => boolean;
  jVerify: (s: string) => Record<string, JsonType> | null;
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
  signer?: SignVerifyOptions;
  jSigner?: JsonSinger;
  verifier?: SignVerifyOptions;
  jVerify?: SignVerifyOptions;
  delete?: AddOptions;
  debug?: DebugOptions;
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
  signer?: SignVerifyOptions;
  jSigner?: JsonSinger;
  verifier?: SignVerifyOptions;
  query?: QueryOptions;
  add?: AddOptions;
  delete?: AddOptions;
  debug?: DebugOptions;
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
