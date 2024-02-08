import assert from "node:assert";
import test from "node:test";
import methods from "../../../src/framework/builder/composer/methods1.ts";

test(
  "composer",
  (_) =>
    ((f) =>
      assert.deepStrictEqual(
        [
          f[0]("http://localhost:8080/"),
          f[0]("http://localhost:8080/test"),
          f[0]("http://localhost:8080/test/"),
          f[0]("http://localhost:8080/notfound/"),
        ],
        [0, 1, 2, 10],
      ))(
        methods({ hasName: "http://localhost:8080/" })(
          [
            [
              "GET",
            ],
            [
              [
                1,
                2,
                4,
              ],
            ],
            [
              [
                ["/", "/test"],
                ["/test/"],
                ["test/:id/:hi/"],
              ],
            ],
            [],
            [],
          ],
        )(0)(10)(6),
      ),
);


test(
  "composer",
  (_) =>
    ((f) =>
      assert.deepStrictEqual(
       [
          f[0]("http://localhost:8080/"),
          f[0]("http://localhost:8080/test"),
          f[0]("http://localhost:8080/test/"),
          f[0]("http://localhost:8080/notfound/"),
        ],
        [5, 6, 7, 10],
      ))(
        methods({ hasName: "http://localhost:8080/" })(
          [
            [
              "GET",
            ],
            [
              [
                1,
                2,
                4,
              ],
            ],
            [
              [
                ["/", "/test"],
                ["/test/"],
                ["test/:id/:hi/"],
              ],
            ],
            [],
            [],
          ],
        )(5)(10)(6),
      ),
);

test(
  "composer",
  (_) =>
    ((f) =>
      assert.deepStrictEqual(
        [
          f[0]("http://localhost:8080/"),
          f[0]("http://localhost:8080/test"),
          f[0]("http://localhost:8080/test/"),
          f[0]("http://localhost:8080/notfound/"),
        ],
        [0, 1, 2, 10],
      ))(
        methods({ hasName: "http://localhost:8080/" })(
          [
            [
              "GET",
            ],
            [
              [
                1,
                2,
                4,
              ],
            ],
            [
              [
                ["/", "/test"],
                ["/test/"],
                ["test/:id/:hi/"],
              ],
            ],
            [],
            [
              [
                "GET",
              ],
              [
                [
                  1,
                  2,
                  4,
                ],
              ],
              [
                [
                  ["/", "/test"],
                  ["/test/"],
                  ["test/:id/:hi/"],
                ],
              ],
              [],
              [],
            ],
          ],
        )(0)(10)(6),
      ),
);

test(
  "composer",
  (_) =>
    ((f) =>
      assert.deepStrictEqual(
        [
          f[0]("http://localhost:8080/"),
          f[0]("http://localhost:8080/test"),
          f[0]("http://localhost:8080/test/"),
          f[0]("http://localhost:8080/notfound/"),
        ],
        [5, 6, 7, 10],
      ))(
        methods({ hasName: "http://localhost:8080/" })(
          [
            [
              "GET",
            ],
            [
              [
                1,
                2,
                4,
              ],
            ],
            [
              [
                ["/", "/test"],
                ["/test/"],
                ["test/:id/:hi/"],
              ],
            ],
            [],
            [
              [
                "GET",
              ],
              [
                [
                  1,
                  2,
                  4,
                ],
              ],
              [
                [
                  ["/", "/test"],
                  ["/test/"],
                  ["test/:id/:hi/"],
                ],
              ],
              [],
              [],
            ],
          ],
        )(5)(10)(6),
      ),
);
