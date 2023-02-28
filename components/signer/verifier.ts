import solver from "./solver.ts";
import validChar from "../util/validChar.ts";
import { SignVerifyOptions } from "./types.ts";

export default async (seed: SignVerifyOptions) => (
    ar => (
       p => (s:string) =>
       s.length >= 17
        ? (
            m => 
            s
        .slice(0, m)
        .split("")
        .map( x => x.charCodeAt(0))
        .every( (x,i,a)  => 
        i < 7 
            ? p[ar[i%8]([a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]])] === s[m +  + 1 + i]
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
                ])] === s[m + 1 + i]
        )
        )(
            s.length / 2 >> 0
        )

        : false
    )(
       [...validChar]
    )
   )(
       await solver(seed)
   )