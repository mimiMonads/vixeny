


export type JsonElements = JsonString | JsonBoolean | JsonNumber;

export type JsonMap = {name:string, type: JsonTypes, required: boolean}

export type JsonTypes = "string" | "boolean" | "number";

type JsonString = {
  type: "string";
} | {
  type: "string";
  const: string
}| {
  type: "string";
  default: string
}

type JsonBoolean = {
  type: "boolean";
  default?: boolean;
}

type JsonNumber = {
  type: "number";
  default?: number;
}



type JsonArray = {
  type: "array";
  items?: JsonElements;
  prefixItems?: [JsonElements]
  maxContains?: number
}

export type JsonStringify = {
  type: "object";
  properties: {
    [key: string]: JsonElements ;
  };
  required?: string[]
}

// oneOf?: JsonElements[];
// | {or: [JsonElements,JsonElements]} | {oneOf: JsonElements[]}
