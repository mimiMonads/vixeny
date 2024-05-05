export default (mimes: [string, string][]) => (ext: string): string =>
  (mimes.find((x) => x[0] === ext) || [".txt", "text/html"])[1];
