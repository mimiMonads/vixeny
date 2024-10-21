import type { FunRouterOptions } from "../options.ts";
import type { Petition } from "../morphism.ts";
import { parse, stringToFunction } from "../components/cors/mainCORS.ts";
import tools from "./composerTools.ts";
import linker from "./linker.ts";
import mime from "../util/mime.ts";

export default (o?: FunRouterOptions<any>) =>
(p: Petition): (ctx: Request) => Promise<Response> | Response =>
  ((elementsUsed) =>
    (
      (table) =>
        ((composition) =>
          table.headers
            ? composition(table.headers)(p.f)(
              linker(o)(p)(elementsUsed),
            )
            : composition(p.f)(
              linker(o)(p)(elementsUsed),
            ))(
            p.type === "request" || p.type === "morphism" ||
              typeof p.type === "undefined"
              ? getResponse(table.async || table.asyncResolve)()
              : getBody(table.async || table.asyncResolve)(
                table.headers ? true : false,
              )(),
          )
    )(
      //elements int table
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
      tools.isUsing(o)(p),
    );

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

//maybe of an optimization
const getBody = (isAsync: boolean) => (hasHeaders: boolean) =>
  isAsync
    ? hasHeaders
      //@ts-ignore
      ? () => ((headers) => (f) => (context) => async (request) =>
        new Response(await f(await context(request)), headers))
      //@ts-ignore
      : () => ((f) => (context) => async (request) => new Response(await f(await context(request))))
    : hasHeaders
    //@ts-ignore
    ? () => ((headers) => (f) => (context) => (request) => new Response(f(context(request)), headers))
    //@ts-ignore
    : () => ((f) => (context) => (request) => new Response(f(context(request))));


const getResponse = (isAsync: boolean) => 
  isAsync
    //@ts-ignore
    ? () => ((f) => (context) => async (request) => await f(await context(request)))
    //@ts-ignore
    : () => ((f) => (context) => (request) => f(context(request)));
    
