import {
  ArrayFiler,
  ArraySwap,
  funRouterOptions,
  RouteTypes,
} from "../types.ts";

export default (o?: funRouterOptions) => (a: RouteTypes[]): ArrayFiler =>
  (
    (fl) =>
      (
        (sp) => [
          fl
            .map((x) => [x[1].split("/"), x[0], x[1], x[2]])
            .map((x) =>
              [x[0].length - 1, x[0], x[1], x[2], x[3]] as [
                number,
                string[],
                RouteTypes[0],
                RouteTypes[1],
                RouteTypes[2],
              ]
            )
            .map((x) =>
              [
                 x[0],
                ((y) =>
                  ((a) =>
                    a.length <= 1 ? a.join("") : a[0] + a.slice(1).join("/"))(
                      x[1]
                        .filter((z) => z[0] !== y),
                    ))(
                    typeof o?.paramsStartsWith === "string"
                      ? o?.paramsStartsWith
                      : ":",
                  ),
                x[2],
                x[4],
              ] as ArraySwap
            ),
          sp,
        ]
      )(
        a.filter((x) => typeof x[3] === "string") as RouteTypes[],
      )
  )(
    a.filter((x) => x[3] === false),
  );
