import type { CORSOptions } from "./types.ts";

const elementsTo = {
  allowOrigins: "Access-Control-Allow-Origin",
  allowMethods: "Access-Control-Allow-Methods",
  exposeHeaders: "Access-Control-Expose-Headers",
  maxAge: "Access-Control-Max-Age",
  allowCredentials: "Access-Control-Allow-Credentials",
  allowHeaders: "Access-Control-Allow-Headers",
  allowPrivateNetwork: "Access-Control-Allow-Private-Network",
  preflightContinue: "Access-Control-Preflight-Continue",
};

export const parse = () => (o: CORSOptions) =>
  Object.keys(o).reduce(
    //@ts-ignore
    (acc, key) => ({ ...acc, [elementsTo[key]]: o[key].toString() }),
    {},
  );

export const stringToFunction = (obj: { [key: string]: string }) =>
  (new Function(`return () => (${JSON.stringify(obj)})`))() as () => {
    [key: string]: string;
  };
