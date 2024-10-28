//TODO: add
import composerTools from "../composer/composerTools.ts";
import type {
  fileServerPetition,
  Petition,
  StaticFilePlugin,
} from "../morphism.ts";
import checkerTools from "../composer/checkPetition/checkTools.ts";
import {
  type CyclePlugin,
  type FunRouterOptions,
  globalOptions,
} from "../options.ts";


const pluginIsUsing = (p: Petition) => (currentName: string) =>
  (
    (
      (args) =>
        args
          ? [
            ...new Set(
              checkerTools.getDestructedElements(p.f)(
                typeof args == "string"
                  ? args + "." + currentName
                  : currentName,
              ).concat(
                checkerTools.getDots(p.f)(
                  typeof args == "string"
                    ? args + "." + currentName
                    : currentName,
                ),
              ),
            ),
          ]
          : null
    )(
      checkerTools.getArgsname(p.f),
    )
  ) as string[] | null


export default {
  globalOptions,
  /**
   * @deprecated
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
    O extends CyclePlugin<{
      isFunction: FC;
      return: unknown;
    }>,
  >(config: O) => config,

  /**
   * 
   * @deprecated
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
  getOptions: <T extends any>(userOptions: unknown) =>
  (
    currentName: string,
  ): T | null => (userOptions && typeof userOptions === "object" &&
      !Array.isArray(userOptions) && "plugins" in userOptions &&
      userOptions.plugins
    //@ts-ignore
    ? userOptions.plugins[currentName] as T
    : null),

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
  /**
   * @deprecated
   */
  fileServer: <MI extends true | false>(
    s: fileServerPetition<MI>,
  ): fileServerPetition<MI> => s,
  /**
   * @deprecated
   * 
   */
  staticFilePlugin: <
    TP extends "response" | "request" | undefined,
    O extends StaticFilePlugin<TP>,
  >(config: O) => config,
  /**
   * @deprecated
   * 
   * @param p 
   * @returns 
   */
  pluginIsUsing
};



const pluginCTX = (o?: FunRouterOptions<any>) => (p: Petition) => ({
  getPetition: () => ({...p}),
  getGlobalOptions: () => ({...o}),
  isUsing: () => composerTools.isUsing(o)(p),
  pluginIsUsing: (currentName:string)=> pluginIsUsing(p)(currentName),
  currentName: (sym: symbol) =>
    Object
      .keys(o?.cyclePlugin ?? [])
      // @ts-ignore
      .find((name) => o?.cyclePlugin[name]?.name === sym) as string,
  getOptionsFromPetition: <T extends any>(p: Petition) =>
    ((
      currentName: string,
    ): T | null => (p && typeof p === "object" &&
        !Array.isArray(p) && "plugins" in p &&
        p.plugins
      //@ts-ignore
      ? p.plugins[currentName] as T
      : null)),
})

export type PluginCTX = ReturnType<ReturnType<typeof pluginCTX>>

export type CyclePluginType<
  isFunction extends boolean = false,
  isASync extends boolean  = false,
  T = any
> = {
  readonly name: symbol;
  // Do not use false
  readonly isFunction?: isFunction;
  readonly isAsync?: isASync;
  readonly f: isFunction extends true 
    ? (ctx: PluginCTX) =>  T
    : (ctx: PluginCTX) => (r: Request) => T;
  readonly type: unknown;
  readonly isUsing?: (ctx: PluginCTX ) => string;
  readonly options?: { [k: string]: any };
};

export type  CyclePluginTypes<CPM extends CyclePluginType> = {
  [K in keyof CPM]: CPM[K] extends
    { isFunction: true; f: (...args: any) => any }
    ? ReturnType<CPM[K]["f"]> 
    : CPM[K] extends { f: (...args: any) => any }
      ? Awaited<ReturnType<ReturnType<CPM[K]["f"]>>>
    : never; 
};

const apply = <  
  isFunction extends boolean = false,
  isASync extends boolean = false,
  T = any
>(g: CyclePluginType<isFunction,isASync,T>)=> g

const a = apply({
  name: Symbol.for('hi'),
  isFunction: true,
  type: 1,
  f: (ctx) =>  () => 1
})


