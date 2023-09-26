import common from "./src/common.mjs";
import elements from "./src/elements.mjs";
import filter from "./src/filter.mjs";

export default o => 
  f => 
    f && "query" in f && f.query?.only 
    ? new Function(`return ${elements(f.query.only)}`)() 
    : (
      only => 
        only.length > 0 
         ? new Function(`return ${elements(only)}`)() 
         : new Function(`return ${common(o)(f)}`)()
    )(filter(f.f.toString().split(" "))("query"));
