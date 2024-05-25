export default (elements: string[]) => (input: string) =>
  elements
    .filter((x, index, arr) =>
      index === 0 ||
      (!arr[index - 1].startsWith("resolve.") &&
        !arr[index - 1].startsWith("branch."))
    )
    .filter((v) =>
      (input
        .match(/(?:[?.])(\w+)\s*\(\)/g) || []) // extract potential matches from input
        .map((token) => token.slice(1, token.indexOf("("))) // extract function names from tokens
        .includes(v)
    )
    .reduce((acc, v) => acc.includes(v) ? acc : acc.concat(v), [] as string[]);
