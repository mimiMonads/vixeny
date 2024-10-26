import type { FileHandler } from "./components/io/mainIO.ts";
import composerTools from "./composer/composerTools.ts";
import type { CyclePluginMap, FunRouterOptions } from "./options.ts";
import type { ParamsMethod } from "./router/types.ts";

export type Petition = Morphism<
  {
    isAPetition: true;
    type: typeMorphism;
    hasPath: true;
    hasMaybe: true;
    specialVisible: true;
  },
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any
>;
export type ResolveMorphism = Morphism<
  {
    type: "morphism";
  },
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any
>;

/**
 * Types Morphisims
 */
export const petitions = {
  /**
   * Maybe implementation
   *
   * // TODO: add info
   *
   * @param {O} [options] - Optional configuration options that may include plugin settings.
   * @returns {Function} A function that accepts a Morphism defining an HTTP petition.
   *
   * @example
   * Example usage:
   * ```typescript
   * import { petitions } from 'vixeny';
   *
   * const =
   *
   * const standard = petitions.custom()({
   *   path: '/yourPath',
   *
   *   f: ctx => new Response(ctx.query.hello ?? 'queryNotFound')
   * });
   * ```
   */
  maybe: <
    FC extends CyclePluginMap,
    O extends FunRouterOptions<FC>,
  >(o?: O) =>
  <
    RM extends ResolveMap<any>,
    BM extends BranchMap<any>,
    QO extends QueryOptions,
    PO extends ParamOptions,
    RO extends O,
    CO extends CryptoOptions,
    AR = any,
    R = any,
  >(
    I: Morphism<
      {
        hasMaybe: true;
        specialVisible: true;
      },
      RM,
      BM,
      QO,
      PO,
      RO,
      CO,
      AR,
      R
    >,
  ) => ({
    ...I,
    o,
    thrush: {
      name: "maybe",
      value: "maybe(r)(b)",
      type: 0,
      isAsync: false,
    },
  }),
  /**
   * Enhances a function with additional typings for handling HTTP requests within the 'vixeny' framework.
   * This function binds the provided Morphism to the rules set by `composer`, producing a typed `Petition`.
   * The resulting function can be used with `wrap` or can be `composed`, and it's guaranteed to return a `Response` or `Promise<Response>`.
   *
   * @param {O} [options] - Optional configuration options that may include plugin settings.
   * @returns {Function} A function that accepts a Morphism defining an HTTP petition.
   *
   * @example
   * Example usage:
   * ```typescript
   * import { petitions } from 'vixeny';
   *
   * const standard = petitions.custom()({
   *   path: '/yourPath',
   *   f: ctx => new Response(ctx.query.hello ?? 'queryNotFound')
   * });
   * ```
   */
  custom: <
    FC extends CyclePluginMap,
    O extends FunRouterOptions<FC>,
  >(o?: O) =>
  <
    RM extends ResolveMap<any>,
    BM extends BranchMap<any>,
    QO extends QueryOptions,
    PO extends ParamOptions,
    RO extends O,
    CO extends CryptoOptions,
    AR = any,
    R = any,
  >(
    I: Morphism<
      {
        type: "request";
        hasPath: true;
        isAPetition: true;
        typeNotNeeded: true;
      },
      RM,
      BM,
      QO,
      PO,
      RO,
      CO,
      AR,
      R
    >,
  ) =>
    ({
      ...I,
      type: "request",
      o,
    }) as unknown as Petition,
  /**
   * Configures and types a basic petition to be used with `wrap` or `compose`.
   * The `f` function in the petition configuration returns either a `BodyInit` or `Promise<BodyInit>`,
   * which should eventually be wrapped in a `Response` object.
   * This function is bound by `composer` rules, aligning with configured system behaviors.
   *
   * @param {O} [options] - Optional configuration options that may include plugin settings.
   * @returns {Function} A function that accepts a Morphism defining an HTTP petition.
   *
   * @example
   * Example usage:
   * ```typescript
   * import { petitions } from 'vixeny';
   *
   * const standard = petitions.common()({
   *   path: '/yourPath',
   *   f: ctx => ctx.query.hello ?? 'queryNotFound'
   * });
   * ```
   */
  common: <
    FC extends CyclePluginMap,
    O extends FunRouterOptions<FC>,
  >(o?: O) =>
  <
    RM extends ResolveMap<any>,
    BM extends BranchMap<any>,
    QO extends QueryOptions,
    PO extends ParamOptions,
    RO extends O,
    CO extends CryptoOptions,
    AR = any,
    R = any,
  >(
    I: Morphism<
      {
        type: "base";
        typeNotNeeded: true;
        hasPath: true;
        isAPetition: true;
      },
      RM,
      BM,
      QO,
      PO,
      RO,
      CO,
      AR,
      R
    >,
  ) => ({ ...I, type: "base", o }) as unknown as Petition,
  /**
   * Configures and types a response petition to be used directly or in higher-order functions such as `wrap` or `compose`.
   * The `r` function in the petition configuration returns either a `Response` or `Promise<Response>`.
   * This function is not bound by `composer` rules.
   * @param {O} [options] - Optional configuration options that may include plugin settings.
   * @returns {Function} A function that accepts a Morphism defining an HTTP petition.
   *
   * @example
   * Example usage:
   * ```typescript
   * import { petitions } from 'vixeny';
   *
   * const standard = petitions.response()({
   *   path: '/yourPath',
   *   r: () => new Response("Hello World!")
   * });
   * ```
   */
  response: <
    FC extends CyclePluginMap,
    O extends FunRouterOptions<FC>,
  >(o?: O) =>
  (I: {
    path: string;
    method?: ParamsMethod;
    r: { (ctx: Request): Response | Promise<Response> };
  }) =>
    ({
      ...I,
      f: () =>
        new Response("Unreachable: TODO: make response work without an f"),
      type: "response",
      o,
    }) as unknown as Petition,
  /**
   * Configures a morphism that can be composed into a petition. This function accepts a configuration
   * for a morphism, which can include both asynchronous and synchronous functions, treating both types
   * equally in the execution context. This is particularly useful for integrating various data resolutions
   * that may or may not require asynchronous operations.
   *
   * This function is bound to `compose` rules.
   *
   * @param {O} [options] - Optional configuration options that may include plugin settings.
   * @returns {Function} A function that accepts a configuration object for a morphism and returns it unmodified, suitable for composition.
   *
   * @example
   * Example usage:
   * ```typescript
   * import { petitions } from 'vixeny';
   *
   * const hello = petitions.resolve()({
   *   f: async () => await Promise.resolve("Hello")
   * });
   * const world = petitions.resolve()({
   *   f: () => 'world'
   * });
   *
   * const stdPetition = petitions.custom()({
   *   path: "/example",
   *   resolve: {
   *     hello: hello,
   *     world: world
   *   },
   *   f: c => new Response(`${c.resolve.hello} ${c.resolve.world}`),
   * });
   * ```
   */
  resolve: <
    FC extends CyclePluginMap,
    O extends FunRouterOptions<FC>,
  >(o?: O) =>
  <
    RM extends ResolveMap<any>,
    BM extends BranchMap<any>,
    QO extends QueryOptions,
    PO extends ParamOptions,
    RO extends O,
    CO extends CryptoOptions,
    AT = any,
    R = any,
  >(
    m: Morphism<
      {
        type: "morphism";
      },
      RM,
      BM,
      QO,
      PO,
      RO,
      CO,
      AT,
      R
    >,
  ) =>
    (
      (isUsing) => ({
        ...m,
        type: "morphism",
        isUsing: isUsing,
        isAsync: composerTools.localAsync(o)(m as Petition)(isUsing),
        o,
      })
    )(
      composerTools.isUsing(o)(m as Petition),
    ) as unknown as Morphism<
      {
        type: "morphism";
      },
      RM,
      BM,
      QO,
      PO,
      RO,
      CO,
      AT,
      R
    >,

  /**
   * Configures and types a branch morphism to be used within a petition. Branch morphisms are designed to execute
   * alongside or within the main function (`f`) of a petition, allowing for the extension of functionality through
   * additional logic or operations without cluttering the primary business logic.
   *
   * Branches can handle both static and dynamic content, and may perform synchronous or asynchronous operations,
   * potentially modifying a mutable context that persists across transformations within the execution of a petition.
   *
   * @param {O} [options] - Optional configuration options that may include plugin settings.
   * @returns {Function} A function that accepts a configuration object for a branch morphism and returns it unmodified.
   *
   * Example usage:
   * ```typescript
   * import { petitions, wrap } from 'vixeny';
   *
   * const helloBranch = petitions.branch()({
   *   args: 'string',
   *   f: (c) => c.args, //string
   * });
   * wrap()()
   *   .stdPetition({
   *     path: "/helloBranch",
   *     branch: {
   *       hello: helloBranch,
   *     },
   *     f: (c) => new Response(c.branch.hello(null)),
   *   });
   * ```
   */
  branch: <
    FC extends CyclePluginMap,
    O extends FunRouterOptions<FC>,
  >(o?: O) =>
  <
    RM extends ResolveMap<any>,
    BM extends BranchMap<any>,
    QO extends QueryOptions,
    PO extends ParamOptions,
    RO extends O,
    CO extends CryptoOptions,
    AT = any,
    R = any,
  >(
    m: Morphism<
      {
        type: "morphism";
        branch: true;
      },
      RM,
      BM,
      QO,
      PO,
      RO,
      CO,
      AT,
      R
    >,
  ) =>
    (
      (isUsing) => ({
        ...m,
        type: "morphism",
        isUsing: isUsing,
        isAsync: composerTools.localAsync(o)(m as Petition)(isUsing),
        o,
      })
    )(
      composerTools.isUsing(o)(m as Petition),
    ) as unknown as Morphism<
      {
        type: "morphism";
        branch: true;
      },
      RM,
      BM,
      QO,
      PO,
      RO,
      CO,
      AT,
      R
    >,
  /**
   * Joins multiple Morphisms or Petitions into a single unified array, ensuring that each component adheres to
   * the specifications of being a valid petition with a designated path. This function is particularly useful
   * for scenarios where multiple petitions need to be handled or executed in a sequence or simultaneously,
   * maintaining the structure and constraints necessary for each to function correctly within the system.
   *
   * It could be passed to a `wrap` for further processing.
   *
   * @param {O} [options] - Optional configuration options that may include plugin settings.
   * @returns {Function} A function that takes an array of Morphisms/Petitions and a single Morphism/Petition or configuration object,
   *                     and returns a new array combining them, all conforming to petition requirements.
   *
   * @example
   * Example usage:
   * ```typescript
   * import { petitions } from 'vixeny';
   *
   * // Define individual petitions
   * const petitionA = petitions.custom()({
   *   path: '/pathA',
   *   f: ctx => new Response('Response A')
   * });
   * const petitionB = petitions.custom()({
   *   path: '/pathB',
   *   f: ctx => new Response('Response B')
   * });
   *
   * // Join petitions into a unified structure
   * const combinedPetitions = petitions.join()([petitionA], petitionB);
   * ```
   */
  join: <
    FC extends CyclePluginMap,
    O extends FunRouterOptions<FC>,
  >(O?: O) =>
  <
    RM extends ResolveMap<any>,
    BM extends BranchMap<any>,
    QO extends QueryOptions,
    PO extends ParamOptions,
    RO extends O,
    CO extends CryptoOptions,
    AT = any,
    R = any,
  >(
    A: Morphism<
      {
        isAPetition: true;
        hasPath: true;
      },
      RM,
      BM,
      QO,
      PO,
      RO,
      CO,
      AT,
      R
    >[],
  ) =>
  <
    RM extends ResolveMap<any>,
    BM extends BranchMap<any>,
    QO extends QueryOptions,
    PO extends ParamOptions,
    RO extends O,
    CO extends CryptoOptions,
    AT = any,
    R = any,
  >(
    B:
      | Morphism<
        {
          isAPetition: true;
          hasPath: true;
        },
        RM,
        BM,
        QO,
        PO,
        RO,
        CO,
        AT,
        R
      >
      | {
        type: typeMorphism;
        path: string;
        f: any;
      },
  ) =>
    [
      ...A,
      B as Morphism<
        {
          isAPetition: true;
          hasPath: true;
        },
        RM,
        BM,
        QO,
        PO,
        RO,
        CO,
        AT,
        R
      >,
    ] as Petition[],
};

type typeMorphism = "response" | "request" | "morphism" | "base" | "add";

export type ResolveMap<T> = {
  [K in keyof T]: T[K] extends Morphism<
    {
      type: "morphism";
    }
  > ? Morphism<
      {
        type: "morphism";
      }
    >
    : T[K] extends { f: any; type: "morphism" } ? any
    : never;
};

export type BranchMap<T> = {
  [K in keyof T]: T[K] extends Morphism<
    {
      type: "morphism";
      branch: true;
    }
  > ? Morphism<
      {
        type: "morphism";
        branch: true;
      }
    >
    : T[K] extends { f: any; type: "morphism" } ? any
    : never;
};

type ThrushCTX = {
  name: string;
  value: string;
  type: 0 | 1;
};

type MapOptions = {
  hasPath?: boolean;
  typeNotNeeded?: boolean;
  type?: typeMorphism;
  branch?: boolean;
  isAPetition?: boolean;
  mutable?: true;
  specificReturnType?: boolean;
  returnType?: any;
  isMaybe?: boolean;
  hasMaybe?: boolean;
  specialVisible?: boolean;
};

type HasPath<P extends MapOptions> = P extends { hasPath: true }
  ? { readonly path: string }
  : {};

type HasType<P extends MapOptions> = P extends { type: typeMorphism }
  ? P extends { typeNotNeeded: true } ? {}
  : P extends { type: "morphism" } ? {}
  : { readonly type: P["type"] }
  : {};

type ExtraKeys<P extends MapOptions> = HasPath<P> & HasType<P>;

type PetitionHeader = {
  /**
   * The headers initialization.
   */
  headers?: HeadersInit | defaultMime;
  /**
   * The status text.
   */
  statusText?: string;
  /**
   * The status number.
   */
  status?: number;
};

export type Morphism<
  MO extends MapOptions = MapOptions,
  RM extends ResolveMap<any> = any,
  BM extends BranchMap<any> = any,
  QO extends QueryOptions = QueryOptions,
  PO extends ParamOptions = ParamOptions,
  RO extends FunRouterOptions<any> = FunRouterOptions<any>,
  CO extends CryptoOptions = CryptoOptions,
  AT = any,
  R = any,
> = {
  readonly active?: MO["isAPetition"] extends true ? boolean : never;
  readonly isUsing?: MO["isAPetition"] extends true ? string[] : never;
  // TODO: Adding support for maybe
  readonly maybe?: MO["hasMaybe"] extends true ? (
      a: WithPlugins<
        RM,
        BM,
        QO,
        PO,
        RO,
        CO,
        true,
        PetitionOptions<
          [Extract<keyof RO["cyclePlugin"], string>],
          CO
        >,
        AT
      >,
    ) => Promise<Response> | Response
    : never;
  readonly resolve?: RM;
  readonly branch?: BM;
  readonly method?: ParamsMethod;
  readonly crypto?: CO;
  readonly args?: MO extends { type: "morphism" } ? AT : never;
  readonly query?: QO;
  readonly cookie?: CookieOptions;
  readonly param?: PO;
  readonly thrush?: MO["specialVisible"] extends true ? ThrushCTX : never;
  readonly plugins?: ExtractPluginTypes<RO>;
  readonly headings?: PetitionHeader;
  readonly isAsync?: MO["isAPetition"] extends true | false ? boolean
    : MO["type"] extends { type: "morphism" } ? boolean
    : never;
  readonly o?: MO["isAPetition"] extends boolean ? FunRouterOptions<any>
    : MO["type"] extends { type: "morphism" } ? FunRouterOptions<any>
    : never;
  readonly mutable?: MO extends { mutable: true } ? true : never;
  readonly options?: PetitionOptions<
    [Extract<keyof RO["cyclePlugin"], string>],
    CO
  >;
  readonly r?: MO["type"] extends "response"
    ? (r: Request) => Promise<Response> | Response
    : never;
  readonly f: {
    (
      ctx: WithPlugins<
        RM,
        BM,
        QO,
        PO,
        RO,
        CO,
        false,
        PetitionOptions<
          [Extract<keyof RO["cyclePlugin"], string>],
          CO
        >,
        AT
      >,
    ): MO["specificReturnType"] extends true ? MO["returnType"]
      : MO["type"] extends "response" ? Response | Promise<Response>
      : MO["type"] extends "request" ? Response | Promise<Response>
      : MO["type"] extends "add"
        ? Response | Promise<Response> | BodyInit | Promise<BodyInit> | null
      : MO["type"] extends "base" ? BodyInit | Promise<BodyInit> | null
      : R;
  };
} & ExtraKeys<MO>;

type ExtendedAddOption<CR extends CryptoOptions> = "globalKey" extends keyof CR
  ? AddOption | "token" | "sign" | "verify"
  : AddOption;

type AddOption =
  | "req"
  | "query"
  | "param"
  | "io"
  | "date"
  | "cookie"
  | "resolve"
  | "mutable"
  | "branch"
  | "args"
  | "headers";

export type PetitionOptions<
  T extends string[],
  CR extends CryptoOptions,
> = {
  readonly add?: Array<ExtendedAddOption<CR> | T[number]>;
  readonly debug?: DebugOptions;
  readonly remove?: Array<ExtendedAddOption<CR> | T[number]>;
  readonly only?: Array<ExtendedAddOption<CR> | T[number]>;
  readonly setDate?: number;
};

// Modified ExtractPluginTypes
type ExtractPluginTypes<O extends FunRouterOptions<any>> =
  O["cyclePlugin"] extends CyclePluginMap ? {
      [K in keyof O["cyclePlugin"]]?: O["cyclePlugin"][K] extends
        { type: infer T } ? T : never;
    }
    : {};

type DebugOptions = {
  type: "list";
  name: string;
};

export type QueryOptions = {
  unique?: true;
  name: string;
} | {
  only?: string[];
} | {};

export type CookieOptions = {
  only?: string[];
};

export type ParamOptions = {
  readonly unique?: true;
} | {};

type specialElements = {
  readonly hasHeaders?: true;
} | {};

export type WithPlugins<
  R extends ResolveMap<any>,
  B extends BranchMap<any>,
  QS extends QueryOptions,
  PA extends ParamOptions,
  O extends FunRouterOptions<any>,
  CR extends CryptoOptions,
  // TODO: Please update the Ctx and the position of TH
  TH extends boolean | undefined,
  OPT extends PetitionOptions<any, any>,
  AR = any,
> =
  & Ctx<R, B, QS, PA, O, CR, { hasHeaders: true }, TH, AR>
  & (O extends { cyclePlugin: infer CPM } ? [keyof CPM] extends [never] ? {}
    : CPM extends CyclePluginMap ? CyclePluginFunctions<CPM>
    : never
    : {})
  & CryptoContext<CR>;

// type Thrush<TH extends ThrushCTX | undefined> =
//     TH extends ThrushCTX
//       ?  TH['name']
//       : {}

type CyclePluginFunctions<CPM extends CyclePluginMap> = {
  [K in keyof CPM]: CPM[K] extends
    { isFunction: boolean; f: (...args: any) => any }
    ? ReturnType<ReturnType<CPM[K]["f"]>> // Direct function case
    : CPM[K] extends { f: (...args: any) => any }
      ? Awaited<ReturnType<ReturnType<ReturnType<CPM[K]["f"]>>>> // Nested function case
    : never; // Handle cases that do not match expected structure
};

type SignerAndVarifier = {
  verify: (s: string) => Record<string, unknown> | null;
  sign: (key: Record<string, unknown>) => string;
};

type CryptoContext<CR extends CryptoOptions> = CR extends
  { globalKey: any; token: infer Token } ? Token extends Record<string, any> ? {
      token: { [K in keyof Token]: Record<string, unknown> };
    } & SignerAndVarifier
  : {
    // sign: any;
    // verify: any;
    // token: any;
  }
  : CR extends { globalKey: any } ? {
      token: Record<string, Record<string, unknown> | null>;
    } & SignerAndVarifier
  : {
    // sign: any;
    // verify: any;
    // token: any;
  };

interface Ctx<
  R extends ResolveMap<any>,
  B extends BranchMap<any>,
  QS extends QueryOptions,
  PA extends ParamOptions,
  O extends FunRouterOptions<any>,
  CR extends CryptoOptions,
  UNI extends specialElements,
  TH extends boolean | undefined,
  AR = any,
> {
  maybe: TH extends true ? unknown : never;
  args: AR extends undefined ? never : AR;
  /**
   * The `resolve` property is integral to ensuring that all necessary data is fetched or calculations are performed before the main function (`f`) of a morphism is executed. It consists of a map where each key corresponds to a resolve function that is executed prior to `f`. The results of these resolves are then made available in the `CTX` for use in the main function.
   *
   * **Key Features**:
   * - Ensures data dependencies are resolved beforehand.
   * - Supports both synchronous and asynchronous operations.
   * - Maintains the original state, allowing for clean and predictable code execution.
   * - Executes all resolves before integrating their outputs into the `CTX`.
   * - Supports an unlimited nesting of resolves and branches (using `petitions` typing), providing a flexible structure for complex data handling.
   *
   * @example
   *
   * ---
   * Basic usage with synchronous data fetching:
   * ```js
   * wrap(options)()
   *   .stdPetition({
   *     path: "/withResolve",
   *     resolve: {
   *       hi: { f: () => "Hello world" },
   *     },
   *     f: (ctx) => ctx.resolve.hi,
   *   });
   * ```
   * ---
   * Incorporating asynchronous functions:
   * ```js
   * wrap()()
   *   .stdPetition({
   *     path: "/withResolveAsync",
   *     resolve: {
   *       hi: { async f: () => await Promise.resolve("Hello world") }
   *     },
   *     f: (ctx) => ctx.resolve.hi,
   *   })
   * ```
   * ---
   * Execution order and integration into `CTX`:
   * ```js
   * wrap(options)()
   *   .stdPetition({
   *     path: "/helloWorld",
   *     resolve: {
   *       hello: { async f: () => await Promise.resolve("Hello") },
   *       world: { f: () => 'world' }
   *     },
   *     f: ctx => `${ctx.resolve.hello} ${ctx.resolve.world}`,
   *   })
   * ```
   * ---
   *  Using `morphism`(petitions) with `resolve`:
   *
   * Suppose you need to fetch user data and perform some preprocessing on it before responding to a request. You can define a `morphism` for fetching and preprocessing the data, and then use it within the `resolve` to ensure the data is ready by the time you need to use it in `f`.
   *
   * ```js
   * // Define a morphism for fetching and preprocessing user data
   * const fetchAndProcessUserData = petitions.resolve({
   *    f: async (c) => {
   *      // Imagine fetching user data asynchronously
   *      const userData = await fetchUserData(c.param.userId);
   *      // Preprocess the fetched data
   *      const processedData = processData(userData);
   *      return processedData;
   *    }
   *  }
   * });
   *
   * // Use the above morphism in a petition
   * wrap()()
   *   .stdPetition({
   *     path: "/user/:userId",
   *     resolve: {
   *       // Utilize the morphism to fetch and preprocess user data before executing the main function
   *       processedUserData: fetchAndProcessUserData,
   *     },
   *     f: (c) => {
   *       // Access the resolved and processed user data directly in the main function
   *       const userData = c.resolve.processedUserData;
   *       // Use the processed user data to construct the response
   *       return new Response(JSON.stringify(userData));
   *     }
   *   });
   * ```
   */
  resolve: { [V in keyof R]: Awaited<ReturnType<R[V]["f"]>> };
  /**
   * The `branch` property allows for additional logic or operations to be executed alongside or within the main function (`f`) of a petition. Each key within the `branch` object maps to a branch function, executed with its context. The results of these branches are then accessible under the `branch` property of the `CTX`, complementing the main logic without overcrowding it.
   *
   * **Key Features**:
   * - Enables the execution of side operations or additional logic in parallel to the main function.
   * - Each branch operates with its own context, allowing for independent execution.
   * - Supports dynamic operations with parameters and asynchronous actions.
   * - upports an unlimited nesting of resolves and branches (using `petitions` typing), providing a flexible structure for complex data handling.
   *
   * **Examples**:
   * ---
   * Defining a simple branch:
   * ```typescript
   * const helloBranch = petitions.branch(options)({
   *   args: {} as string,
   *   f: () => "Hello from branch",
   * });
   *
   * wrap(options)()
   *   .stdPetition({
   *     path: "/helloBranch",
   *     branch: {
   *       hello: helloBranch,
   *     },
   *     f: (ctx) => new Response(ctx.branch.hello()),
   *   });
   * ```
   * ---
   * Branch with parameters:
   * ```typescript
   * const greetUserBranch = petitions.branch()({
   *   args: {} as Record<string, string>,
   *   f: (ctx) => `Hello, ${ctx.args.name}`,
   * });
   * wrap(options)()
   *   .stdPetition({
   *     path: "/greet/:name",
   *     branch: {
   *       greetUser: greetUserBranch,
   *     },
   *     f:  (ctx) => ctx.branch.greetUser({ name: ctx.param.name }),
   *    });
   * ```
   * ---
   * Asynchronous branch example:
   * ```js
   * const fetchUserDataBranch = morphism(options)({
   *   async f: (ctx) => {
   *     const userId = ctc.args.userId;
   *     return await fetch(`https://api.example.com/users/${userId}`).then(res => res.json());
   *   },
   * });
   *
   * wrap(options)()
   *   .stdPetition({
   *     path: "/user/:userId",
   *     branch: {
   *       fetchUserData: fetchUserDataBranch,
   *     },
   *     f: async (ctx) => {
   *       const userData = await ctx.branch.fetchUserData({ userId: ctx.param.userId });
   *       return new Response(JSON.stringify(userData));
   *     },
   *   })
   * ```
   */
  branch: {
    [V in keyof B]: (
      ctx: B[V]["args"] extends undefined ? void
        : Exclude<B[V]["args"], undefined>,
    ) => ReturnType<B[V]["f"]>;
  };

  /**
   * Adds with query to the `context`
   *
   * @example
   * ---
   * ```ts
   * {
   *  path: "/path",
   *  f: async ctx => await ctx.req.blob()
   * }
   *
   * ```
   */
  req: Request;
  /**
   * `query`: Facilitates access to URL query parameters within the petition's execution context.
   *
   * **Examples**:
   *
   * Accessing a simple query parameter:
   * ```typescript
   * {
   *   path: '/query',
   *   f: ctx => ctx.query.name ?? "NotFound"
   * };
   * ```
   * In this scenario, `ctx.query.name` directly accesses the `name` query parameter from the URL.
   *
   * ---
   *
   * Using query parameters with optimization for unique queries:
   * ```typescript
   * .stdPetition({
   *   path: "/query",
   *   query: {
   *     unique: true,
   *     name: "hello"
   *   },
   *   f: ctx => ctx.query ?? "NotFound"
   * })
   * ```
   */
  query: QS extends { unique: true } ? (string | null)
    : { [key: string]: string | null };

  /**
   * `param`: Enables the extraction of URL path parameters within the petition's execution context. This feature simplifies accessing dynamic segments of the URL path, allowing petitions to respond to varied requests efficiently.
   *
   * **Examples**:
   *
   * Accessing a path parameter:
   * ```typescript
   * {
   *   path: '/user/:userId',
   *   f: ctx => `User ID: ${ctx.param.userId}`
   * };
   * ```
   * In this example, `ctx.param.userId` retrieves the `userId` path parameter, enabling dynamic response content based on the URL.
   *
   * ---
   *
   * Using path parameters with optimization for unique paths:
   * ```typescript
   * .stdPetition({
   *   path: "/user/:userId",
   *   param: {
   *     unique: true
   *   },
   *   f: ctx => `User ID: ${ctx.param}`
   * })
   * ```
   * Here, setting `unique: true` within the `param` configuration optimizes retrieval for a scenario where only one path parameter is expected, allowing direct access to the parameter value as `ctx.param`.
   */
  param: PA extends { unique: true } ? string : Record<string, string>;
  /**
   * `headers`: Provides access to HTTP request headers within the petition's execution.
   *
   * **Examples**:
   *
   * Accessing request headers:
   * ```typescript
   * export const root = wrap({
   *   cors: {
   *     'maxAge': 14556156
   *   },
   * })()
   *   .customPetition({
   *     path: "/getHeaders",
   *     f: c => new Response(
   *       null, {
   *         headers: c.headers
   *       }
   *     )
   *   });
   *
   * const handles = root.handleRequest("/getHeaders")({});
   *
   * console.log(
   *   await handles(
   *     new Request("http://localhost/getHeaders")
   *   )
   * );
   * ```
   */
  headers: UNI extends {
    readonly hasHeaders: true;
  } ? Record<string, string>
    : null;

  /**
   * @deprecated
   *
   * Adds a Date.now() returning the number of milliseconds elapsed since the epoch.
   *
   * ```ts
   * {
   *    path: "/path"
   *    f: ctx =>  ctx.date > Date.now()
   *      ? "unreachable"
   *      : "date is created before ctx is passed to f"
   * }
   * ```
   * ---
   * This behavior can be set for testing purpose
   * ```ts
   * {
   *    path: "/",
   *    options:{
   *      setDate: 1694246953189
   *    },
   *    f: ctx => ctx.date === 1694246953189
   *       ? "Date is bind to a state"
   *       : "unreachable"
   * }
   * ```
   */
  date: number;
  cookie: { [key: string]: string | undefined };
  io: FileHandler;
}

export type CryptoOptions = {
  globalKey: SupportedKeys;
  token?: {
    only?: {
      [key: string]: {};
    };
  };
} | {};

export type StaticFilePlugin<
  TP extends "response" | "request" | undefined,
> = {
  checker: (path: string) => boolean;
  type?: TP;
  async?: boolean;
} & StaticFilePluginExtensions<TP>;

export type StaticFilePluginExtensions<
  TP extends "response" | "request" | undefined,
> = TP extends "request" ? {
    f: (options: {
      root: string;
      path: string;
      o?: FunRouterOptions<any>;
      relativeName: string;
    }) => ReturnType<ReturnType<typeof petitions.custom>>;
  }
  : {
    r: (options: {
      root: string;
      path: string;
      o?: FunRouterOptions<any>;
      relativeName: string;
    }) => ReturnType<ReturnType<typeof petitions.response>>;
  };

/**
 * Object for raw response static.
 */
export type fileServerPetition<
  MI extends true | false,
> = {
  type: "fileServer";
  name: string;
  path: string;
  mime?: MI;
  extra?: MI extends true ? [string, string][] : never;
  template?: StaticFilePlugin<any>[];
  removeExtensionOf?: defaultMime[];
  slashIs?: string;
};

export type SupportedKeys =
  | string
  | Uint8Array;

export type defaultMime =
  | ".aac"
  | ".abw"
  | ".arc"
  | ".avif"
  | ".avi"
  | ".azw"
  | ".azw"
  | ".bmp"
  | ".bz"
  | ".bz2"
  | ".cda"
  | ".csh"
  | ".css"
  | ".csv"
  | ".doc"
  | ".docx"
  | ".eot"
  | ".epub"
  | ".gz"
  | ".gif"
  | ".htm"
  | ".html"
  | ".ico"
  | ".ics"
  | ".jar"
  | ".jpeg"
  | ".js"
  | ".json"
  | ".jsonld"
  | ".mid"
  | ".mjs"
  | ".mp3"
  | ".mp4"
  | ".mpeg"
  | ".mpkg"
  | ".odp"
  | ".ods"
  | ".odt"
  | ".oga"
  | ".ogv"
  | ".ogx"
  | ".opus"
  | ".otf"
  | ".png"
  | ".pdf"
  | ".php"
  | ".ppt"
  | ".pptx"
  | ".rar"
  | ".rtf"
  | ".sh"
  | ".svg"
  | ".tar"
  | ".tif"
  | ".tiff"
  | ".ts"
  | ".ttf"
  | ".txt"
  | ".vsd"
  | ".wav"
  | ".weba"
  | ".webm"
  | ".webp"
  | ".woff"
  | ".woff2"
  | ".xhtml"
  | ".xls"
  | ".xlsx"
  | ".xml"
  | ".xul"
  | ".zip"
  | ".3gp"
  | ".3g2"
  | ".7z";
