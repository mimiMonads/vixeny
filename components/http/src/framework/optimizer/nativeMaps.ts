import { FunRouterOptions } from "../../../types.ts"
import { CommonRequestMorphism, RequestMorphism } from "./types.ts"
import checkAsync from "./recursiveCheckAsync.ts";

export default (o?: FunRouterOptions)=>( f:CommonRequestMorphism | RequestMorphism ) => (ar: string[]) =>(mutable:boolean) => ([
    { name: "req", value: mutable ? "r.r" : "r", type: 0 },
    {
      name: "param",
      value: mutable ? "param(r.r.url)" : "param(r.url)",
      type: 1,
    },
    {
      name: "query",
      value: mutable ? "query(r.r.url)" : "query(r.url)",
      type: 1,
    },
    {
      name: "date",
      value: f.options?.setDate ? f.options.setDate : "Date.now()",
      type: 0,
    },
    {
      name: "randomNumber",
      value: f.options?.setRandomNumber
        ? f.options.setRandomNumber
        : "Math.random()",
      type: 0,
    },
    {
      name: "hash",
      value: f.options?.setHash
        ? f.options.setHash
        : "crypto.randomUUID()",
      type: 0,
    },
    { name: "sign", value: "sign", type: 1 },
    { name: "verify", value: "verify", type: 1 },
    {
      name: "cookie",
      value: mutable
        ? 'cookie(r.r.headers.get("cookie"))'
        : 'cookie(r.headers.get("cookie"))',
      type: 1,
    },
    { name: "jSign", value: "jSign", type: 1 },
    { name: "jVerify", value: "jVerify", type: 1 },
    {
      name: "resolve",
      value: `${checkAsync(f) ? " await resolve(r)" : "resolve(r)"}`,
      type: 1,
    },
    { name: "mutable", value: mutable ? "r.m" : "{}", type: 0 },
    {
      name: "branch",
      value: `${checkAsync(f) ? " await branch(r)" : "branch(r)"}`,
      type: 1,
    },
    {
      name: "arguments",
      value: o && "branch" in o ? "b" : null,
      type: 0,
    },
  ].concat(Object.keys(o?.cyclePlugin || {}).map( x  =>    ( {
    name: x,
    value: mutable ? x + "(r.r.url)" :  x + "(r.url)",
    type: 1,
  }))
  )).filter((x) => ar.includes(x.name))