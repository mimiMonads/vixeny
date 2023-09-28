export default (base) => (target) =>
  base.endsWith("/") ? base + target : base + "/" + target;
