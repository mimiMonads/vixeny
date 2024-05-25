import type { Petition } from "../../morphism.ts";

export default {
  normalize: (s: string) =>
    s.replace(/(?<!`|\$\{.*)(["'])(?:(?=(\\?))\2.)*?\1/g, " ")
      .replace(/\s+/g, " ")
      .replace(/ +/g, " "),

  isUsingResolve: (f: Petition) => (elements: string[]) =>
    elements.includes("resolve")
      ? "resolve" in f ? elements : elements.filter((s) => s === "resolve")
      : elements,

  filtersBranchAndResolve:
    (elements: string[]) => (remove: string[]) => (filteredString: string) =>
      // First filter: Remove elements as specified and handle 'resolve.' and 'branch.' prefix cases
      elements.filter((element, index, arr) =>
        !remove.includes(element) &&
        (index === 0 ||
          (!arr[index - 1].startsWith("resolve.") &&
            !arr[index - 1].startsWith("branch.")))
      )
        // Second filter: Match elements against the code string for exact matches
        .filter((element) =>
          new RegExp(`\\b${element}\\b`).test(filteredString)
        ),
  updateListOfAddAndRemove:
    (f: Petition) =>
    (elements: string[]) =>
    (plugins: { [key: string]: any }) =>
      (
        (listOfElements) =>
          (
            (keysOnMorphisim) => ({
              add: [
                ...new Set(keysOnMorphisim.reduce(
                  (acc, val) =>
                    listOfElements.includes(val) ? [...acc, val] : acc,
                  f.options?.add ?? [],
                )),
              ],
              remove: f.options?.remove ?? [],
              elements: listOfElements.filter((s) =>
                listOfElements.includes(s)
              ),
            })
          )(
            Object.keys(f),
          )
      )(
        [...elements, ...Object.keys(plugins)],
      ),
};
