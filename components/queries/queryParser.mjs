import common from "./src/common.mjs";
import elements from "./src/elements.mjs";


export default o => 
  ar => 
    Array.isArray(ar)
    ? new Function(`return ${elements(ar)}`)() 
    : new Function(`return ${common(o)(ar)}`)
