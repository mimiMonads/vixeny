

import { ObjectRawResponseStatic } from "../types.ts";
import composedPaths from "./composedPaths.ts";
import getDir from "./getDir.ts";
import mime from "./mime.ts";



export default (f:ObjectRawResponseStatic)=>
(
    (rectify) =>

        composedPaths(rectify(f.path))(rectify(f.name))(getDir(rectify(f.path)))(mime(f)) 
)
  (
    (s:string) =>
    [
    ((x: string) => x[x.length -1] !== "/" ?  x + "/" : x),
    ((x: string) => x[0] === "." ? x : "." + x )
    ].reduceRight( (acc,x) => x(acc), s)
  );