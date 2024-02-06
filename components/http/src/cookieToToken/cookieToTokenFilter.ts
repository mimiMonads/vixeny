export default (elements: string[]) => (input: string) =>
  elements
    .filter((x, index, arr) =>
      index === 0 ||
      (!arr[index - 1].startsWith("resolve.") &&
        !arr[index - 1].startsWith("branch."))
    )
    .map((element) =>
      // If the element matches the input and the next element exists
    element.indexOf(input) !== -1
        ?  element.slice(
              element
                .indexOf(input) + input.length + 1,
              (element
                    .indexOf(".", element.indexOf(input) + input.length + 1) +
                  1 || element.length + 1) - 1,
            )
        : null
    )
    .filter((x) => x !== null)
    .filter((x) => x !== "")
    .sort()
    .filter((v, i, a) => !i || v !== a[i - 1])
    .reduce(
      (acc, v) =>
        acc.includes(v as string) ? acc : acc.concat(v as unknown as string[]),
      [] as string[],
    );
