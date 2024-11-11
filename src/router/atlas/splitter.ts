import type { FunRouterOptions } from "../../options.ts";
import type { RouteTypes } from "../types.ts";
import main1 from "./main1.ts";
import type { ArraySwap } from "../types.ts";
import type { PartialAtlas } from "./main1.ts";

//TODO: remake Split (before 0.3.0)
type Split = (
  o?: FunRouterOptions<any>,
) => (a: RouteTypes[]) => [ArraySwap[], PartialAtlas];

export default ((o?: FunRouterOptions<any>) => (a: RouteTypes[]) =>
  (
    (fl) =>
      (
        (sp) =>
          [
            fl.map(
              (
                x,
              ) => [
                x[1].split("/").length - 1,
                o && o.stateFlags && o.stateFlags.slashIs
                  ? (
                    (i) => i > -1 ? x[1].slice(0, i) : x[1]
                  )(x[1].indexOf(o.stateFlags.slashIs))
                  : x[1],
                x[0],
                x[2],
              ],
            ),
            sp,
          ] as [ArraySwap[], PartialAtlas]
      )(
        main1(o)(
          [
            (a.filter((x) =>
              typeof x[3] === "string" || x[1].at(-1) === "*"
            ) as RouteTypes[]).map(
              (
                x,
              ) => [
                x[1].slice(0, -1).split("/").length - 1,
                x[1].slice(0, -1),
                x[0],
                x[2],
              ],
            ),
            [],
          ],
        ),
      )
  )(
    a.filter((x) => x[3] === false && x[1].at(-1) !== "*"),
  )) as Split;
