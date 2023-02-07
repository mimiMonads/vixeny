import { ArrayFiler, funRouterOptions, RouteTypes } from "../../types.ts";

export default (o?: funRouterOptions) =>
  (a: RouteTypes[]): ArrayFiler =>
    (
      (fl) =>
        (
          (sp) => [
            fl.map(
              (x) => [x[1].split("/").length - 1, x[1], x[0], x[2]],
            ),
            sp,
          ]
        )(
          a.filter((x) => typeof x[3] === "string") as RouteTypes[],
        )
    )(
      a.filter((x) => x[3] === false),
    );
