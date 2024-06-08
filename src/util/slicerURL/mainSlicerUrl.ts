import toolsSlicerUrl from "./toolsSlicerUrl.ts";

export default (at: number) =>
  at < 4
    ? (url: string) => url.slice(url.indexOf("/", url.indexOf("/") + 2))
    : toolsSlicerUrl.atDomain(
      Array(at - 4)
        .fill(null)
        .reduceRight(
          (acc) => toolsSlicerUrl.subFolder(acc),
          toolsSlicerUrl.lastFolder,
        ),
    );
