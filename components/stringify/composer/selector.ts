import { JsonElements , JsonMap} from "../types.ts";


export default (element:JsonMap[]) =>  
(
    l => element.map(
        (x) => 
            x.type === "string"
                ? x.required ? `'"${x.name}":"'+str(o.${x.name})+'"'` : `'"${x.name}":' + (typeof o.${x.name} === "string"?'"'+str(o.${x.name})+'"':'${x}')`
                : x.type === "boolean"
                    ? ""
                    : ""
    ).join(" + ',' +")
)(  element.length - 1

)

   