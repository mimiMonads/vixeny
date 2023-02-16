import digits from "./digits.ts"

export default async(seed?:string) => (
    async p0 => (
      async  p1 => (
        async  p2 => (
            async  p3 => (
                async  p4 => (
                    async  p5 => (
                        async  p6 => (
                            // deno-lint-ignore require-await
                            async  p7 => [p0,p1,p2,p3,p4,p5,p6,p7]
                         )(
                             await digits( seed ? seed + "7" : seed)
                         )
                     )(
                         await digits( seed ? seed + "6" : seed)
                     )
                 )(
                     await digits( seed ? seed + "5" : seed)
                 )
             )(
                 await digits( seed ? seed + "4" : seed)
             )
         )(
             await digits( seed ? seed + "3" : seed)
         )
     )(
         await digits( seed ? seed + "2" : seed)
     )
   )(
       await digits( seed ? seed + "1" : seed)
   )
)(
    await digits( seed ? seed + "0" : seed)
)