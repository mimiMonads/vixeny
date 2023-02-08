export type JsonTypes = "string" | "boolean" | "number";

type JsonString = {
  type: "string";
} | {
  type: "string";
  const: string;
} | {
  type: "string";
  default: string;
};
export type JsonStringType = JsonString & { name: string; required: boolean };

type JsonBoolean = {
  type: "boolean";
} | {
  type: "string";
  const: boolean;
} | {
  type: "string";
  default: boolean;
};

export type JsonBooleanType = JsonBoolean & { name: string; required: boolean };

type JsonNumber = {
  type: "number";
} | {
  type: "number";
  const: number;
} | {
  type: "number";
  default: number;
};

export type JsonStringify = {
  type: "object";
  properties: {
    [key: string]: JsonElements;
  };
  required?: string[];
};

type JsonArray = {
  type: "array";
  items?: JsonElements;
  prefixItems?: [JsonElements];
  maxContains?: number;
};

export type JsonNumberType = JsonNumber & { name: string; required: boolean };

export type JsonOptionsType = JsonStringType | JsonBooleanType | JsonNumberType;

export type JsonElements = JsonString | JsonBoolean | JsonNumber;

export type JsonMap = { name: string; type: JsonTypes; required: boolean };

 

// export type JsonOptionsSanitizer = {
//   disable?: "I know what I do and I have read the documentation",
//   searcher?: "strict" | "basic"
// }

export type JsonOptions = {
  scheme: JsonStringify;
  null?: "add" | "removeKey";
}

