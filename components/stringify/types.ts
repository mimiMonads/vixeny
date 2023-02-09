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
  type: "boolean";
  const: boolean;
} | {
  type: "boolean";
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

export type JsonArray = {
  type: "array";
};

export type JsonNumberType = JsonNumber & { name: string; required: boolean };

export type JsonOptionsType = JsonStringType | JsonBooleanType | JsonNumberType;

export type JsonElements = JsonString | JsonBoolean | JsonNumber | JsonArray;

export type JsonMap = { name: string; type: JsonTypes; required: boolean };

 
export type JsonOptions = {
  scheme: JsonStringify;
  null?: "add" | "removeKey";
}

