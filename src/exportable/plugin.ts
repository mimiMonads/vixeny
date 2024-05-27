//TODO: add
import composerTools from "../composer/composerTools"
import  { globalOptions , type CyclePlugin, type FunRouterOptions} from "../options"



export default {
    globalOptions,
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
 * plugins.type(hello);
 * ```
 */
    type: <FC extends boolean> (I: CyclePlugin<FC>) => I,
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
    getOptions :(userOptions: unknown) => (currentName: string) =>
  userOptions && typeof userOptions == "object" &&
  !Array.isArray(userOptions) && "plugins" in userOptions &&
  userOptions.plugins
  //@ts-ignore
  ? userOptions.plugins[currentName]
  : null,
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
getName :(o: FunRouterOptions<any>) => (sym: symbol) =>
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

}
