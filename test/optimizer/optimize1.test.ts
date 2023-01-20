// import { assertEquals } from "https://deno.land/std@0.160.0/testing/asserts.ts";
// import optimizer from "../../optimizer/optimize1.ts";

// Deno.test(
//     "Params",
//     (_) =>
//       assertEquals(
//         optimizer({})([
//             { type: "response", path: "/", r: (_) => new Response("hello world") },
//             {
//               type: "response",
//               path: "/a/b/c/d/e/f/g/",
//               r: (_) => new Response("hello world2"),
//             },
//             {

//               path: "/test/:id",
//               f: (f) => f.param.id,
//             },
//             {

//               path: "/test",
//               f: (f) => (f.query?.hello || ""),
//             },
//             {

//               path: "/test/both/:id",

//               f: (f) => f.param.id + " " + (f.query?.hello || ""),
//             },
//             {

//               path: "/test/mul/:a/:b/:c",

//               f: (f) => f.param.b,
//             },
//             {

//               path: "/test/mul2/:a/:b/:c",

//               f: (f) => f.param.b + " " + (f.query?.e || ""),
//             },
//             {

//               path: "/q",
//               f: (f) => (f.query?.e || ""),
//             },
//           ]),
//         null
//       ),
//   );
