import params from "../../parameters/main.ts";
import query from "../../queries/main.ts";
import cookies from "../../cookies/main.ts";
import resolve from "./resolve/main.ts";
import branch from "./branch/main.ts";
import { FunRouterOptions } from "../../../types.ts";
import { AnyMorphismMap, CommonRequestMorphism, MorphismMap, RequestMorphism } from "./types.ts";
 
type NativeMaps = {
    name: string;
    value: string | number | null;
    type: number;
}


 export default (o?: FunRouterOptions)=>( f:CommonRequestMorphism | RequestMorphism ) =>(native:NativeMaps[])=> ( list=> 
    native.map( x => x.type === 1 
        ?list.find(y => y.condition(x) ) || null
        : null).filter((x) => x !== null).map(x => x!.action() )
    ) ([
    { condition: (x:NativeMaps) => x.name === "param", action: () => params(o)(f)},
    { condition: (x:NativeMaps) => x.name === "query", action: () => query(o)(f) },
    { condition: (x:NativeMaps) => x.name === "cookie", action: () => cookies(f) },
    { condition: (x:NativeMaps) => x.name === "resolve", action: () => ("resolve" in f) ? resolve(o)(f.path)(f.resolve as MorphismMap) : null },
    { condition: (x:NativeMaps) => x.name === "branch", action: () => ("branch" in f) ? branch({ ...o, branch: true })(f.path)(f!.branch as AnyMorphismMap) : null },
]
.concat(Object.keys(o?.cyclePlugin || {}).map( x  =>    ( {
    condition: (name => (x:NativeMaps) => x.name === name)(x), action: () => o!.cyclePlugin![x]!['f'](o)(f)
  })
))
)