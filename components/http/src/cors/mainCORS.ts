import { CORSOptions } from "./types.ts";

export const parse = () => (o: CORSOptions) =>
  Object.keys(o).reduce(
    //@ts-ignore
    (acc, key) => ({ ...acc, key: o[key].toString() }),
    {},
  );

export const stringToFunction = (obj: { [key: string]: string }) =>
  (new Function(`return () => (${JSON.stringify(obj)})`))() as () => {
    [key: string]: string;
  };
