//TODO: add
import composerTools from "../composer/composerTools.ts";
import type { StaticFilePlugin } from "../morphism.ts";
import {
  type CyclePlugin,
  type FunRouterOptions,
  globalOptions,
} from "../options.ts";

export default {
  globalOptions,
  /**
   * Types a plugin's configuration to ensure it meets Vixeny's requirements.
   * This function validates and possibly transforms the plugin configuration using TypeScript types.
   *
   * @template FC - Specifies the type constraint for the plugin configurations.
   * @param {CyclePlugin<FC>} config - The plugin configuration to be typed.
   * @returns {CyclePlugin<FC>} The typed plugin configuration, unchanged if valid.
   *
   * @example
   * Example usage:
   * ```typescript
   * import { plugins } from 'vixeny';
   *
   * // Define a simple plugin
   * const pluginHello = plugins.type({
   *   name: Symbol.for("hello"),
   *   type: undefined,
   *   f: () => () => () => "hello world",
   * });
   * ```
   */
  type: <
    FC extends boolean,
    O extends CyclePlugin<FC>,
  >(config: O) => config,

  /**
   * Retrieves specific plugin options using the current name of the plugin.
   * This function is essential for dynamic plugin management where plugins might
   * be identified differently over time or across different user options.
   *
   * @param {unknown} userOptions - The user options from which to retrieve plugin settings.
   * @returns {Function} A function that accepts the current plugin name and returns the associated plugin options.
   *
   * @example
   * Example usage:
   * ```typescript
   * import { plugins } from 'vixeny';
   *
   * // Define your plugin using a unique symbol
   * export const myPlugin = ((mySym) => ({
   *   name: mySym,
   *   isFunction: true,
   *   type: {} as YourType, // Specify the type here
   *   f: (userOptions) => (currentPetition) => {
   *     // Retrieving the current name of the plugin
   *     const currentName = getName(userOptions)(mySym);
   *     // Getting the options for the current plugin based on its name
   *     const options = getOptions(currentPetition)(currentName) as YourType;
   *     // Additional code leveraging the options...
   *   },
   * }))(Symbol("myPlugin"));
   * ```
   */
  getOptions: (userOptions: unknown) => (currentName: string) =>
    userOptions && typeof userOptions === "object" &&
      !Array.isArray(userOptions) && "plugins" in userOptions &&
      userOptions.plugins
      //@ts-ignore
      ? userOptions.plugins[currentName]
      : null,

  /**
   * Retrieves the current name of a plugin using its symbol, accounting for possible changes in naming conventions.
   * This function helps in maintaining references to plugins that may be dynamically named or reconfigured.
   *
   * @param {FunRouterOptions<any>} options - The router options containing plugin configurations.
   * @returns {Function} A function that accepts a symbol and returns the current name of the plugin.
   *
   * @example
   * Example usage:
   * ```typescript
   * import { plugins } from 'vixeny';
   *
   * // Define your plugin using a unique symbol
   * export const myPlugin = ((mySym) => ({
   *   name: mySym,
   *   isFunction: true,
   *   type: {} as YourType, // Specify your type here
   *   f: (options) => (currentPetition) => {
   *     // Getting the current name of the plugin
   *     const currentName = getName(options)(mySym);
   *     // Additional code...
   *   },
   * }))(Symbol("myPlugin"));
   * ```
   */
  getName: (o?: FunRouterOptions<any>) => (sym: symbol) =>
    Object
      .keys(o?.cyclePlugin ?? [])
      // @ts-ignore
      .find((name) => o?.cyclePlugin[name]?.name === sym) as string,
  /**
   * Customizes the context (CTX) for Vixeny's optimizer by filtering a list of elements based on removal and addition criteria,
   * and by examining the usage of these elements within a given string. This function aims to refine the CTX by ensuring that
   * only the relevant context elements are included
   */
  isUsing: composerTools.isUsing,
  staticFilePlugin: <
    TP extends "response" | "request" | undefined,
    O extends StaticFilePlugin<TP>,
  >(config: O) => config,
};
