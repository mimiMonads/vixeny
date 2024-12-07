import type { Petition, SupportedKeys } from "../morphism.ts";
import type { FunRouterOptions } from "../options.ts";
import mainCheck from "./checkPetition/mainCheck.ts";
type RecFunc = (f: Petition) => boolean;

const syncCheckerDir =
  (joiner: (base: string) => (target: string) => string) =>
  (readdir: (directoryPath: string) => string[]) =>
  (stat: (directoryPath: string) => { isDirectory: () => boolean }) =>
  (dir: string): [string, boolean][] =>
    (
      (Y) => (
        Y((f: (arg0: string) => [string, boolean][]) => (
          (dir: string): [string, boolean][] =>
            readdir(dir).flatMap((item) =>
              stat(joiner(dir)(item)).isDirectory()
                ? [[joiner(dir)(item), true], ...f(joiner(dir)(item))]
                : [[joiner(dir)(item), false]]
            ) as [string, boolean][]
        ))(dir)
      )
    )(
      // Setting up the Y combinator.
      (f: (arg0: (y: any) => any) => any) =>
        ((x) => x(x))((x: (arg0: any) => { (arg0: any): any; new (): any }) =>
          f((y: any) => x(x)(y))
        ),
    );

const recursiveCheckAsync =
  ((f: (x: RecFunc) => RecFunc) =>
    ((x: (arg: any) => any) => (v: any) => x(x)(v))(
      (x: (arg: any) => any) => (v: any) => f((y: Petition) => x(x)(y))(v),
    ))(
      (solver: RecFunc) => (p: Petition): boolean =>
        p.f.constructor.name === "AsyncFunction" ||
          p.isAsync
          ? true
          : p.f.constructor.name === "Function" &&
              typeof p.resolve === "undefined"
          ? false
          : ("resolve" in p && p.resolve &&
            Object.keys(p.resolve).some((ob) =>
              p.resolve &&
              solver(
                p.resolve[ob] as unknown as Petition,
              )
            )) ??
            // ("branch" in p && p.branch &&
            //   Object.keys(p.branch).some((ob) =>
            //     p.branch &&
            //     solver(
            //       p.branch[ob] as unknown as Petition,
            //     )
            //   )) ??
            false,
    ) as unknown as (f: Petition) => boolean;

const parsingToHexa = (globalKey: SupportedKeys): Uint8Array =>
  typeof globalKey === "string"
    ? /^[0-9a-fA-F]+$/g.test(globalKey)
      ? new Uint8Array([...globalKey].map((x) => x.charCodeAt(0)))
      : new Uint8Array([...globalKey].map((x) => x.charCodeAt(0)))
    : globalKey;

const isUsing = (o?: FunRouterOptions<any>) => (f: Petition): string[] =>
  mainCheck(o)(f);

const elements = (f: Petition) =>
  (
    f.crypto && "globalKey" in f.crypto
      ? [
        "cookie",
        "headers",
        "hash",
        "param",
        "query",
        "io",
        "req",
        "clonedRequest",
        "date",
        "error",
        f.resolve ? "resolve" : undefined,
        "mutable",
        f.branch ? "branch" : undefined,
        f.args ? "args" : undefined,
        ,
        "token",
        "verify",
        "sign",
      ]
      : [
        "cookie",
        "headers",
        "hash",
        "param",
        "query",
        "io",
        "req",
        "date",
        f.resolve ? "resolve" : undefined,
        "mutable",
        f.branch ? "branch" : undefined,
        f.args ? "args" : undefined,
        ,
      ]
  ).filter(Boolean) as string[];

const localAsync =
  (o?: FunRouterOptions<any>) =>
  (p: Petition) =>
  (elementsUsed: string[]): boolean =>
    (
      (p.f.constructor.name === "AsyncFunction") ||
      o && o.cyclePlugin && Object.keys(o.cyclePlugin || {})
          .some((x) =>
            elementsUsed.includes(x)
              ? "isAsync" in o.cyclePlugin[x] &&
                o.cyclePlugin[x].isAsync === true
              : false
          )
    ) ?? false;

export default {
  syncCheckerDir,
  recursiveCheckAsync,
  localAsync,
  elements,
  isUsing,
  parsingToHexa,
};
