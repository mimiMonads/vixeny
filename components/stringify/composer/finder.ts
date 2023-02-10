// deno-lint-ignore-file no-explicit-any
import { JsonStringify } from "../types.ts";

export default (o: JsonStringify) =>
  ((f: (arg0: (y: any) => any) => any) =>
    ((x) => x(x))((x: (arg0: any) => { (arg0: any): any; new (): any }) =>
      f((y: any) => x(x)(y))
    ))((f) =>
      (o: JsonStringify) =>
        Object.keys(o.properties)
          .map((x) =>
            o.properties[x].type !== "object"
              ? {
                ...o.properties[x],
                ...{ name: x, required: o.required?.includes(x) ?? false },
              }
              : [{ name: x }, ...f(o.properties[x])]
          )
    )(o);
