import type { FunRouterOptions } from "../options.ts";
import type { RouteTypes } from "../router/types.ts";

import compose from "./compose.ts";
//import staticFiles from "./staticFiles/main.ts";
//import vixeny from "../../../serve.ts";
import injectHtml from "./injectHtml.ts";
import type { fileServerPetition, Petition } from "../morphism.ts";

export default (
  o?: FunRouterOptions,
): (routes: (Petition)[]) => RouteTypes[] =>
(ar) =>
  ar
    .map(
      (x) =>
        x.type === "response"
          ? [
            x?.method ?? "GET",
            x.path,
            o && o.enableLiveReloading
              //@ts-ignore
              ? async (r: Request) => await injectHtml(x.r(r))
              : x.r,
            false,
          ] as unknown as RouteTypes
          // [
          //   "GET",
          //   x.name + "*",
          //   vixeny({
          //     ...o,
          //     stateFlags: {
          //       ...(o && o?.stateFlags ? o.stateFlags : {}),
          //       isFileServer: true,
          //       ...("slashIs" in x && typeof x.slashIs === "string"
          //         ? { slashIs: x.slashIs }
          //         : {}),
          //     },
          //   })(staticFiles(x)),
          //   "static",
          // ] as RouteTypes
          // :
          : [
            x?.method ? x.method : "GET",
            x.path,
            o && o.enableLiveReloading
              ? async (r: Request) =>
                await injectHtml()(
                  compose(o)(x)(r),
                )
              : compose(o)(x),

            false,
          ] as unknown as RouteTypes,
    ).concat(
      o && o.enableLiveReloading
        ? [[
          "GET",
          "/timestamp-for-reload",
          ((t) => () => new Response(t))(Date.now().toString()),
          false,
        ]]
        : [],
    );
