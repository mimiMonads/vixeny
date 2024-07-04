import type { FunRouterOptions } from "../options.ts";
import type { RouteTypes } from "../router/types.ts";

import compose from "./compose.ts";
import staticFiles from "../staticFiles/staticFileMain.ts";
import { vixeny } from "../../main.ts";
import injectHtml from "./injectHtml.ts";
import type { fileServerPetition, Petition } from "../morphism.ts";

export default (
  o?: FunRouterOptions<any>,
): (routes: (Petition | fileServerPetition<any>)[]) => RouteTypes[] =>
(ar) =>
  ar
    .filter(
      (x) => !("active" in x && x.active === false),
    )
    .map(
      (x) =>
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
          ? [
            "GET",
            x.name + "*",
            vixeny({
              ...o,
              stateFlags: {
                ...(o && o?.stateFlags ? o.stateFlags : {}),
                isFileServer: true,
                ...("slashIs" in x && typeof x.slashIs === "string"
                  ? { slashIs: x.slashIs }
                  : {}),
              },
            })(
              staticFiles(
                //this curried is for debbuing purposes
              )(x),
            ),
            "static",
          ] as RouteTypes
          : [
            x?.method ? x.method : "GET",
            x.path,
            o && o.debugging !== undefined &&
              typeof o.debugging.injectHtml == "string"
              ? async (r: Request) =>
                await injectHtml(o.debugging!.injectHtml!)(
                  compose(o)(x)(r),
                )
              : compose(o)(x),

            false,
          ] as unknown as RouteTypes,
    ).concat(
      o && o.debugging !== undefined &&
        typeof o.debugging.injectHtml == "string"
        ? [[
          "GET",
          "/timestamp-for-reload",
          ((t) => () => new Response(t))(Date.now().toString()),
          false,
        ]]
        : [],
    );
