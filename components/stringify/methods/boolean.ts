
import {JsonBooleanType} from "../types.ts"

export default
 (x:JsonBooleanType) => 
    "const" in x 
        ? `'"${x.name}":' + ${x.name}`
        : `'"${x.name}":'+( o.{x.name} === true?o.${x.name}:'${
            "default" in x ? x.default : null
          }')`