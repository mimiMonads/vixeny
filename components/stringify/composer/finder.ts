// deno-lint-ignore-file no-explicit-any
import { JsonStringify, JsonStringType , JsonNumberType, JsonBooleanType, JsonArrayType } from "../types.ts";
import string from "../methods/string.ts";
import boolean from "../methods/boolean.ts";
import number from  "../methods/number.ts";
import array from  "../methods/array.ts";


export default (o: JsonStringify) =>
  '"{" +' + (((f: (arg0: (y: any) => any) => any) =>
    ((x) => x(x))((x: (arg0: any) => { (arg0: any): any; new (): any }) =>
      f((y: any) => x(x)(y))
    ))((f) =>
      (o: JsonStringify) => (s:string)=>
        Object.keys(o.properties)
          .map((x) =>
            o.properties[x].type !== "object"
              ? o.properties[x].type === "string"
                ? string(
                  {
                    ...o.properties[x],
                    ...{ name: x, required: o.required?.includes(x) ?? false },
                    ...{path: s + "." + x } 
                  } as JsonStringType
                )
                :  o.properties[x].type === "number"
                  ? number(
                    {
                      ...o.properties[x],
                      ...{ name: x, required: o.required?.includes(x) ?? false },
                      ...{path: s + "." + x } 
                    } as JsonNumberType
                  )
                  : o.properties[x].type === "boolean"
                    ? boolean(
                      {
                        ...o.properties[x],
                        ...{ name: x, required: o.required?.includes(x) ?? false },
                        ...{path: s + "." + x } 
                      } as JsonBooleanType
                    )
                    :  array(
                      {
                        ...o.properties[x],
                        ...{ name: x, required: o.required?.includes(x) ?? false },
                        ...{path: s + "." + x } 
                      } as JsonArrayType
                    )
              :  `'"${ x }":{' + ` + (f(o.properties[x])(s + "." + x ).join(" + ',' +") )  + ' + "}"'
          )
    )(o)("")).join(" + ',' +") + ' + "}"';

