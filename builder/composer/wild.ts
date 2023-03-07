import { Atlas, funRouterOptions } from "../../types.ts";

export default 
 (_o?: funRouterOptions) => (max: number) => (atlas: Atlas) =>  (
    me => (
        methodMap => (r:Request) => (
            meth => meth !== -1
                ? methodMap[0](r.url)
                : -1
        )(
            me(r.url)
        )
    ) (
        atlas[0].map( method => 
            (
                ar =>  
                (
                    (f) =>  f
                )(
                    ((ar: string[]) =>
                    (new Function(`return s=>${
                        ar.reduceRight(
                        (acc, v, i) => `s.indexOf("${v}")===0?${i + max - 2}:` + acc,
                        "-1",
                        )
                    }`))() as (s: string) => number)(ar),
                )
            )(
                atlas[0].filter(
                    x => x[0] !== method 
                )
                .map(
                    x => x[3]
                )
            )
        )
    )
 )(
    ((a: string[]) => ((o) => (s: string) => o.indexOf(s))(a.map((x) => x)))(
      atlas[0],
    )
 )

