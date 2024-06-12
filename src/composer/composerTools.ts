import type { Petition } from "../morphism.ts";
import type { FunRouterOptions } from "../options.ts";
import mainCheck from "./checkPetition/mainCheck.ts";
type RecFunc = (f: Petition) => boolean;

export default {
  syncCheckerDir:
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
      ),
  recursiveCheckAsync:
    ((f: (x: RecFunc) => RecFunc) =>
      ((x: (arg: any) => any) => (v: any) => x(x)(v))(
        (x: (arg: any) => any) => (v: any) => f((y: Petition) => x(x)(y))(v),
      ))(
        (solver: RecFunc) => (f: Petition) =>
          f.f.constructor.name === "AsyncFunction" ||
            ("isAsync" in f && f.isAsync)
            ? true
            : f.f.constructor.name === "Function" &&
                typeof f.resolve === "undefined"
            ? false
            : ("resolve" in f && f.resolve &&
              Object.keys(f.resolve).some((ob) =>
                f.resolve &&
                solver(
                  f.resolve[ob] as unknown as Petition,
                )
              )) ??
              ("branch" in f && f.branch &&
                Object.keys(f.branch).some((ob) =>
                  f.branch &&
                  solver(
                    f.branch[ob] as unknown as Petition,
                  )
                )) ??
              false,
      ) as unknown as (f: Petition) => boolean,
  parsingToHexa: (crypto: { globalKey: string }): Uint8Array =>
    typeof crypto.globalKey === "string"
      ? /^[0-9a-fA-F]+$/g.test(crypto.globalKey)
        ? new Uint8Array([...crypto.globalKey].map((x) => x.charCodeAt(0)))
        : new Uint8Array([...crypto.globalKey].map((x) => x.charCodeAt(0)))
      : crypto.globalKey,
  isUsing: (o?: FunRouterOptions<any>) => (f: Petition): string[] =>
    mainCheck(o)(f),
  elements: (f: Petition) =>
    (
      f.crypto && "globalKey" in f.crypto
        ? [
          "cookie",
          "headers",
          "randomNumber",
          "hash",
          "param",
          "query",
          "req",
          "date",
          f.resolve ? "resolve" : undefined,
          "mutable",
          f.branch ? "branch" : undefined,
          f.arguments ? "arguments" : undefined,
          ,
          "token",
          "verify",
          "sign",
        ]
        : [
          "cookie",
          "headers",
          "randomNumber",
          "hash",
          "param",
          "query",
          "req",
          "date",
          f.resolve ? "resolve" : undefined,
          "mutable",
          f.branch ? "branch" : undefined,
          f.arguments ? "arguments" : undefined,
          ,
        ]
    ).filter(Boolean) as string[],
};
