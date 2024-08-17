import type { Petition } from "../morphism.ts";

const genericError = new Response(null, {
  status: 500,
});

const throwable =
  (f: (r: Request) => Response | Promise<Response>) => (r: Request) => {
    try {
      return f(r);
    } catch (e) {
      if (e instanceof Response) {
        return e;
      }

      return genericError.clone();
    }
  };

const asyncThrowable =
  (f: (r: Request) => Response | Promise<Response>) => async (r: Request) => {
    try {
      return await f(r);
    } catch (e) {
      if (e instanceof Response) {
        return e;
      }

      return genericError.clone();
    }
  };

/**
 * Wraps the function has `throws`
 */
const isThrowable =
  (p: Petition) => (f: (r: Request) => Response | Promise<Response>) =>
    p.throws
      ? p.f.constructor.name === "AsyncFunction"
        ? asyncThrowable(f)
        : throwable(f)
      : f;

export { isThrowable };
