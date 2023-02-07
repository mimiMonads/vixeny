import { assertEquals } from "https://deno.land/std@0.160.0/testing/asserts.ts";
import map from "../../../builder/atlas/map.ts";

Deno.test(
  "position",
  () =>
    assertEquals(
      map(
        [
          [
            ["/", "/test"],
            ["/test/"],
            ["/test/:id/:name/"],
          ],
          [
            ["/"],
          ],
          [
            ["/"],
          ],
          [
            ["/"],
          ],
        ],
      ),
      [
        [
          0,
          2,
          3,
        ],
        [
          4,
        ],
        [
          5,
        ],
        [
          6,
        ],
      ],
    ),
);

// [
//     [["/","/hello", "/test"],["/hello/", "/test/hello"],["/hello/:id/test/", "/test/:id/hello/"]],
//     [["/","/hello", "/test"],["/hello/", "/test/hello"],["/hello/:id/test/", "/test/:id/hello/"]],
//     [["/","/hello", "/test"],["/hello/", "/test/hello"],]
// ]
