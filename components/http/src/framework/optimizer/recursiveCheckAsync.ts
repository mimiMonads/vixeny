import { CommonRequestMorphism, RequestMorphism } from "./types.ts";

type RecFunc = (f: CommonRequestMorphism | RequestMorphism) => boolean;

export default ((f: (x: RecFunc) => RecFunc) =>
  ((x: (arg: any) => any) => (v: any) => x(x)(v))(
    (x: (arg: any) => any) => (v: any) =>
      f((y: CommonRequestMorphism | RequestMorphism) => x(x)(y))(v),
  ))(
    (solver: RecFunc) => (f: CommonRequestMorphism | RequestMorphism) =>
      f.f.constructor.name === "AsyncFunction"
        ? true
        : f.f.constructor.name === "Function" &&
            typeof f.resolve === "undefined"
        ? false
        : ("resolve" in f && f.resolve &&
          Object.keys(f.resolve).some((ob) =>
            f.resolve &&
            solver(
              f.resolve[ob] as unknown as
                | CommonRequestMorphism
                | RequestMorphism,
            )
          )) ??
          ("branch" in f && f.branch &&
            Object.keys(f.branch).some((ob) =>
              f.branch &&
              solver(
                f.branch[ob] as unknown as
                  | CommonRequestMorphism
                  | RequestMorphism,
              )
            )) ??
          false,
  ) as unknown as (f: CommonRequestMorphism | RequestMorphism) => boolean;
