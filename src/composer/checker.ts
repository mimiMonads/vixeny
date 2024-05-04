/**
 * Customizes the context (CTX) for Vixeny's optimizer by filtering a list of elements based on removal and addition criteria,
 * and by examining the usage of these elements within a given string. This function aims to refine the CTX by ensuring that
 * only the relevant context elements are included
 */
export default (remove: string[]) =>
(elements: string[]) =>
(add: string[]) =>
(codeString: string): string[] =>
  (
    (filteredString: string): string[] =>
      elements
        // First filter: Remove elements as specified and handle 'resolve.' and 'branch.' prefix cases
        .filter((element, index, arr) =>
          !remove.includes(element) &&
          (index === 0 ||
            (!arr[index - 1].startsWith("resolve.") &&
              !arr[index - 1].startsWith("branch.")))
        )
        // Second filter: Match elements against the code string for exact matches
        .filter((element) =>
          new RegExp(`\\b${element}\\b`).test(filteredString)
        )
        // Add the specified elements and ensure uniqueness
        .concat(add)
        .reduce(
          (acc: string[], element) =>
            acc.includes(element) === false ? acc.concat(element) : acc,
          [] as string[],
        )
  )(
    // Preprocess the code string to remove string literals and normalize whitespace
    codeString.replace(/(?<!`|\$\{.*)(["'])(?:(?=(\\?))\2.)*?\1/g, " ")
      .replace(/\s+/g, " ")
      .replace(/ +/g, " "),
  );
