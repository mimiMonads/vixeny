/**
 * Identifies the current JavaScript runtime environment. It prioritizes the detection in the following order:
 * 1. Bun
 * 2. Deno
 *
 * By default, if neither Bun nor Deno environments are detected, it assumes the Node environment.
 *
 * This function is useful for applications that need to adapt their behavior based on the runtime environment.
 *
 * ```js
 * import runtime from './runtime';
 *
 * // Logging runtime name
 * console.log(runtime());
 * ```
 */
//@ts-nocheck
export default () =>
  typeof globalThis.Bun !== "undefined"
    ? "Bun"
    : typeof globalThis.Deno !== "undefined"
    ? "Deno"
    : typeof process !== "undefined" && typeof process.versions === "object" &&
        !!process.versions.node
    ? "Node"
    : "Unknown";
