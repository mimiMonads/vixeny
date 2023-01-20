export default (a: string[]) =>
  ((o) => (s: string) => o.indexOf(s[0]))(a.map((x) => x[0]));
