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


Deno.test("functionName basic test", () => {
  assertEquals(
    map([
      [
        ["a", "b"],
        ["c"],
      ],
      [
        ["d"],
        ["e", "f"],
      ],
    ]),
    [
      [0, 2],
      [3, 4],
    ]
  );
});

Deno.test("functionName edge case test", () => {
  assertEquals(
    map([
      [
        ["a"],
        ["b"],
      ],
      [
        ["c"],
        ["d"],
      ],
    ]),
    [
      [0, 1],
      [2, 3],
    ]
  );
});



Deno.test("functionName edge case test", () => {
  assertEquals(
    map([
      [
        [ "/count", "/hello_world", "/random_number" ]
      ],
      [
        [ "/plus_1", "/minus_1" ]
      ]
    ]),
    [
      [0],
      [3],
    ]
  );
});


