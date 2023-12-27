import assert from "node:assert";
import test from "node:test";
import map from "../../../src/framework/builder/atlas/map.ts";

test(
  "position",
  () =>
    assert.deepStrictEqual(
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

test("functionName basic test", () => {
  assert.deepStrictEqual(
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
    ],
  );
});

test("functionName edge case test", () => {
  assert.deepStrictEqual(
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
    ],
  );
});

test("functionName edge case test", () => {
  assert.deepStrictEqual(
    map([
      [
        ["/count", "/hello_world", "/random_number"],
      ],
      [
        ["/plus_1", "/minus_1"],
      ],
    ]),
    [
      [0],
      [3],
    ],
  );
});
