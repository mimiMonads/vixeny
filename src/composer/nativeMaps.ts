import type { FunRouterOptions } from "../options.ts";
import type { Petition } from "../morphism.ts";

import tools from "./composerTools.ts";

export default (o?: FunRouterOptions<any>) =>
(f: Petition) =>
(ar: string[]) =>
(mutable: boolean) =>
  ([
    { name: "req", value: mutable ? "r[0]" : "r", type: 0 },
    {
      name: "param",
      value: mutable ? "param(r[0].url)" : "param(r.url)",
      type: 1,
    },
    {
      name: "query",
      value: mutable ? "query(r[0].url)" : "query(r.url)",
      type: 1,
    },
    {
      name: "date",
      value: f.options?.setDate ? f.options.setDate : "Date.now()",
      type: 0,
    },
    {
      name: "headers",
      value: f.options?.setDate ? f.options.setDate : "headers()",
      type: 1,
    },
    { name: "sign", value: "sign", type: 1 },
    { name: "verify", value: "verify", type: 1 },
    {
      name: "cookie",
      value: mutable
        ? 'cookie(r[0].headers.get("cookie"))'
        : 'cookie(r.headers.get("cookie"))',
      type: 1,
    },
    {
      name: "token",
      value: mutable
        ? 'token(r[0].headers.get("Cookie"))'
        : 'token(r.headers.get("Cookie"))',
      type: 1,
    },
    {
      name: "resolve",
      value: `${
        tools.recursiveCheckAsync(f) ? " await resolve(r)" : "resolve(r)"
      }`,
      type: 1,
    },
    { name: "mutable", value: mutable ? "r[1]" : "{}", type: 0 },
    {
      name: "branch",
      value: `${
        tools.recursiveCheckAsync(f) ? " await branch(r)" : "branch(r)"
      }`,
      type: 1,
    },
    {
      name: "args",
      value: o && "branch" in o ? "b" : null,
      type: 0,
    },
  ].concat(
    Object.keys(o?.cyclePlugin || {}).map((x) => ({
      name: x,

      isAsync: (o && o.cyclePlugin && o.cyclePlugin[x] &&
          //@ts-ignore
          "isAsync" in o.cyclePlugin[x] && o.cyclePlugin[x].isAsync)
        ? true
        : undefined,
      //@ts-ignore
      value: (o && o.cyclePlugin && o.cyclePlugin[x])
        ? "isFunction" in o.cyclePlugin[x] || false
          //@ts-ignore
          ? x
          //@ts-ignore
          : "isAsync" in o.cyclePlugin[x] && o.cyclePlugin[x]["isAsync"]
          ? " await " + x + "(r)"
          : x + "(r)"
        : x,
      type: 1,
    })),
  )).filter((x) => ar.includes(x.name));
