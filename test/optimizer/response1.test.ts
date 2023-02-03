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

