import toolsSlicerUrl from "./toolsSlicerUrl.ts";

export default (at: number): (url: string) => number =>
  at < 4
    ? (url: string): number => url.indexOf("/", url.indexOf("/") + 2)
    : toolsSlicerUrl.atDomain(
      Array(at - 4)
        .fill(null)
        .reduceRight(
          (acc) => toolsSlicerUrl.subFolder(acc),
          toolsSlicerUrl.lastFolder,
        ),
    );
