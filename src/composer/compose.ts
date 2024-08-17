import type { FunRouterOptions } from "../options.ts";
import type { Petition } from "../morphism.ts";
import { parse, stringToFunction } from "../components/cors/mainCORS.ts";
import tools from "./composerTools.ts";
import linker from "./linker.ts";
import mime from "../util/mime.ts";
import { isThrowable } from "./throws.ts";

export default (o?: FunRouterOptions<any>) =>
(p: Petition): (ctx: Request) => Promise<Response> | Response =>
  ((elementsUsed) =>
    (
      (table) =>
        ((composition) =>
          isThrowable(p)(
            // Unfolds the compostion based on if it has headers or not
            table.headers
              ? composition(table.headers)(p.f)(
                linker(o)(p)(elementsUsed),
              ) as (req: Request) => Response
              : composition(p.f)(
                linker(o)(p)(elementsUsed),
              ) as (req: Request) => Response,
          ))(
            /**
             * Brings the right template for `f`, joing it with headers and
             * wrapping it on a Promise if `ctx` or `f` is Sync
             */

            p.type === "request" || p.type === "morphism" ||
              typeof p.type === "undefined"
              ? returnsAny(table.async || table.asyncResolve)()
              : wrapInResponse(table.async || table.asyncResolve)(
                table.headers ? true : false,
              )(),
          )
    )(
      /**
       * This table helps thw following funtions to get access to the variables
       *
       *  - `async` : checks if this `Petition` is asynn
       *  - `asyncResolve` : does the same but for any nested `resolve`
       *  - `headers` : checks and join the headers from `options` and `Petition`
       */
      {
        async: tools.localAsync(o)(p)(elementsUsed),
        asyncResolve: tools.recursiveCheckAsync(p),
        headers: typeof p.headings === "object" || typeof o?.cors === "object"
          ? {
            ...p.headings,
            headers: joinHeaders(o)(p),
          }
          : null,
      },
    ))(
      /**
       *  It basically gets what this `Petition` is using
       */
      tools.isUsing(o)(p),
    );

// Tools

const maybeOfArray = (arr?: [string, string]) => arr ? arr[1] : "text/html";

const joinHeaders = (o?: FunRouterOptions<any>) => (p: Petition) => {
  const fromPetition = typeof p.headings === "object"
    ? typeof p.headings?.headers == "string"
      ? {
        "Content-Type": maybeOfArray(
          mime.find((x) => x[0] === p.headings?.headers),
        ),
      }
      : p.headings.headers
    : {};

  const fromCORS = typeof o?.cors === "object"
    ? stringToFunction(parse()(o.cors))()
    : {};

  return {
    ...fromCORS,
    ...fromPetition,
  };
};

const wrapInResponse = (isAsync: boolean) => (hasHeaders: boolean) =>
  isAsync
    ? hasHeaders
      //@ts-ignore
      ? () => ((h) => (f) => (c) => async (r: Request) =>
        new Response(await f(await c(r)), h))
      //@ts-ignore
      : () => ((f) => (c) => async (r: Request) =>
        new Response(await f(await c(r))))
    : hasHeaders
    //@ts-ignore
    ? () => ((h) => (f) => (c) => (r: Request) => new Response(f(c(r)), h))
    //@ts-ignore
    : () => ((f) => (c) => (r: Request) => new Response(f(c(r))));

const returnsAny = (isAsync: boolean) =>
  isAsync
    //@ts-ignore
    ? () => ((f) => (c) => async (r: Request) => await f(await c(r)))
    //@ts-ignore
    : () => ((f) => (c) => (r: Request) => f(c(r)));
