// deno-lint-ignore-file

// Default export function that takes a starting directory as a parameter and returns an array with all the names of the documents.
export default ((start) =>
  (
    (Y) =>
      (
        (searcher) =>
          ((mapper) => Y(mapper)(searcher))(
            (f: (arg0: any) => any) => (m: any[]) =>
              m.some((x: boolean[]) => x[1] === true)
                ? f(m.reduce((acc: any[], x: string[]) =>
                  !x[1] ? acc.concat([x]) : acc.concat(
                    Y((f: (arg0: any) => ConcatArray<any[]>) =>
                      ((p) => (o: { next: () => any }) =>
                        ((s) =>
                          // Recursive call to the "Y" function with the next directory in the array.
                          // It continues to concatenate the contents of all directories until there are no more directories.
                          s.done === true
                            ? []
                            : [[p + s.value.name, s.value.isDirectory]]
                              .concat(f(o)))(
                            o.next(),
                          ))(x[0] + "/")
                    )(Deno.readDirSync(x[0] as string)),
                  ), []))
                : m,
          )
      )(
        // Recursive call to the "Y" function with the starting directory.
        // Returns a new array that contains the names of all files and directories in the directory tree.
        Y((f: (arg0: any) => ConcatArray<any[]>) =>
          ((p) => (o: { next: () => any }) =>
            ((s) =>
              // Recursive call to the "Y" function with the next directory in the array.
              // It continues to concatenate the contents of all directories until there are no more directories.
              s.done === true ? [] : [[
                (p.at(-2) === "/"
                  ? p.slice(0, -1)
                  : p.at(-1) === "/"
                  ? p
                  : p + "/") + s.value.name,
                s.value.isDirectory,
              ]].concat(f(o)))(
                o.next(),
              ))(start)
        )(Deno.readDirSync(start)),
      )
  )(
    // Setting up the Y combinator.
    (f: (arg0: (y: any) => any) => any) =>
      ((x) => x(x))((x: (arg0: any) => { (arg0: any): any; new (): any }) =>
        f((y: any) => x(x)(y))
      ),
  )) as (s: string) => string[];
