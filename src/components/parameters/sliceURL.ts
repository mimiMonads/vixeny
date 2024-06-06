export default {
  slice: (offset: number) => (lastValue: number) => (url: string) =>
    url.slice(
      url.indexOf("/", url.indexOf("/") + 2) + offset,
      url.indexOf("?") !== -1
        ? url.indexOf("?") - lastValue
        : url.length - lastValue,
    ),
};
