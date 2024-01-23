// deno-lint-ignore-file
import { CommonRequestMorphism, RequestMorphism } from "./types.ts";

type RecFunc = (f: CommonRequestMorphism | RequestMorphism) => boolean;

export default (f: CommonRequestMorphism | RequestMorphism) =>
  f.f.constructor.name === "AsyncFunction"
    ? true
    : f.f.constructor.name === "Function" && typeof f.resolve == "undefined"
    ? false
    : "resolve" in f && f.resolve && Object.keys(f.resolve).some(
        (x) => f.resolve && f.resolve[x].f.constructor.name === "AsyncFunction",
      )
    ? true
    : false;
