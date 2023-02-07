// deno-lint-ignore-file

export default ((start) =>
  (
    (Y) =>
      (
        (searcher) =>
          ((mapper) => Y(mapper)(searcher))(
            (f: (arg0: any) => any) =>
              (m: any[]) =>
                m.some((x: boolean[]) => x[1] === true)
                  ? f(m.reduce((acc: any[], x: string[]) =>
                    !x[1] ? acc.concat([x]) : acc.concat(
                      Y((f: (arg0: any) => ConcatArray<any[]>) =>
                        ((p) =>
                          (o: { next: () => any }) =>
                            ((s) =>
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
        Y((f: (arg0: any) => ConcatArray<any[]>) =>
          ((p) =>
            (o: { next: () => any }) =>
              ((s) =>
                s.done === true
                  ? []
                  : [[p + s.value.name, s.value.isDirectory]].concat(f(o)))(
                  o.next(),
                ))(start)
        )(Deno.readDirSync(start)),
      )
  )(
    (f: (arg0: (y: any) => any) => any) =>
      ((x) => x(x))((x: (arg0: any) => { (arg0: any): any; new (): any }) =>
        f((y: any) => x(x)(y))
      ),
  )) as (s: string) => string[];
