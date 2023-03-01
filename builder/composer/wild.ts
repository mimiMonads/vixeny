import { funRouterOptions, RouteTypes } from "../../types.ts";

// (
//     ((a: string[]) => ((o) => (s: string) => o.indexOf(s))(a.map((x) => x)))(
//       atlas[0],
//     )

export default 
 (_o?: funRouterOptions) => (max: number) => (ar: RouteTypes[]) =>


// export default (_o?: funRouterOptions) => (max: number) => (ar: RouteTypes[]) =>
//       (
//         (nar) =>
//           (
//             (f) => f(nar)
//           )(
//             (ar: string[]) =>
//               (new Function(`return s=>${
//                 ar.reduceRight(
//                   (acc, v, i) => `s.indexOf("${v}")===0?${i + max - 2}:` + acc,
//                   "-1",
//                 )
//               }`))() as (s: string) => number,
//           )
//       )(
//         ar.map(([_, a]) => a.slice(1))
//           .sort((a, b) => b.length - a.length),
//       );