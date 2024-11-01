import * as plugins from "../../exportable/plugin.ts";
import { f as cookieParser } from "../cookies/mainCookies.ts";
import type { Petition } from "../../morphism.ts";
import type { CyclePluginType } from "../../exportable/plugin.ts";

interface InnerElement {
  lastUsed: {
    get: () => number;
    update: () => number;
  };
}

type RealType<T extends Record<string, unknown>> = T & InnerElement;

type SessionType<
  T extends Record<string, unknown>,
  R = RealType<T>,
> = {
  valid: boolean;
  this: () => R | undefined;
  get: <K extends keyof R>(key: K) => R[K] | undefined;
  set: (
    session: R,
  ) => boolean;
  deleteThis: () => boolean;
  newSession: (
    session: T,
  ) => string;
};

const lastUsed = (n = performance.now()) => ({
  get: () => n,
  update: () => n = performance.now(),
});

const mapper = <
  T extends Record<string, unknown>,
  R = unknown,
>(map: Map<string, R>) =>
(cookieToSeacrh = "session") =>
(tolerance: number) =>
(p: Petition) => {
  //Using vixeny cookie implementation
  const findCookie = cookieParser()({
    ...p,
    cookie: {
      only: [cookieToSeacrh],
    },
  });

  return (r: Request) => ((
    (cookie) => ({
      // Checks the headers have a cookie and update it
      valid: typeof cookie === "string"
        ? (
          (maybe) =>
            typeof maybe !== "undefined"
              //@ts-ignore
              ? void (maybe.lastUsed.get() + tolerance >
                  //@ts-ignore
                  maybe.lastUsed.update())
                ? !map.delete(cookie)
                : true
              : false
        )(
          map.get(cookie),
        )
        : false,
      // Returns the current object hold by the map
      this: () => typeof cookie === "string" ? map.get(cookie) : undefined,
      // Returns just a key
      get: <K extends keyof R>(key: K) =>
        typeof cookie === "string"
          ? ((maybe) => maybe ? maybe[key] : undefined)(map.get(cookie))
          : undefined,
      // Updates the whole session
      set: (value: R): undefined =>
        typeof cookie === "string" ? void map.set(cookie, value) : undefined,
      // Deletes the current session
      deleteThis: () =>
        typeof cookie === "string" ? void map.delete(cookie) : undefined,
      // Creates a session
      newSession: (session: T) =>
        ((uuid) => (
          map.set(uuid, {
            ...session,
            // Creates an object to observe the use of the session
            lastUsed: lastUsed(),
          } as R),
            // Returns the uuid
            uuid
        ))(crypto.randomUUID()),
    })
  )(
    // Checks if the cookie exist
    findCookie(r.headers.get("cookie"))[cookieToSeacrh],
  ));
};

// Checks for all session if the performance now it more than the last time used (adding the tolerance)
const deleteUnusedSession =
  <T extends Record<string, unknown> & InnerElement>(map: Map<string, T>) =>
  (tolerance: number) =>
  () =>
    (
      (per) =>
        map.forEach((session, k) =>
          per > session.lastUsed.get() + tolerance
            ? void map.delete(k)
            : undefined
        )
    )(
      performance.now(),
    );

/**
 * Native plugin for sessions
 */
const session = <
  T extends Record<string, unknown>,
  R = RealType<T>,
>(opt?: {
  removeDeleteUnusedSession?: true;
  tolerance?: number;
  autoDeleteTolerance?: number;
  injectMap?: Map<string, R>;
}): CyclePluginType<
  false,
  false,
  SessionType<any, any>,
  SessionType<any, any>
> => {
  // Declaring  map
  const sym = Symbol("session");
  const map = opt?.injectMap ?? new Map<string, R>();

  // To cleannd the whole map
  if (!opt?.removeDeleteUnusedSession) {
    setInterval(
      deleteUnusedSession(
        //@ts-ignore
        map,
      )(opt?.tolerance ?? 300000),
      // Tolerance + AutoDeleteTolerance
      (opt?.tolerance ?? 300000) + (opt?.autoDeleteTolerance ?? 300000),
    );
  }

  return plugins.default.type({
    name: sym,
    type: {} as unknown,
    isFunction: false,
    f: (ctx) => {
      return mapper<T, R>(map)()(opt?.tolerance ?? 300000)(ctx.getPetition());
    },
  }) as unknown as CyclePluginType<
    false,
    false,
    SessionType<any, any>,
    SessionType<any, any>
  >;
};

export { session };
