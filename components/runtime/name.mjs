export default () =>
  typeof Bun !== "undefined"
    ? "Bun"
    : typeof Bun !== "undefined"
    ? "Deno"
    : typeof Node !== "undefined"
    ? "Node"
    : "unknown";
