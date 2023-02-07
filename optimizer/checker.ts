export default (n: string[]) =>
  (a: string[]) =>
    (p: string[]) =>
      (s: string) =>
        a
          .filter((x) => n.length > 1 ? n.some((y) => y !== x) : true)
          .reduce(
            (acc, v) => s.includes(v) ? acc.concat(v) : acc,
            [] as string[],
          )
          .concat(p)
          .reduce(
            (acc, v) => acc.includes(v) === false ? acc.concat(v) : acc,
            [] as string[],
          );
