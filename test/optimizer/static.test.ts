// import { assertEquals } from "https://deno.land/std@0.160.0/testing/asserts.ts";
// import staticFiles from "../../optimizer/staticFiles.ts";

// Deno.test(
//   "staticFiles",
//   async (_) =>
//     assertEquals(
//       JSON.parse(
//         await (staticFiles({})({ type: "static", name: "/s", path: "./" })(
//           new Request("http://localhost:8080/s/people.json"),
//         )) as unknown as string,
//       ),
//       [
//         { "id": 1, "name": "John", "age": 23 },
//         { "id": 2, "name": "Sandra", "age": 51 },
//         { "id": 5, "name": "Devika", "age": 11 },
//       ],
//     ),
// );
