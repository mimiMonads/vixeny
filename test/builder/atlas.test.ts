import { assertEquals } from "https://deno.land/std@0.160.0/testing/asserts.ts";
import arraySwap from "../../builder/arraySwap.ts";
import atlas from "../../builder/atlas.ts";
import optimize from "../../optimizer/optimize.ts";
import paths from "../util/paths.ts";

Deno.test(
  "Atlas",
  (_) =>
    assertEquals(
      ((r) => [r[0], r[1], r[2]])(
        atlas()(arraySwap()(optimize()(paths))),
      ),
      [
        [
          "GET",
          "POST",
          "HEAD",
          "DELETE",
        ],
        [
          [
            1,
            2,
            4,
          ],
          [
            1,
          ],
          [
            1,
          ],
          [
            1,
          ],
        ],
        [
          [
            ["test", ""],
            ["test/"],
            ["test/"],
          ],
          [
            [""],
          ],
          [
            [""],
          ],
          [
            [""],
          ],
        ],
      ],
    ),
);

// Deno.test(
//   "Atlas",
//   (_) =>
//     assertEquals(
//       ((r) => [r[1], r[2]])(
//         atlas()(
//           arraySwap()(
//             optimize()([
//               {
//                 type: "request",
//                 path: "/",
//                 r: (f) => new Response("hello world"),
//               },
//               {
//                 type: "params",
//                 path: "/test/:id",
//                 param: {
//                   elements: ["id"],
//                 },
//                 r: (f) => f.param.id,
//               },
//               {
//                 type: "query",
//                 path: "/test",
//                 r: (f) => (f.query?.hello || ""),
//               },
//               {
//                 type: "paramsAndQuery",
//                 path: "/test/both/:id",
//                 param: {
//                   elements: ["id"],
//                 },
//                 r: (f) => f.param.id + " " + (f.query?.hello || ""),
//               },
//               {
//                 type: "paramsAndQuery",
//                 path: "/test/mul/:a/:b/:c",
//                 param: {
//                   elements: ["b"],
//                 },
//                 r: (f) => f.param.b + " " + (f.query?.e || ""),
//               },
//               {
//                 type: "query",
//                 path: "/q",
//                 r: (f) => (f.query?.e || ""),
//               },
//             ]),
//           ),
//         ),
//       ),
//       null,
//     ),
// );
