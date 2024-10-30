import { isUsing as param } from "../components/parameters/mainParameters.ts";
import { isUsing as query } from "../components/queries/mainQueries.ts";
import { isUsing as cookie } from "../components/cookies/mainCookies.ts";
import { isUsing as token } from "../components/cookieToToken/mainCookieToToken.ts";
import type { Petition } from "../morphism.ts";
import type { CyclePluginMap, FunRouterOptions } from "../options.ts";
import { type CyclePluginType, pluginCTX } from "./plugin.ts";

type Display = {
  using?: string[];
  isAsync?: boolean;
};

type Elements = {
  [key: string]: (options?: FunRouterOptions<any>) => (p: Petition) => string;
};

const elements: Elements = {
  param,
  query,
  cookie,
  token,
};

// Function to display the paths and methods of a petition
export const displayPaths = (p: Petition): void => {
  console.log("---");
  Object.entries({
    path: p.path,
    method: p.method ?? "GET",
  }).forEach(([key, value]) => {
    console.log(`\x1b[35m${key}\x1b[0m: \x1b[38;2;255;165;0m${value}\x1b[0m`);
  });
};

type PluginType = [string, CyclePluginType<any, any>];

// Main display function that composes the logging of context, components, and plugins
export const display =
  (options?: FunRouterOptions<any>) =>
  (p: Petition) =>
  (object: Display): void => {
    logContext(object);
    logComponents(object, options, p);
    logPlugins(object, options, p);
  };

// Helper function to log the context
const logContext = (object: Display): void => {
  console.log("--- Context ---");
  Object.entries(object).forEach(([key, value]) => {
    console.log(`\x1b[35m${key}\x1b[0m: \x1b[38;2;255;165;0m${value}\x1b[0m`);
  });
};

// Helper function to log the components being used
const logComponents = (
  object: Display,
  options: FunRouterOptions<any> | undefined,
  p: Petition,
): void => {
  const usedComponents = object.using ?? [];
  if (usedComponents.length > 0) {
    console.log("--- Components ---");
    usedComponents.forEach((key) => {
      if (key in elements) {
        const value = elements[key](options)(p);
        console.log(
          `\x1b[35m${key}\x1b[0m: \x1b[38;2;255;165;0m${value}\x1b[0m`,
        );
      }
    });
  }
};

// Helper function to log the plugins being used
const logPlugins = (
  object: Display,
  options: FunRouterOptions<any> | undefined,
  p: Petition,
): void => {
  const pluginMap = options?.cyclePlugin ?? {};
  const usedPlugins = object.using ?? [];

  const pluginsToDisplay: PluginType[] = usedPlugins
    .map((name) => {
      const plugin = pluginMap[name];
      return plugin && "isUsing" in plugin
        ? ([name, plugin] as PluginType)
        : null;
    })
    .filter((item): item is PluginType => item !== null);

  if (pluginsToDisplay.length > 0) {
    console.log("--- Plugins ---");
    pluginsToDisplay.forEach(([name, plugin]) => {
      // This is always the case `pluginsToDisplay` filters the elements base on
      // if the have `isUsing`
      const value = plugin.isUsing!(pluginCTX(options)(p));
      console.log(
        `\x1b[35m${name}\x1b[0m: \x1b[38;2;255;165;0m${value}\x1b[0m`,
      );
    });
  }
};
