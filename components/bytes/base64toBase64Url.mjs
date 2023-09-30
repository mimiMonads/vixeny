import bun from "./src/convertBase64ToBase64urlBun.mjs";
import deno from "./src/convertBase64ToBase64urlDeno.mjs";
import node from "./src/convertBase64ToBase64urlNode.mjs";

export default () =>
  (
    (rt) => rt === "Bun" ? bun() : rt === "Deno" ? deno() : node()
  )(
    typeof Bun !== "undefined"
      ? "Bun"
      : typeof Bun !== "undefined"
      ? "Deno"
      : "Node",
  );
