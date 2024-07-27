import { components, plugins, wrap } from "./main.ts";
import type { Petition } from "./src/morphism.ts";
import { bench, run } from "mitata";

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
  const findCookie = components.cookie()({
    ...p,
    cookie: {
      only: [cookieToSeacrh],
    },
  });

  return (r: Request) =>
    ((
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
    )) as unknown as SessionType<T>;
};

// Checks for all session if the performance now it more than the last time used (adding the tolerance)
const deleteUnsedSession =
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

const session = <
  T extends Record<string, unknown>,
  R = RealType<T>,
>(opt?: {
  removeDeleteUnsedSession?: true;
  tolerance?: number;
  autoDeleteTolerance?: number;
  injectMap?: Map<string, R>;
}) => {
  // Decalring  map
  const sym = Symbol("session");
  const map = opt?.injectMap ?? new Map<string, R>();

  // To cleannd the whole map
  if (!opt?.removeDeleteUnsedSession) {
    setInterval(
      deleteUnsedSession(
        //@ts-ignore
        map,
      )(opt?.tolerance ?? 300000),
      // Tolerance + AutoDeleteTolerance
      (opt?.tolerance ?? 300000) + (opt?.autoDeleteTolerance ?? 300000),
    );
  }

  return plugins.type({
    name: sym,
    type: {} as unknown,
    f: () => (p) => {
      return mapper<T, R>(map)()(opt?.tolerance ?? 300000)(p);
    },
  });
};

// Plugin
const user = session<{ hello: string }>({
  removeDeleteUnsedSession: true,
});


const handler = wrap({
  cyclePlugin: {
    user,
  },
})()
  .stdPetition({
    path: "/",
    f: ({ user }) => {
      return user.newSession({ hello: "hi" });
    },
  })
  .stdPetition({
    path: "/only",
    options: {
      only: ["user"],
    },
    f: () => "hi",
  })
  .compose();

const req = new Request("http://localhost/");

const token = await Promise.resolve(handler(req))
  .then((res) => res.text());

// Valid session
const toBench = new Request("http://localhost/only", {
  headers: {
    Cookie: "session=" + token,
  },
});

bench("createSession", async () => await handler(req));
bench("accessSession", async () => await handler(toBench));

run();
