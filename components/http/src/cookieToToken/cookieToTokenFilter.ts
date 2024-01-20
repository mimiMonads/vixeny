export default (elements: string[]) => (input: string) => 
   elements
    .filter((x, index, arr) =>
      index === 0 ||
      (!arr[index - 1].startsWith("resolve.") &&
        !arr[index - 1].startsWith("branch."))
    )
    .map((element, index, arr) => 
      // If the element matches the input and the next element exists
      element.includes(input)
        ?
          element
          .slice(
            element
            .indexOf(input) + input.length + 1, 
            element
            .indexOf( '.' , element.indexOf(input) + input.length + 1 ))
        : null
    )
    .filter(x => x !== null)
    .reduce((acc, v) => acc.includes(v) ? acc : acc.concat(v), [] as string[]);

    