 import solver from "./src/solver.ts";
 import validChar from "../util/validChar.ts";
 import { SignVerifyOptions } from "./types.ts";

export default async (seed: SignVerifyOptions) => (
 ar => (
    p => (s:string) =>  s + "." + [...s].map( x => x.charCodeAt(0)).map( (x,i,a) => 
     i < 7 
     ? p[ar[i%8]([a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]])]
     : p[
    ar[i%8]([
        a[(i-7)],
        a[(i-6)],
        a[(i-5)],
        a[(i-4)],
        a[(i-3)],
        a[(i-2)],
        a[(i-1)],
        x,
    ])]
    ).reduce( (acc,x) => acc + x)
 )(
    [...validChar]
 )
)(
    await solver(seed)
)