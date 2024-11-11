import type { FunRouterOptions } from "../options.ts";
import type { RouteTypes } from "../router/types.ts";

import compose from "./compose.ts";
import staticFiles from "../staticFiles/staticFileMain.ts";
import { vixeny } from "../../main.ts";
import injectHtml from "./injectHtml.ts";
import type { fileServerPetition, Petition } from "../morphism.ts";




const awaitedRoute = (
  o?: FunRouterOptions<any>,
) =>  async (route: fileServerPetition<any>):Promise<RouteTypes> =>  {

  const func  = await vixeny({
    ...o,
    stateFlags: {
      ...(o && o?.stateFlags ? o.stateFlags : {}),
      isFileServer: true,
      ...("slashIs" in route && typeof route.slashIs === "string"
        ? { slashIs: route.slashIs }
        : {}),
    },
  })(
    staticFiles(o)(
      //this curried is for debbuing purposes
    )(route),
  )

    return [
      "GET",
      route.name + "*",
      func,
      'stactic' ]

};

export default (
  o?: FunRouterOptions<any>,
) => async (routes: (Petition | fileServerPetition<any>)[]) : Promise<RouteTypes[]> => {

  //@ts-ignore
  return   Promise.all(routes
    .filter(
      (x) => !("active" in x && x.active === false),
    )
    .map(
      async(x) =>
        x.type === "response"
          ? [
            x?.method ?? "GET",
            x.path,
            o && o.debugging !== undefined &&
              typeof o.debugging.injectHtml == "string"
              ? async (r: Request) =>
                //@ts-ignore
                await injectHtml(o.debugging!.injectHtml!)(x.r(r))
              : x.r,
            false,
          ] as unknown as RouteTypes
          : x.type === "fileServer"
          ? await awaitedRoute(o)(x)
          : [
            x?.method ? x.method : "GET",
            x.path,
            o && o.debugging !== undefined &&
              typeof o.debugging.injectHtml == "string"
              ? async (r: Request) =>
                await injectHtml(o.debugging!.injectHtml!)(
                   (await compose(o)(x))(r),
                )
              : await compose(o)(x),

            false,
          ]),
    )
  }
