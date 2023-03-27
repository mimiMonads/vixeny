import { funRouterOptions, RouteTypes } from "../../types.ts";

// (
//     ((a: string[]) => ((o) => (s: string) => o.indexOf(s))(a.map((x) => x)))(
//       atlas[0],
//     )

export default 
 (_o?: funRouterOptions) => (max: number) => (ar: RouteTypes[]) =>

