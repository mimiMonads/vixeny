import { assertEquals } from "https://deno.land/std@0.160.0/testing/asserts.ts";
import response from "../../optimizer/response1.ts";

Deno.test(
  "Response response",
  async (_) =>
    assertEquals(
      await (await (response()({
        path: "/hello/:id",
        f: (f) => JSON.stringify(f.param),
      })(new Request("http://localhost:8080/hello/hello")))).text(),
      `{"id":"hello"}`,
    ),
);

Deno.test(
  "Response response",
  async (_) =>
    assertEquals(
      await (await (response()({
        path: "/",
        json: {
          scheme: {
            type: "object",
            properties: {
              hello: {
                type: "string",
              },
            },
          },
        },
        f: () => ({ hello: "world" }),
      })(new Request("http://localhost:8080/")))).text(),
      `{"hello":"world"}`,
    ),
);

Deno.test(
  "Response response",
  async (_) =>
    assertEquals(
      await (await (response()({
        path: "/",
        json: {
          scheme: {
            type: "object",
            properties: {
              hello: {
                type: "number",
              },
            },
          },
        },
        f: () => ({ hello: 1 }),
      })(new Request("http://localhost:8080/")))).text(),
      `{"hello":1}`,
    ),
);
