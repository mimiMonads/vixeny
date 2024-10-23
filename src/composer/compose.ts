import type { FunRouterOptions } from "../options.ts";
import type { Petition, WithPlugins } from "../morphism.ts";
import { parse, stringToFunction } from "../components/cors/mainCORS.ts";
import tools from "./composerTools.ts";
import linker from "./linker.ts";
import mime from "../util/mime.ts";

type Table = {
  isAsync: boolean;
  asyncResolve: boolean;
  headers: ResponseInit | null;
};

type CTX = WithPlugins<any, any, any, any, any, any, any, any, any>;

export default (o?: FunRouterOptions<any>) =>
(p: Petition): (ctx: Request) => Promise<Response> | Response =>
  ((isUsing) =>
    (
      (table) =>
        resolveF(o)(table)(p)(isUsing) as (
          ctx: Request,
        ) => Promise<Response> | Response
    )(
      //elements int table
      {
        isAsync: tools.localAsync(o)(p)(isUsing),
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

const resolveF =
  (o?: FunRouterOptions<any>) =>
  (table: Table) =>
  (p: Petition) =>
  (isUsing: string[]) => {
    switch (p.type) {
      // Standart method
      case "add":
        return getMethodForAdd(table.isAsync || table.asyncResolve)(
          table.headers ? true : false,
        ) //@ts-ignore
        (p.f)(linker(o)(p)(isUsing));

        // Wraps in Request
      case "base":
        if (table.headers) {
          return getBody(table.isAsync || table.asyncResolve)(
            table.headers ? true : false,
          )()(table.headers)(p.f)(
            linker(o)(p)(isUsing),
          );
        }

        return getBody(table.isAsync || table.asyncResolve)(
          table.headers ? true : false,
        )()(p.f)(
          linker(o)(p)(isUsing),
        );

      // Passes value, mainly used for `resolve` and `branch`
      default:
        return getResponse(table.isAsync || table.asyncResolve)()(p.f)(
          linker(o)(p)(isUsing),
        );
    }
  };

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
      ? () => ((headers) => (f) => (context) => async (request: Request) =>
        new Response(await f(await context(request)), headers))
      //@ts-ignore
      : () => ((f) => (context) => async (request: Request) =>
        new Response(await f(await context(request))))
    : hasHeaders
    //@ts-ignore
    ? () => ((headers) => (f) => (context) => (request: Request) =>
      new Response(f(context(request)), headers))
    //@ts-ignore
    : () => ((f) => (context) => (request: Request) =>
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
    r: CTX,
  ) => Response | BodyInit | Promise<Response> | Promise<BodyInit>,
) =>
(context: (r: Request) => CTX) =>
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
