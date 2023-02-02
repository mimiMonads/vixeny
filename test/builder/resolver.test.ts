// import { assertEquals } from "https://deno.land/std@0.160.0/testing/asserts.ts";
// import resolver from "../../builder/resolver.ts";
// import atlas from "../../builder/atlas.ts";
// import paths from "../util/paths.ts";
// import arraySwap from "../../builder/arraySwap.ts";
// import optimize from "../../optimizer/optimize.ts";

// Deno.test(
//   "resolver",
//   _ =>
//     (
//       a =>
//       assertEquals(
//         [
//           a(new Request("http://localhost:8080/notFound/")),
//           a(new Request("http://localhost:8080/test")),
//           a(new Request("http://localhost:8080/")),
//           a(new Request("http://localhost:8080/test/2"))
//         ],
//         [
//           7,
//           0,
//           1,
//           2
//         ],
//       )  

//     )(
//       resolver()(atlas()(arraySwap()(optimize()(paths)))),
//     )
// )

