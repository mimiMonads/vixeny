import { ObjectRawResponseStatic, Petition } from "../types.ts";

export default (f: ObjectRawResponseStatic) => (ar: string[]) =>
  f.plugins !== undefined && f.plugins && "checker" in f.plugins
    ? {
      list: ar.filter((x) => !(f.plugins!.checker(x))),
      plugin: ar
        .filter(f.plugins.checker)
        .map(f.plugins.r),
    }
    : {
      list: ar,
      plugin: [] as Petition[],
    };
