export default {
  atDomain:
    (f: { (currentPosition: number): (url: string) => number }) =>
    (url: string) =>
      (
        (currentPosition) => url.slice(f(currentPosition + 1)(url))
      )(
        url.indexOf("/", url.indexOf("/") + 2),
      ),
  subFolder:
    (f: { (currentPosition: number): (url: string) => number }) =>
    (position: number) =>
    (url: string) => f(url.indexOf("/", position) + 1)(url),
  lastFolder: (position: number) => (url: string) => url.indexOf("/", position),
};
