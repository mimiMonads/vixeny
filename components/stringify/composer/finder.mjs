
import string from "../methods/json_string.mjs";
import boolean from "../methods/json_boolean.mjs";
import number from "../methods/json_number.mjs";
import array from "../methods/json_array.mjs";

export default o =>
  '"{" +' + (((f) =>
    ((x) =>
      x(x))((x) =>
        f(y => x(x)(y))
      ))((f) =>
      (o) =>
        (s) =>
          Object.keys(o.properties)
            .map((x) =>
              o.properties[x].type !== "object"
                ? o.properties[x].type === "string"
                  ? string(
                    {
                      ...o.properties[x],
                      name: x,
                      required: o.required?.includes(x) ?? false,
                      path: s + "." + x
                    }
                  )
                  : o.properties[x].type === "number"
                  ? number(
                    {
                      ...o.properties[x],
                      name: x,
                      required: o.required?.includes(x) ?? false,
                      path: s + "." + x
                    }
                  )
                  : o.properties[x].type === "boolean"
                  ? boolean(
                    {
                      ...o.properties[x],
                      name: x,
                      required: o.required?.includes(x) ?? false,
                      path: s + "." + x
                    }
                  )
                  : array(
                    {
                      ...o.properties[x],
                      name: x,
                      required: o.required?.includes(x) ?? false,
                      path: s + "." + x
                    }
                  )
                : `'"${x}":{' + ` +
                  (f(o.properties[x])(s + "." + x).join(" + ',' +")) + ' + "}"'
            )
    )(o)("")).join(" + ',' +") +
  ' + "}"';
