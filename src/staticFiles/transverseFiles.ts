import poly from './denoBunFS.ts'
import staticFileTools from "./staticFileTools.ts";


export default (dir: string): [string, boolean][] =>
  (
    (Y) => (
      Y((f: (arg0: string) => [string, boolean][]) => (
        (dir: string): [string, boolean][] =>
        poly.getFiles(dir).flatMap((item) =>
          poly.stats(staticFileTools.join(dir)(item)).isDirectory()
              ? [
                [staticFileTools.join(dir)(item), true],
                ...f(staticFileTools.join(dir)(item)),
              ]
              : [[staticFileTools.join(dir)(item), false]]
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
