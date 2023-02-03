import { funRouterOptions } from "../../types.ts";
import { Atlas } from "../atlas/main.ts"
import parser from "./parser.ts"
import map from "../atlas/map.ts"


export default (o?:funRouterOptions) =>  (atlas:Atlas) =>
    (
    position =>        
        atlas[0]
            .map(
                (_,i) => 
                    o && "hasName" in o && typeof o.hasName ===  "string"
                        ? (p => (s:string) => p(s.slice(o!.hasName!.length -1)))(parser(o)(atlas[2][i])(position[i])(atlas[1][i])(atlas[3].length - 2))
                        : ( p => 
                            (
                                n =>
                                (s:string)=> n !== -1 ? p(s.slice(n)) : p(s.slice(
                                    n = s
                                    .split("/")
                                    .filter((x) => x !== "")
                                    .reduce((acc, x, u) => u <= 1 ? acc + x.length : acc, 3) - 1) )
                            )(
                                -1
                            )
                            )(
                            parser(o)(atlas[2][i])(position[i])(atlas[1][i])(atlas[3].length - 2)
                        )
                ) as [(s:string) => number]
    )(
        map(atlas[2])
    )