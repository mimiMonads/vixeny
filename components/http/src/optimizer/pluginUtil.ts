import { CyclePlugin, FunRouterOptions } from "../../types.ts";

/**
 * Plugin names can vary. With this tool, using your symbol, you can retrieve the current name of the plugin.
 *
 * Example usage:
 * ```js
 * import { plugins } from 'vixeny';
 *
 * // Define your plugin using a unique symbol
 * export const myPlugin = ((mySym) => ({
 *   name: mySym,
 *   isFunction: true,
 *   type: {} as YourType, // Specify your type here
 *   f: (options) => (currentPetition) => {
 *
 *     // Getting the current name of the plugin
 *     const currentName = getName(options)(mySym);
 *
 *     // Additional code...
 *   },
 * }))(Symbol("myPlugin"));
 * ```
 */
export const getName = (o: FunRouterOptions) => (sym: symbol) =>
  Object
    .keys(o?.cyclePlugin ?? [])
    // @ts-ignore
    .find((name) => o?.cyclePlugin[name]?.name === sym) as string;
/**
 * Given the varying nature of plugin names, this tool enables you to retrieve specific plugin options by using the plugin's current name.
 *
 * Example usage:
 * ```js
 * import { plugins } from 'vixeny';
 *
 * // Define your plugin using a unique symbol
 * export const myPlugin = ((mySym) => ({
 *   name: mySym,
 *   isFunction: true,
 *   type: {} as YourType, // Specify the type here
 *   f: (userOptions) => (currentPetition) => {
 *
 *     // Retrieving the current name of the plugin
 *     const currentName = getName(userOptions)(mySym);
 *
 *     // Getting the options for the current plugin based on its name
 *     const options = getOptions(currentPetition)(currentName) as YourType;
 *
 *     // Additional code leveraging the options...
 *   },
 * }))(Symbol("myPlugin"));
 * ```
 */
export const getOptions = (userOptions: unknown) => (currentName: string) =>
  userOptions && typeof userOptions == "object" &&
    !Array.isArray(userOptions) && "plugins" in userOptions &&
    userOptions.plugins
    //@ts-ignore
    ? userOptions.plugins[currentName]
    : null;

/**
 * Validates the global options provided to ensure compatibility with Vixeny's configuration system. It's crucial to avoid explicitly typing the options to preserve type inference within the `warp` function. Explicit typing can cause a loss of type inference, impacting the seamless integration of plugins and options in Vixeny's dynamic environment.
 *
 * Example usage:
 * ```js
 * import { plugins } from 'vixeny';
 * import { helloWorld, hello, url, whoIAM } from "./somewhere"
 *
 * // Define global options with various plugins
 * export const globalOptions = {
 *   cyclePlugin: {
 *     helloWorld,
 *     url,
 *     dave: whoIAM(),
 *     avant: whoIAM(),
 *     adder: adder(),
 *   },
 * };
 *
 * // Validate the global options without losing type inference
 * plugins.assertOptions(globalOptions);
 * ```
 */
export const assertOptions = (I: FunRouterOptions) => I;

/**
 * Validates a plugin's configuration to ensure it meets Vixeny's requirements. As with global options, it's important to refrain from explicitly typing plugins to avoid losing type inference. This preservation is vital for the functionality of the `warp` function, which relies on dynamic type inference to operate effectively within Vixeny's plugin system.
 *
 * Example usage:
 * ```js
 * import { plugins } from 'vixeny';
 *
 * // Define a simple plugin
 * const hello = {
 *   name: Symbol.for("hello"),
 *   type: undefined,
 *   f: (_) => (_) => (_) => "hello world",
 * };
 *
 * // Validate the plugin without compromising type inference
 * plugins.assertPlugin(hello);
 * ```
 */
export const assertPlugin = (I: CyclePlugin) => I;
