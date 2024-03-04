import { CyclePlugin, FunRouterOptions } from "../../types";


export const getName = (o: FunRouterOptions) => (sym: symbol) =>
  Object
    .keys(o?.cyclePlugin ?? [])
    //@ts-ignore
    .find((name) => o?.cyclePlugin[name].name === sym) as string;

export const getOptions = (userOptions: unknown) => (currentName: string) =>
userOptions && typeof userOptions == 'object' && !Array.isArray(userOptions) &&  "plugins" in userOptions && userOptions.plugins
    ? userOptions.plugins[currentName]
    : null;

export const assertOptions = (I: FunRouterOptions) => I;

export const asssertPlugin = (I: CyclePlugin) => I;