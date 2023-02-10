export type JsonTypes = "string" | "boolean" | "number";

type Extra = { name: string; required: boolean, path?: string}
type JsonString = {
  type: "string";
} | {
  type: "string";
  const: string;
} | {
  type: "string";
  default: string;
};
export type JsonStringType = JsonString & Extra;

type JsonBoolean = {
  type: "boolean";
} | {
  type: "boolean";
  const: boolean;
} | {
  type: "boolean";
  default: boolean;
};

export type JsonBooleanType = JsonBoolean & Extra;

type JsonNumber = {
  type: "number";
} | {
  type: "number";
  const: number;
} | {
  type: "number";
  default: number;
};

export type JsonNumberType = JsonNumber & Extra;

export type JsonArray = {
  type: "array";
};

export type JsonArrayType = JsonBoolean & Extra;

export type JsonStringify = {
  type: "object";
  properties: {
    [key: string]: JsonElements;
  };
  required?: string[];
};





export type JsonOptionsType = JsonStringType | JsonBooleanType | JsonNumberType | JsonArrayType;

export type JsonElements =
  | JsonString
  | JsonBoolean
  | JsonNumber
  | JsonArray
  | JsonStringify;

export type JsonMap = { name: string; type: JsonTypes; required: boolean };

export type JsonOptions = {
  scheme: JsonStringify;
  null?: "add" | "removeKey";
};
