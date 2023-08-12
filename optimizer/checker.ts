export default 
(remove: string[]) =>
  (elements: string[]) =>
    (add: string[]) =>
      (string: string) =>
      elements
          .filter((x, index, arr) => 
            !remove.includes(x) && 
            (index === 0 || (!arr[index - 1].startsWith("resolve.") && !arr[index - 1].startsWith("branch.")))
          )
          .filter((v) => new RegExp(`\\b${v}\\b`).test(string)) // Exact match filtering using regular expression
          .concat(add)
          .reduce(
            (acc, v) => acc.includes(v) === false ? acc.concat(v) : acc,
            [] as string[],
          );
