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

const onLazy = (o?: FunRouterOptions<any>) =>
async (
  p: Petition,
): Promise<(ctx: Request) => Promise<Response> | Response> => {
  // Define `func` as `null` to reduce unnecessary operations on instantiation
  let func: ((req: Request) => Promise<Response> | Response) | null = null;

  return async (r: Request) => {
    // Only call `compose` if `func` has not been set
    if (!func) {
      func = await compose(o)({
        ...p,
        lazy: false,
      });
    }

    return func(r);
  };
};

const compose = (o?: FunRouterOptions<any>) =>
async (
  p: Petition,
): Promise<(ctx: Request) => Promise<Response> | Response> => {
  // Ensuring options from Petition has priority
  o = p.o ?? o ?? {};

  if (p.lazy) {
    return await onLazy(o)(p);
  }

  return ((isUsing) =>
    (
      async (table) =>
        typeof p.onError === "function"
          ? onError(table.isAsync)(
            await resolveF(o)(table)(p)(isUsing) as (
              ctx: Request,
            ) => Response,
          )(
            getApplyTo(table.isAsync)()(p.onError)(
              await linker(o)({
                ...p,
                f: p.onError,
                onError: undefined,
                applyTo: {
                  type: "onError",
                },
              })(
                tools.isUsing(o)({ ...p, f: p.onError, onError: undefined }),
              ),
            ),
          )
          : await resolveF(o)(table)(p)(isUsing) as (
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
};

const resolveF =
  (o?: FunRouterOptions<any>) =>
  (table: Table) =>
  (p: Petition) =>
  async (isUsing: string[]) => {
    switch (p.type) {
      // Standard method
      case "add":
        if (table.headers !== null) {
          return getMethodForAdd(table.isAsync || table.asyncResolve)(
            table.headers ? true : false,
          ) //@ts-ignore
          (table.headers)(p.f)(await linker(o)(p)(isUsing));
        }
        return getMethodForAdd(table.isAsync || table.asyncResolve)(
          table.headers ? true : false,
        ) //@ts-ignore
        (p.f)(await linker(o)(p)(isUsing));

        // Wraps in Request
      case "base":
        if (table.headers) {
          return getBody(table.isAsync || table.asyncResolve)(
            table.headers ? true : false,
          )()(table.headers)(p.f)(
            await linker(o)(p)(isUsing),
          );
        }

        return getBody(table.isAsync || table.asyncResolve)(
          table.headers ? true : false,
        )()(p.f)(
          await linker(o)(p)(isUsing),
        );

      default:
        return getResponse(table.isAsync || table.asyncResolve)()(p.f)(
          await linker(o)(p)(isUsing),
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

// On error wraps

const getApplyTo = (isAsync: boolean) =>
  isAsync
    //@ts-ignore-start
    ? () => (f) => (context) => (request) => async (error) =>
      await f(await context(request)(error))
    //@ts-ignore
    : () => (f) => (context) => (request) => (error) =>
      f(context(request)(error));

const onError = (isAsync: boolean) => isAsync ? asyncOnError : syncOnError;

const asyncOnError =
  (f: (f: Request) => Promise<Response> | Response) =>
  (m: (f: Request) => (b: unknown) => Promise<Response> | Response) =>
  async (r: Request) => {
    try {
      return await f(r);
    } catch (error) {
      return await m(r)(error);
    }
  };

const syncOnError =
  (f: (f: Request) => Response) =>
  (m: (f: Request) => (b: unknown) => Response) =>
  (r: Request) => {
    try {
      return f(r);
    } catch (error) {
      return m(r)(error);
    }
  };
export default compose;
