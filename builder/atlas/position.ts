import { funRouterOptions } from "../../types.ts";

export default (_o?: funRouterOptions) =>
  (m: number[][]) =>
    (c: string[][][]) =>
      ((h) =>
        ((j) =>
          h.map(
            (x, i) =>
              ((a) =>
                m[i][0] === 1 || m[i][0] === 0
                  ? a.map((y, a) => a === 0 && i === 0 ? 0 : y)
                  : ([0].concat(a.map((x) => x + 1))).slice(0, -1))(
                  x.map(
                    (y, a, b) =>
                      y + (i === 0
                        ? b.reduce(
                          (acc, y, u) => a > u ? acc + y : acc,
                          -1,
                        )
                        : j.reduce((acc, y, u) => u < i ? acc + y : acc) - 1),
                  ),
                ),
          ))(
            h.map(
              (x) =>
                x
                  .map(
                    (y, i, a) =>
                      y +
                      a.reduce(
                        (acc, z, u) => i < u ? acc + z : acc,
                        0,
                      ),
                  )
                  .reduce((acc, y) => y > acc ? y : acc, 0),
            ),
          ))(
          c.map(
            (x) => x.map((y) => y.length),
          ),
        );
