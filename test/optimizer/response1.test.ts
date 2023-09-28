import assert from "node:assert";
import test from "node:test";
import response from "../../optimizer/response.ts";

test(
  "Response response",
  async (_) =>
    assert.deepStrictEqual(
      await (response()({
        path: "/hello/:id",
        f: (f) => JSON.stringify(f.param),
      })(new Request("http://localhost:8080/hello/hello"))).text(),
      '{"id":"hello"}',
    ),
);
test(
  "Response response",
  async (_) =>
    assert.deepStrictEqual(
      await (response()({
        path: "/hello/:id",
        type: "request",
        f: (f) => new Response(JSON.stringify(f.param)),
      })(new Request("http://localhost:8080/hello/hello"))).text(),
      '{"id":"hello"}',
    ),
);

// test(
//   "Response response",
//   async (_) =>
//     assert.deepStrictEqual(
//       await (await (response()({
//         path: "/",
//         json: {
//           scheme: {
//             type: "object",
//             properties: {
//               hello: {
//                 type: "string",
//               },
//             },
//           },
//         },
//         f: () => ({ hello: "world" }),
//       })(new Request("http://localhost:8080/")))).text(),
//       `{"hello":"world"}`,
//     ),
// );

// test(
//   "Response response",
//   async (_) =>
//     assert.deepStrictEqual(
//       await (await (response()({
//         path: "/",
//         json: {
//           scheme: {
//             type: "object",
//             properties: {
//               hello: {
//                 type: "number",
//               },
//             },
//           },
//         },
//         f: () => ({ hello: 1 }),
//       })(new Request("http://localhost:8080/")))).text(),
//       `{"hello":1}`,
//     ),
// );
