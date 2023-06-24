import { assertEquals } from "https://deno.land/std@0.160.0/testing/asserts.ts";
import methods from "../../../builder/composer/methods1.ts";

Deno.test(
  "composer",
  (_) =>
    ((f) =>
      assertEquals(
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
        )(0)(10),
      ),
);

Deno.test(
  "composer",
  (_) =>
    ((f) =>
      assertEquals(
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
        )(5)(10),
      ),
);



Deno.test(
  "composer",
  (_) =>
    ((f) =>
      assertEquals(
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
        )(0)(10),
      ),
);

Deno.test(
  "composer",
  (_) =>
    ((f) =>
      assertEquals(
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
        )(5)(10),
      ),
);
