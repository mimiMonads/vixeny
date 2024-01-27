export default (remove: string[]) =>
(elements: string[]) =>
(add: string[]) =>
(string: string) =>
  (
    filtered =>
    elements
    .filter((x, index, arr) =>
      !remove.includes(x) &&
      (index === 0 ||
        (!arr[index - 1].startsWith("resolve.") &&
          !arr[index - 1].startsWith("branch.")))
    )
    .filter((v) => new RegExp(`\\b${v}\\b`).test(filtered)) // Exact match filtering using regular expression
    .concat(add)
    .reduce(
      (acc, v) => acc.includes(v) === false ? acc.concat(v) : acc,
      [] as string[],
    ) as string[]
  )(
    string.replace(/(?<!`|\$\{.*)(["'])(?:(?=(\\?))\2.)*?\1/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/ +/g, ' ')
  )
