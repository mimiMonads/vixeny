export default (base: string) => (target: string): string =>
  base.endsWith("/") ? base + target : base + "/" + target;
