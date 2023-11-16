export default () =>
  typeof Bun !== "undefined"
    ? "Bun"
    : typeof Deno !== "undefined"
    ? "Deno"
    : typeof Node !== "undefined"
    ? "Node"
    : "unknown";
