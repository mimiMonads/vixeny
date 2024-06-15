import mainSlicerUrl from "../../util/slicerURL/mainSlicerUrl.ts";

export default {
  slice: (offset: number) => (lastValue: number) => (url: string) =>
    url.slice(
      url.indexOf("/", url.indexOf("/") + 2) + offset,
      url.indexOf("?") !== -1
        ? url.indexOf("?") - lastValue
        : url.length - lastValue,
    ),
  sliceUsingAt: (at: number) => (offset: number) => (lastValue: number) =>
    (
      (slicer) => (url: string) =>
        url.slice(
          slicer(url) + offset,
          url.indexOf("?") !== -1
            ? url.indexOf("?") - lastValue
            : url.length - lastValue,
        )
    )(
      mainSlicerUrl(at),
    ),
};
