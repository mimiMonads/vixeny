import { JsonStringify } from "./src/stringify/types";

// Define the options type for the function
export interface StringifyOptions {
  type?: "unsafe" | "safe";
}

// Define the type for the main function
export type JsonStringifyFunction = (
  options?: StringifyOptions,
) => (schema: JsonStringify) => string;
