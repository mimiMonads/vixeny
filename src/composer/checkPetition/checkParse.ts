import type { Petition } from "../../morphism.ts";
import checkTool from "./checkTool.ts";

export default (elements: string[]) =>
(remove: string[]) =>
(add: string[]) =>
(f: Petition): string[] =>
  (
    (filteredString: string): string[] =>
      checkTool
        .isUsingResolve(f)(
          checkTool
            .filtersBranchAndResolve(elements)(remove)(filteredString)
            .concat(add)
            .reduce(
              (acc: string[], element) =>
                acc.includes(element) === false ? acc.concat(element) : acc,
              [] as string[],
            ),
        )
  )(
    checkTool.normalize(f.f.toString()),
  );
