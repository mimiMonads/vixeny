import { funRouterOptions } from "../../types.ts";

import { Atlas } from "../atlas/main1.ts";

export default(_o?: funRouterOptions) => (max: number) =>  (atlas :Atlas) => (
 me => atlas[0].map(
        (_,i) =>  (
            ar =>
              (new Function(`return s=>${
                ar.reduceRight(
                  (acc, v, i) => `s.indexOf("${v}")===0?${i + max - 2}:` + acc,
                  "-1",
                )
              }`))() as (s: string) => number
        )(
            atlas[2][i].flat()
        )
 )
)
(
    ((a: string[]) => ((o) => (s: string) => o.indexOf(s))(a.map((x) => x)))(
      atlas[0],
    )
)
