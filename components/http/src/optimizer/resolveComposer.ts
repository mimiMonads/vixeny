import resolver from "../../src/framework/optimizer/resolve/main.ts";

import { FunRouterOptions } from "../../types.ts";

import { Morphism } from "../framework/optimizer/types.ts";

type ResolveOptions = {
  [key: string]: {} & Morphism<any, any, any, any, any, any, any, any>;
};

type ResolveSetter = {
  mutable?: {
    res: Response;
    [keys: string]: any;
  };
} & FunRouterOptions;

/**
 * Resolve is mockable wich facilitates testing and development,
 * by simulating responses from external APIs or complex logic without the need for actual data fetches.
 *
 * This function is particularly useful for scenarios requiring the simulation of external dependencies,
 * such as API calls, allowing for consistent and controlled testing environments.
 *
 * ### Example Usage:
 *
 * The following example demonstrates how to replace an asynchronous resolve function for fetching weather data
 * with a mocked synchronous function for controlled testing:
 *
 * ```typescript
 * // Define the original asynchronous resolve function for fetching weather data
 * const routes = wrap(options)()
 *   .stdPetition({
 *     path: "/weather",
 *     resolve: {
 *       currentWeather: {
 *         async f: () => await fetch("https://api.weather.com/current").then(res => res.json())
 *       }
 *     },
 *     f: (c) => c.resolve.currentWeather.temperature > 75 ? "It's warm outside" : "It's cool outside"
 *   });
 *
 * // Mock the resolve function for testing
 * const mockedWeatherResolve = () => ({ temperature: 80 });
 *
 * // Inject the mocked resolve
 * const mockRoutes = routes.handleRequest("/weather")({
 *   resolve: {
 *     currentWeather: mockedWeatherResolve
 *   }
 * });
 *
 * // Test the behavior with mocked data
 * test("/weather", async () => {
 *   expect(
 *     await mockRoutes(new Request("/weather")).then(res => res.text())
 *   ).toStrictEqual("It's warm outside");
 * });
 * ```
 */

export default (o?: ResolveSetter) => (f: ResolveOptions) =>
  o && "mutable" in o
    ? (
      (m) =>
        ((f) => async (r: Request) => await f([r, m] as unknown as Request))(
          resolver(o)("/")(f),
        )
    )({ ...o.mutable })
    : resolver(o)("/")(f);
