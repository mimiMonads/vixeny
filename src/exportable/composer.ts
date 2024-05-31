import compose from "../composer/compose.ts";
import {
  type BranchMap,
  type CryptoOptions,
  type Morphism,
  type ParamOptions,
  type Petition,
  type QueryOptions,
  type ResolveMap,
} from "../morphism.ts";
import type { CyclePluginMap, FunRouterOptions } from "../options.ts";

type BodyNull = {
  [propName: string]: any;
} | null;

/**
 * A utility for composing Morphisms and Petitions within a specific HTTP framework. This utility
 * functions to configure and execute HTTP petitions by wrapping morphisms into structured petitions.
 * Each function under `composer` can be used to handle different types of requests or to process the data
 * differently based on the configuration.
 */
export const composer = {
  /**
   * Wraps a given Morphism into a Petition configured for any type of HTTP request.
   * This composition function allows integration with additional plugins and settings provided via optional parameters.
   *
   * @param {O} [o] - Optional configuration options that may include plugin settings.
   * @returns {Function} A function that, when given a Morphism, returns a function configured to handle a Request and return a response of type R.
   *
   * @example
   * Example usage: Tests the `anyRequest` composer to ensure it correctly returns the expected string.
   * ```typescript
   * Deno.test("anyRequest test", () => {
   *
   *  const returnsAny = ({
   *       f: () => "hello",
   *     })
   *   assertEquals(
   *     returnsAny(dummyRequest),
   *     "hello",
   *   );
   * });
   * ```
   */
  anyRequest: <
    FC extends CyclePluginMap,
    O extends FunRouterOptions<FC>,
  >(o?: O) =>
  <
    RM extends ResolveMap<any>,
    BM extends BranchMap<any>,
    QO extends QueryOptions,
    PO extends ParamOptions,
    CO extends CryptoOptions,
    AR = any,
    R = any,
  >(
    r: Morphism<
      {
        type: "morphism";
        typeNotNeeded: true;
      },
      RM,
      BM,
      QO,
      PO,
      O,
      CO,
      AR,
      R
    >,
  ) =>
    (compose(o)(
      { ...r, type: "request" } as unknown as Petition,
    )) as unknown as (
      re: Request,
    ) => R,
  /**
   * Composes a Petition specifically designed to handle scenarios where the response can be a null value or a resolved promise returning null.
   * This is particularly useful for endpoints that do not need to return any substantive data.
   *
   * @param {O} [o] - Optional configuration options that may include plugin settings.
   * @returns {Function} A function that, when given a Morphism, processes a Request and returns either a null or object response.
   *
   * @example
   * Example usage: Tests the handling of null and object responses through multiple scenarios.
   * ```typescript
   * Deno.test("objectNullRequest test", async () => {
   *   const objectNull = composer.objectNullRequest()({
   *       f: () => ({ hi: 1 }),
   *     })
   *   assertEquals(
   *     objectNull(dummyRequest),
   *     { hi: 1 },
   *   );
   * });
   * ```
   */
  objectNullRequest: <
    FC extends CyclePluginMap,
    O extends FunRouterOptions<FC>,
  >(o?: O) =>
  <
    RM extends ResolveMap<any>,
    BM extends BranchMap<any>,
    QO extends QueryOptions,
    PO extends ParamOptions,
    CO extends CryptoOptions,
    AR = any,
    R = any,
  >(
    r: Morphism<
      {
        type: "base";
        typeNotNeeded: true;
        specificReturnType: true;
        retunType: Promise<BodyNull> | BodyNull;
      },
      RM,
      BM,
      QO,
      PO,
      O,
      CO,
      AR,
      R
    >,
  ) =>
    (compose(o)(
      { ...r, type: "request" } as unknown as Petition,
    )) as unknown as (re: Request) => R,
  /**
   * Composes a Petition configured for processing HTTP responses directly. Useful for scenarios where the petition is already structured to handle specific response types and does not require further composition.
   *
   * @param {O} [o] - Optional configuration options that may include plugin settings.
   * @returns {Function} Either directly returns the response function from the petition if it's a 'response' type, or processes it into a structured response.
   *
   * @example
   * Example usage: Tests the `petition` composer to ensure it correctly processes predefined petitions into appropriate HTTP responses.
   * ```typescript
   * Deno.test("petition composer test", async () => {
   *
   *  const commonPetition = petitions.common()({
   *    path: "/common",
   *    f: () => "common",
   *   });
   *
   *  const responsePetition = petitions.response()({
   *    path: "/response",
   *    r: () => new Response("response"),
   *  });
   *
   *  const requestPetition = petitions.standard()({
   *    path: "/response",
   *    f: () => new Response("standard"),
   *  });
   * assertEquals(
   *   await Promise.resolve(composer.petition()(commonPetition)(dummyRequest))
   *     .then((x) => x.text()),
   *   "common",
   * );
   * assertEquals(
   *   await Promise.resolve(composer.petition()(responsePetition)(dummyRequest))
   *     .then((x) => x.text()),
   *   "response",
   * );
   * assertEquals(
   *   await Promise.resolve(composer.petition()(requestPetition)(dummyRequest))
   *     .then((x) => x.text()),
   *   "standard",
   * );
   * });
   * ```
   */
  petition: <
    FC extends CyclePluginMap,
    O extends FunRouterOptions<FC>,
  >(o?: O) =>
  (
    r: Petition,
  ) =>
    (r.type === "response" ? r.r : (compose(o)(
      { ...r },
    ))) as unknown as (
      re: Request,
    ) => Promise<Request> | Request,
};
