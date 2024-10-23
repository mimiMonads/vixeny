import type { FunRouterOptions } from "../options.ts";
import type { Petition } from "../morphism.ts";
import { parse, stringToFunction } from "../components/cors/mainCORS.ts";
import tools from "./composerTools.ts";
import linker from "./linker.ts";
import mime from "../util/mime.ts";

type Table = {
  isAsync: boolean,
  asyncResolve: boolean,
  headers: ResponseInit | null
}
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

const resolveF = (t:Table) => (p:Petition) => {
  switch (p.type) {
    case 'add':
      return getMethodForAdd(t.isAsync)
        (t.headers ? true : false)
    case 'response':
  
    default:
      break;
  }
}

const maybeOfArray = (arr?: [string, string]) => arr ? arr[1] : "text/html";

// Creating static headers
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



// Old system
const getBody = (isAsync: boolean) => (hasHeaders: boolean) =>
  isAsync
    ? hasHeaders
      //@ts-ignore
      ? () => ((headers) => (f) => (context) => async (request) =>
        new Response(await f(await context(request)), headers))
      //@ts-ignore
      : () => ((f) => (context) => async (request) =>
        new Response(await f(await context(request))))
    : hasHeaders
    //@ts-ignore
    ? () => ((headers) => (f) => (context) => (request) =>
      new Response(f(context(request)), headers))
    //@ts-ignore
    : () => ((f) => (context) => (request) =>
      new Response(f(context(request))));

const getResponse = (isAsync: boolean) =>
  isAsync
    //@ts-ignore-start
    ? () => ((f) => (context) => async (request) =>
      await f(await context(request)))
    //@ts-ignore
    : () => ((f) => (context) => (request) => f(context(request)));

// Add
const baseHeader: ResponseInit = {
  status: 200,
};

const getMethodForAdd = (isAsync: boolean) => (hasHeader: boolean) =>
  isAsync
    ? hasHeader ? methodForAsyncAdd() : methodForAsyncAdd()(baseHeader)
    : hasHeader
    ? methodForAdd()
    : methodForAdd()(baseHeader);

const methodForAdd =
  () => ((headers: ResponseInit) =>
  (f: (r: unknown) => Response | BodyInit) =>
  (context: (r: Request) => unknown) =>
  (request: Request): Response => {
    const result = f(context(request));

    return result instanceof Response ? result : new Response(result, headers);
  });

const methodForAsyncAdd = () => ((headers: ResponseInit) =>
(
  f: (
    r: unknown,
  ) => Response | BodyInit | Promise<Response> | Promise<BodyInit>,
) =>
(context: (r: Request) => unknown) =>
async (request: Request): Promise<Response> => {
  const result = await f(await context(request));

  return result instanceof Response ? result : new Response(result, headers);
});

const asyncMaybeOf =
  (f: (f: Request) => Promise<Response> | Response) =>
  (m: (f: Request) => (error: unknown) => Promise<Response> | Response) =>
  async (r: Request) => {
    try {
      return await f(r);
    } catch (error) {
      return await m(r)(error);
    }
  };
