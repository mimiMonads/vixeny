import { bench, run } from "mitata";
const slice = {
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

const at4 = slice.atDomain(slice.lastFolder);
const at5 = slice.atDomain(slice.subFolder(slice.lastFolder));
const at6 = slice.atDomain(slice.subFolder(slice.subFolder(slice.lastFolder)));

const url = "https://localhost/1/2/3/4/5/6";



// Benchmarking different depths
bench("at4", () => at4(url));
bench("at5", () => at5(url));
bench("at6", () => at6(url));


run();
