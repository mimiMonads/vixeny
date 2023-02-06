import { JsonElements , JsonMap} from "../types.ts";


export default (element:JsonMap[]) =>  
(
    l => element.map(
        (x) => x.required ? `"${x.name}":"'+str(o.${x.name})+'"'` : `"${x.name}":' + typeOf ${x.name} === "string"?str('"'+o.${x.name}+'"'):"null"`
    ).join(",")
)(  element.length - 1

)

   