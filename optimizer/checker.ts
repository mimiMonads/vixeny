export default 
(remove: string[]) =>
  (elements: string[]) =>
    (add: string[]) =>
      (string: string) =>
      elements
          .filter((x) => !remove.includes(x)) 
          .filter((v) => string.includes(v)) 
          .concat(add)
          .reduce(
            (acc, v) => acc.includes(v) === false ? acc.concat(v) : acc,
            [] as string[],
          );
