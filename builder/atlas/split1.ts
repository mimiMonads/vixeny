import { funRouterOptions, RouteTypes } from "../../types.ts";
import main1 from "./main1.ts";

export default (o?: funRouterOptions) =>
  (a: RouteTypes[]) =>
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
            main1(o)(
                [
                    (a.filter((x) => typeof x[3] === "string") as RouteTypes[]).map(
                        (x) => [x[1].split("/").length - 1, x[1], x[0], x[2]]
                      ),
                      []
                ]
            )
        )
    )(
      a.filter((x) => x[3] === false),
    );
    